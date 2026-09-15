-- Lead kaynak/kampanya takibi için boş bırakılabilir kolonlar.
-- IF NOT EXISTS: ilk migration "source" kolonunu zaten oluşturmuş olabilir.
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "project" TEXT;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "unitType" TEXT;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "form" TEXT;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "source" TEXT;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "campaign" TEXT;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "pageUrl" TEXT;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "eventId" TEXT;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "attribution" JSONB;
