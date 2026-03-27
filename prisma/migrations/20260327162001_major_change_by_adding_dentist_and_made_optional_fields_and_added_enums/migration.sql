/*
  Warnings:

  - The values [DELIEVERD] on the enum `CaseStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address1` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[labId,caseNumber]` on the table `Case` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `caseNumber` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Made the column `grandTotal` on table `Case` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `CasePricingPlan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClinicStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ClinicType" AS ENUM ('SOLO', 'CLINIC', 'HOSPITAL', 'UNIVERSITY');

-- CreateEnum
CREATE TYPE "PatientGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE');

-- AlterEnum
BEGIN;
CREATE TYPE "CaseStatus_new" AS ENUM ('NEW', 'ASSIGNED', 'PROCESSING', 'COMPLETED', 'FAILED', 'DELIVERED', 'DRAFT');
ALTER TABLE "public"."Case" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Case" ALTER COLUMN "status" TYPE "CaseStatus_new" USING ("status"::text::"CaseStatus_new");
ALTER TYPE "CaseStatus" RENAME TO "CaseStatus_old";
ALTER TYPE "CaseStatus_new" RENAME TO "CaseStatus";
DROP TYPE "public"."CaseStatus_old";
ALTER TABLE "Case" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterEnum
ALTER TYPE "LabRole" ADD VALUE 'OWNER';

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "caseNumber" TEXT NOT NULL,
ADD COLUMN     "dentistId" TEXT,
ALTER COLUMN "grandTotal" SET NOT NULL,
ALTER COLUMN "grandTotal" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "CaseAssetFile" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CaseCategory" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CasePricingPlan" ADD COLUMN     "clinicId" TEXT,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT;

-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "billingEmail" TEXT,
ADD COLUMN     "billingPhoneNumber" TEXT,
ADD COLUMN     "creditLimit" DECIMAL(10,2),
ADD COLUMN     "currentBalance" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "discount" DECIMAL(5,2),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" "ClinicStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "taxNumber" TEXT,
ADD COLUMN     "type" "ClinicType" NOT NULL DEFAULT 'CLINIC',
ADD COLUMN     "website" TEXT,
ALTER COLUMN "zipcode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LabSubscriptionPlan" ADD COLUMN     "maxCasesMonth" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "maxMembers" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePriceId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "tier" "SubscriptionTier" NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "LabUser" ALTER COLUMN "zipcode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "address1",
DROP COLUMN "address2",
DROP COLUMN "city",
DROP COLUMN "email",
DROP COLUMN "phoneNumber",
DROP COLUMN "zipcode",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "gender" "PatientGender",
ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SalesRepresentative" ALTER COLUMN "zipcode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SuperUser" ALTER COLUMN "zipcode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Technician" ALTER COLUMN "zipcode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkType" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Dentist" (
    "id" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dentist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Dentist_clinicId_idx" ON "Dentist"("clinicId");

-- CreateIndex
CREATE INDEX "Dentist_labId_idx" ON "Dentist"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "Case_labId_caseNumber_key" ON "Case"("labId", "caseNumber");

-- AddForeignKey
ALTER TABLE "Dentist" ADD CONSTRAINT "Dentist_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dentist" ADD CONSTRAINT "Dentist_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "Dentist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasePricingPlan" ADD CONSTRAINT "CasePricingPlan_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasePricingPlan" ADD CONSTRAINT "CasePricingPlan_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
