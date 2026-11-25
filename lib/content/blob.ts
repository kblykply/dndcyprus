// lib/content/blob.ts — panelden görsel yükleme (Vercel Blob) kullanılabilir mi?
// İki yol: OIDC (Vercel'in önerdiği; bağlantıda "Enable OIDC" açılınca BLOB_STORE_ID gelir, kimlik istek başına kısa ömürlü)
// ya da sabit anahtar BLOB_READ_WRITE_TOKEN. @vercel/blob önce OIDC'yi, yoksa sabit anahtarı kendisi seçer.
export const blobUploadConfigured = () => !!((process.env.BLOB_STORE_ID || "").trim() || (process.env.BLOB_READ_WRITE_TOKEN || "").trim());
