-- CreateEnum
CREATE TYPE "SupportedCurrency" AS ENUM ('IQD', 'USD', 'AED', 'SAR', 'EUR');

-- CreateEnum
CREATE TYPE "SupportedLanguage" AS ENUM ('EN', 'AR', 'KU');

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "isWarranty" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "manualDiscountAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "manualDiscountReason" TEXT;

-- CreateTable
CREATE TABLE "LabSettings" (
    "id" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "currency" "SupportedCurrency" NOT NULL DEFAULT 'IQD',
    "language" "SupportedLanguage" NOT NULL DEFAULT 'EN',
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Baghdad',
    "taxRatePercentage" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "invoicePrefix" TEXT NOT NULL DEFAULT 'INV-',
    "requirePaymentToDeliver" BOOLEAN NOT NULL DEFAULT false,
    "autoSendWhatsAppOnCompletion" BOOLEAN NOT NULL DEFAULT false,
    "autoEmailInvoices" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabSettings_labId_key" ON "LabSettings"("labId");

-- AddForeignKey
ALTER TABLE "LabSettings" ADD CONSTRAINT "LabSettings_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
