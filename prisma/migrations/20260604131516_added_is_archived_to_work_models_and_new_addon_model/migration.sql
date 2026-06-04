/*
  Warnings:

  - You are about to drop the column `isActive` on the `CasePricingPlan` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `WorkType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CaseCategory" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "CasePricingPlan" DROP COLUMN "isActive",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isActive",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WorkType" DROP COLUMN "isActive",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ProductAddon" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAddon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseWorkItemAddon" (
    "id" TEXT NOT NULL,
    "caseWorkItemId" TEXT NOT NULL,
    "addonId" TEXT NOT NULL,
    "priceSnapshot" DECIMAL(10,2) NOT NULL,
    "labId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseWorkItemAddon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductAddon_productId_idx" ON "ProductAddon"("productId");

-- CreateIndex
CREATE INDEX "ProductAddon_labId_idx" ON "ProductAddon"("labId");

-- CreateIndex
CREATE INDEX "CaseWorkItemAddon_caseWorkItemId_idx" ON "CaseWorkItemAddon"("caseWorkItemId");

-- CreateIndex
CREATE INDEX "CaseWorkItemAddon_addonId_idx" ON "CaseWorkItemAddon"("addonId");

-- CreateIndex
CREATE INDEX "CaseWorkItemAddon_labId_idx" ON "CaseWorkItemAddon"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseWorkItemAddon_caseWorkItemId_addonId_key" ON "CaseWorkItemAddon"("caseWorkItemId", "addonId");

-- AddForeignKey
ALTER TABLE "ProductAddon" ADD CONSTRAINT "ProductAddon_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAddon" ADD CONSTRAINT "ProductAddon_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseWorkItemAddon" ADD CONSTRAINT "CaseWorkItemAddon_caseWorkItemId_fkey" FOREIGN KEY ("caseWorkItemId") REFERENCES "CaseWorkItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseWorkItemAddon" ADD CONSTRAINT "CaseWorkItemAddon_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "ProductAddon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseWorkItemAddon" ADD CONSTRAINT "CaseWorkItemAddon_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
