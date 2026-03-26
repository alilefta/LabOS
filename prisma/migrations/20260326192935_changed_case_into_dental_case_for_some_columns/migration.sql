/*
  Warnings:

  - You are about to drop the column `caseId` on the `CaseAssetFile` table. All the data in the column will be lost.
  - You are about to drop the column `caseId` on the `CaseWorkItem` table. All the data in the column will be lost.
  - Added the required column `dentalCaseId` to the `CaseAssetFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dentalCaseId` to the `CaseWorkItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CaseAssetFile" DROP CONSTRAINT "CaseAssetFile_caseId_fkey";

-- DropForeignKey
ALTER TABLE "CaseWorkItem" DROP CONSTRAINT "CaseWorkItem_caseId_fkey";

-- DropIndex
DROP INDEX "CaseAssetFile_caseId_idx";

-- DropIndex
DROP INDEX "CaseWorkItem_caseId_idx";

-- AlterTable
ALTER TABLE "CaseAssetFile" DROP COLUMN "caseId",
ADD COLUMN     "dentalCaseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CaseWorkItem" DROP COLUMN "caseId",
ADD COLUMN     "dentalCaseId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "CaseAssetFile_dentalCaseId_idx" ON "CaseAssetFile"("dentalCaseId");

-- CreateIndex
CREATE INDEX "CaseWorkItem_dentalCaseId_idx" ON "CaseWorkItem"("dentalCaseId");

-- AddForeignKey
ALTER TABLE "CaseWorkItem" ADD CONSTRAINT "CaseWorkItem_dentalCaseId_fkey" FOREIGN KEY ("dentalCaseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseAssetFile" ADD CONSTRAINT "CaseAssetFile_dentalCaseId_fkey" FOREIGN KEY ("dentalCaseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;
