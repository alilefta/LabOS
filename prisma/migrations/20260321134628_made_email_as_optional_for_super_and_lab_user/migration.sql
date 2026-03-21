/*
  Warnings:

  - You are about to drop the column `email` on the `LabUser` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `SuperUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LabUser" DROP COLUMN "email",
ADD COLUMN     "secondaryEmail" TEXT;

-- AlterTable
ALTER TABLE "SuperUser" DROP COLUMN "email",
ADD COLUMN     "secondaryEmail" TEXT;
