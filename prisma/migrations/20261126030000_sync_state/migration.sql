-- Dış sistemlerle eşitleme durumu (Meta reklam formu talepleri)
CREATE TABLE IF NOT EXISTS "SyncState" (
    "key" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SyncState_pkey" PRIMARY KEY ("key")
);
