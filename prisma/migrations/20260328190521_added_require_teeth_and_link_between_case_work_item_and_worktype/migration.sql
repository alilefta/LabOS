-- AlterTable
ALTER TABLE "CaseWorkItem" ADD COLUMN     "workTypeId" TEXT;

-- AlterTable
ALTER TABLE "WorkType" ADD COLUMN     "requireTeethSelection" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "CaseWorkItem" ADD CONSTRAINT "CaseWorkItem_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "WorkType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
