-- Satış talebi takibi (25.11.2026): durum + iç notlar. Eski kod bu kolonları bilmeden de çalışır
-- (status varsayılanı 'yeni'), bu yüzden veritabanı koddan önce güncellenebilir.
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'yeni';
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "statusAt" TIMESTAMP(3);
CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");
CREATE INDEX IF NOT EXISTS "ContactMessage_status_idx" ON "ContactMessage"("status");

CREATE TABLE IF NOT EXISTS "LeadNote" (
    "id" SERIAL NOT NULL,
    "leadId" INTEGER NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'not',
    "text" TEXT NOT NULL,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LeadNote_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "LeadNote_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "ContactMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "LeadNote_leadId_idx" ON "LeadNote"("leadId");
