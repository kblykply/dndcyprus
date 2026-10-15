const test = require("node:test");
const assert = require("node:assert/strict");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

test("JSON-LD preserves text without allowing a closing script to escape into HTML", () => {
  const { serializeJsonLd } = loadTypeScript("lib/structured-data.ts");
  const headline = '</script><script>alert("test")</script> & Kıbrıs';
  const serialized = serializeJsonLd({ headline });
  assert.ok(!serialized.includes("<"));
  assert.equal(JSON.parse(serialized).headline, headline);
});

test("article markup uses published source facts and does not invent authors or update dates", () => {
  const { blogPostingJsonLd } = loadTypeScript("lib/structured-data.ts");
  const post = {
    slug: "existing-post", title: "Mevcut başlık", excerpt: "Mevcut özet",
    date: "2025-01-28", author: "Admin", cover: "/cover.jpg", content: "<p>Mevcut içerik</p>",
  };
  const data = blogPostingJsonLd(post);
  assert.equal(data.headline, post.title);
  assert.equal(data.description, post.excerpt);
  assert.equal(data.datePublished, post.date);
  assert.equal(data.image[0], "https://www.dndcyprus.com/cover.jpg");
  assert.equal(data.mainEntityOfPage["@id"], "https://www.dndcyprus.com/tr/blog/existing-post");
  assert.equal(data.publisher["@id"], "https://www.dndcyprus.com/#organization");
  assert.equal(data.author, undefined);
  assert.equal(data.dateModified, undefined);
});
