const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const { webcrypto } = require("node:crypto");
const ts = require("typescript");

const root = path.resolve(__dirname, "../..");

// Run the actual source with isolated environment variables and mocked IO.
// Tests cannot accidentally send a real conversion through the global fetch.
function loadTypeScript(relativePath, { env = {}, globals = {}, mocks = {} } = {}) {
  const cache = new Map();
  const context = vm.createContext({
    console,
    process: { env: { ...env } },
    URL,
    URLSearchParams,
    TextEncoder,
    TextDecoder,
    Headers,
    Request,
    Response,
    FormData,
    AbortController,
    AbortSignal,
    Event,
    CustomEvent,
    EventTarget,
    crypto: webcrypto,
    setTimeout,
    clearTimeout,
    fetch: async () => { throw new Error("External requests are disabled in tests"); },
    ...globals,
  });

  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const loadedModule = { exports: {} };
    cache.set(filename, loadedModule);
    const nativeRequire = createRequire(filename);
    function resolveRequire(specifier) {
      if (Object.hasOwn(mocks, specifier)) return mocks[specifier];
      if (specifier.startsWith(".") || specifier.startsWith("@/")) {
        const base = specifier.startsWith("@/")
          ? path.join(root, specifier.slice(2))
          : path.resolve(path.dirname(filename), specifier);
        const target = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]
          .find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
        if (target && /\.tsx?$/.test(target)) return load(target);
      }
      return nativeRequire(specifier);
    }
    const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    const run = vm.runInContext(
      `(function(require, module, exports) {${compiled}\n})`, context, { filename },
    );
    run(resolveRequire, loadedModule, loadedModule.exports);
    return loadedModule.exports;
  }

  return load(path.resolve(root, relativePath));
}

module.exports = { loadTypeScript };
