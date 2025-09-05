-- CreateTable
CREATE TABLE "AIGeneratedTasksBatch" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "tasksJson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AIGeneratedTasksBatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AIGeneratedTasksBatch_userId_idx" ON "AIGeneratedTasksBatch"("userId");

-- AddForeignKey
ALTER TABLE "AIGeneratedTasksBatch" ADD CONSTRAINT "AIGeneratedTasksBatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
