-- Talep takibi: sorumlu kişi ve sonraki arama zamanı (yalnız kolon ekler, mevcut kayıtlara dokunmaz, tekrar çalıştırmak güvenli)
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "assignee" TEXT;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "followUpAt" TIMESTAMP(3);
CREATE INDEX IF NOT EXISTS "ContactMessage_followUpAt_idx" ON "ContactMessage"("followUpAt");
