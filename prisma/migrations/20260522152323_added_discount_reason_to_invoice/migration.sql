-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "appliedDiscountPercentage" DECIMAL(5,2),
ADD COLUMN     "discountReason" TEXT;
