-- İçerik yönetimi (26.11.2026). Koddaki içerik varsayılan kalır; panelde değiştirilen alanlar ContentOverride'a yazılır.
-- Listeler (Basında DND, Ekip) ContentItem'da; ilk açılışta koddaki liste aktarılır, sonra kaynak veritabanıdır.
CREATE TABLE IF NOT EXISTS "ContentOverride" (
    "id" SERIAL NOT NULL,
    "scope" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    CONSTRAINT "ContentOverride_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "ContentOverride_scope_locale_path_key" ON "ContentOverride"("scope", "locale", "path");

CREATE TABLE IF NOT EXISTS "ContentItem" (
    "id" SERIAL NOT NULL,
    "collection" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "ContentItem_collection_key_key" ON "ContentItem"("collection", "key");
CREATE INDEX IF NOT EXISTS "ContentItem_collection_idx" ON "ContentItem"("collection");

CREATE TABLE IF NOT EXISTS "ContentLog" (
    "id" SERIAL NOT NULL,
    "area" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentLog_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "ContentLog_createdAt_idx" ON "ContentLog"("createdAt");
