-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'SUPER_MOD', 'LAB_MANAGER', 'LAB_ADMIN', 'LAB_STAFF');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('NEW', 'ASSIGNED', 'PROCESSING', 'COMPLETED', 'FAILED', 'DELIEVERD');

-- CreateEnum
CREATE TYPE "AssetFileType" AS ENUM ('IMAGE', 'VIDEO', 'SCANNERFILE');

-- CreateEnum
CREATE TYPE "PricingStrategy" AS ENUM ('BULK', 'PERTOOTH', 'CUSTOM');

-- CreateEnum
CREATE TYPE "JawType" AS ENUM ('UPPER', 'LOWER', 'OTHER');

-- CreateEnum
CREATE TYPE "ToothPosition" AS ENUM ('UpperRightThirdMolar', 'UpperRightSecondMolar', 'UpperRightFirstMolar', 'UpperRightSecondPremolar', 'UpperRightFirstPremolar', 'UpperRightCanine', 'UpperRightLateralIncisor', 'UpperRightCentralIncisor', 'UpperLeftCentralIncisor', 'UpperLeftLateralIncisor', 'UpperLeftCanine', 'UpperLeftFirstPremolar', 'UpperLeftSecondPremolar', 'UpperLeftFirstMolar', 'UpperLeftSecondMolar', 'UpperLeftThirdMolar', 'LowerLeftThirdMolar', 'LowerLeftSecondMolar', 'LowerLeftFirstMolar', 'LowerLeftSecondPremolar', 'LowerLeftFirstPremolar', 'LowerLeftCanine', 'LowerLeftLateralIncisor', 'LowerLeftCentralIncisor', 'LowerRightCentralIncisor', 'LowerRightLateralIncisor', 'LowerRightCanine', 'LowerRightFirstPremolar', 'LowerRightSecondPremolar', 'LowerRightFirstMolar', 'LowerRightSecondMolar', 'LowerRightThirdMolar');

-- CreateTable
CREATE TABLE "Lab" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "salesRepsId" TEXT,
    "status" "CaseStatus" NOT NULL DEFAULT 'NEW',
    "grandTotal" DECIMAL(65,30) NOT NULL,
    "clinicId" TEXT,
    "technicianId" TEXT,
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseWorkItem" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "labId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "casePricingPlanId" TEXT NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "pricingStrategy" "PricingStrategy" NOT NULL DEFAULT 'BULK',
    "firstToothPrice" DECIMAL(65,30),
    "bulkPrice" DECIMAL(65,30),
    "additionalToothPrice" DECIMAL(65,30),
    "bulkPriceThreshold" DECIMAL(65,30),
    "jawType" "JawType" NOT NULL DEFAULT 'UPPER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseWorkItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseAssetFile" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "assetFileType" "AssetFileType" NOT NULL DEFAULT 'IMAGE',
    "labId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseAssetFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "labId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "caseCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "workTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasePricingPlan" (
    "id" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "pricingStrategy" "PricingStrategy" NOT NULL DEFAULT 'BULK',
    "firstToothPrice" DECIMAL(65,30),
    "bulkPrice" DECIMAL(65,30),
    "additionalToothPrice" DECIMAL(65,30),
    "bulkPriceThreshold" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CasePricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technician" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "labId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Technician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesRepresentative" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "labId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesRepresentative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectedTooth" (
    "id" TEXT NOT NULL,
    "toothPosition" "ToothPosition" NOT NULL,
    "caseWorkItemId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelectedTooth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabSubscriptionPlan" (
    "id" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "subscriptionNextRenewal" TIMESTAMP(3),
    "isCancelled" BOOLEAN NOT NULL DEFAULT false,
    "cancellationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabSubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "avatarUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'LAB_ADMIN',
    "labId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastTimeActive" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuperUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "avatarUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'SUPER_ADMIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastTimeActive" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuperUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CaseToCaseCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CaseToCaseCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Clinic_labId_idx" ON "Clinic"("labId");

-- CreateIndex
CREATE INDEX "Case_labId_idx" ON "Case"("labId");

-- CreateIndex
CREATE INDEX "Case_technicianId_idx" ON "Case"("technicianId");

-- CreateIndex
CREATE INDEX "Case_salesRepsId_idx" ON "Case"("salesRepsId");

-- CreateIndex
CREATE INDEX "Case_clinicId_idx" ON "Case"("clinicId");

-- CreateIndex
CREATE INDEX "Patient_labId_idx" ON "Patient"("labId");

-- CreateIndex
CREATE INDEX "CaseWorkItem_labId_idx" ON "CaseWorkItem"("labId");

-- CreateIndex
CREATE INDEX "CaseWorkItem_caseId_idx" ON "CaseWorkItem"("caseId");

-- CreateIndex
CREATE INDEX "CaseWorkItem_productId_idx" ON "CaseWorkItem"("productId");

-- CreateIndex
CREATE INDEX "CaseWorkItem_casePricingPlanId_idx" ON "CaseWorkItem"("casePricingPlanId");

-- CreateIndex
CREATE INDEX "CaseAssetFile_labId_idx" ON "CaseAssetFile"("labId");

-- CreateIndex
CREATE INDEX "CaseAssetFile_caseId_idx" ON "CaseAssetFile"("caseId");

-- CreateIndex
CREATE INDEX "CaseCategory_labId_idx" ON "CaseCategory"("labId");

-- CreateIndex
CREATE INDEX "WorkType_labId_idx" ON "WorkType"("labId");

-- CreateIndex
CREATE INDEX "WorkType_caseCategoryId_idx" ON "WorkType"("caseCategoryId");

-- CreateIndex
CREATE INDEX "Product_labId_idx" ON "Product"("labId");

-- CreateIndex
CREATE INDEX "Product_workTypeId_idx" ON "Product"("workTypeId");

-- CreateIndex
CREATE INDEX "CasePricingPlan_labId_idx" ON "CasePricingPlan"("labId");

-- CreateIndex
CREATE INDEX "Technician_labId_idx" ON "Technician"("labId");

-- CreateIndex
CREATE INDEX "SalesRepresentative_labId_idx" ON "SalesRepresentative"("labId");

-- CreateIndex
CREATE INDEX "SelectedTooth_labId_idx" ON "SelectedTooth"("labId");

-- CreateIndex
CREATE INDEX "SelectedTooth_caseWorkItemId_idx" ON "SelectedTooth"("caseWorkItemId");

-- CreateIndex
CREATE UNIQUE INDEX "LabSubscriptionPlan_labId_key" ON "LabSubscriptionPlan"("labId");

-- CreateIndex
CREATE INDEX "LabUser_labId_idx" ON "LabUser"("labId");

-- CreateIndex
CREATE INDEX "_CaseToCaseCategory_B_index" ON "_CaseToCaseCategory"("B");

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_salesRepsId_fkey" FOREIGN KEY ("salesRepsId") REFERENCES "SalesRepresentative"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseWorkItem" ADD CONSTRAINT "CaseWorkItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseWorkItem" ADD CONSTRAINT "CaseWorkItem_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseWorkItem" ADD CONSTRAINT "CaseWorkItem_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseWorkItem" ADD CONSTRAINT "CaseWorkItem_casePricingPlanId_fkey" FOREIGN KEY ("casePricingPlanId") REFERENCES "CasePricingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseAssetFile" ADD CONSTRAINT "CaseAssetFile_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseAssetFile" ADD CONSTRAINT "CaseAssetFile_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseCategory" ADD CONSTRAINT "CaseCategory_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkType" ADD CONSTRAINT "WorkType_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkType" ADD CONSTRAINT "WorkType_caseCategoryId_fkey" FOREIGN KEY ("caseCategoryId") REFERENCES "CaseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "WorkType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasePricingPlan" ADD CONSTRAINT "CasePricingPlan_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technician" ADD CONSTRAINT "Technician_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesRepresentative" ADD CONSTRAINT "SalesRepresentative_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedTooth" ADD CONSTRAINT "SelectedTooth_caseWorkItemId_fkey" FOREIGN KEY ("caseWorkItemId") REFERENCES "CaseWorkItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedTooth" ADD CONSTRAINT "SelectedTooth_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabSubscriptionPlan" ADD CONSTRAINT "LabSubscriptionPlan_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabUser" ADD CONSTRAINT "LabUser_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCaseCategory" ADD CONSTRAINT "_CaseToCaseCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCaseCategory" ADD CONSTRAINT "_CaseToCaseCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "CaseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
