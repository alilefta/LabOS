-- AlterEnum
ALTER TYPE "CaseStatus" ADD VALUE 'DRAFT';

-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
