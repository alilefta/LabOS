-- AlterTable
ALTER TABLE "Dentist" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "specialty" TEXT;

-- CreateIndex
CREATE INDEX "Dentist_clinicId_isActive_idx" ON "Dentist"("clinicId", "isActive");
