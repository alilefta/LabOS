-- CreateEnum
CREATE TYPE "CaseActivityType" AS ENUM ('CASE_CREATED', 'STATUS_CHANGED', 'STAFF_ASSIGNED', 'STAFF_REMOVED', 'NOTE_ADDED', 'FILE_UPLOADED', 'FILE_DELETED', 'DEADLINE_CHANGED', 'AI_AUDIT_COMPLETED');

-- CreateTable
CREATE TABLE "CaseActivityLog" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "actorId" TEXT,
    "actorName" TEXT NOT NULL,
    "type" "CaseActivityType" NOT NULL,
    "summary" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CaseActivityLog_caseId_idx" ON "CaseActivityLog"("caseId");

-- CreateIndex
CREATE INDEX "CaseActivityLog_labId_idx" ON "CaseActivityLog"("labId");

-- AddForeignKey
ALTER TABLE "CaseActivityLog" ADD CONSTRAINT "CaseActivityLog_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseActivityLog" ADD CONSTRAINT "CaseActivityLog_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
