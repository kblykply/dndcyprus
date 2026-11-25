-- Clarity günlük birikimi (25.11.2026): API yalnız son 1-3 günü verir ve günde 10 istekle sınırlıdır; her sabah son 24 saat
-- URL/Device/Channel boyutlarıyla saklanır. day = Kıbrıs günü (YYYY-MM-DD) ya da elle güncellemede "anlik".
CREATE TABLE IF NOT EXISTS "ClaritySnapshot" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "dimension" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClaritySnapshot_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "ClaritySnapshot_day_dimension_key" ON "ClaritySnapshot"("day", "dimension");
CREATE INDEX IF NOT EXISTS "ClaritySnapshot_day_idx" ON "ClaritySnapshot"("day");
