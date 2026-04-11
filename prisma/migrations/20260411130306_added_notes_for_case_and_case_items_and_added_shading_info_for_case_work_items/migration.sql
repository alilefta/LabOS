-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "CaseWorkItem" ADD COLUMN     "baseShade" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "shadeNotes" TEXT,
ADD COLUMN     "shadeSystem" TEXT,
ADD COLUMN     "stumpShade" TEXT;
