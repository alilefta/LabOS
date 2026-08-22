/*
  Warnings:

  - A unique constraint covering the columns `[organizationId]` on the table `Lab` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Lab" ADD COLUMN     "organizationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Lab_organizationId_key" ON "Lab"("organizationId");

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
