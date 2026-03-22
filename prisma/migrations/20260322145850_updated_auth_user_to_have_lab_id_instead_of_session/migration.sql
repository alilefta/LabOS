/*
  Warnings:

  - The `role` column on the `AuthUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `LabUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `SuperUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `labId` on the `session` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AuthUserRole" AS ENUM ('SYSTEM_USER', 'LAB_USER');

-- CreateEnum
CREATE TYPE "LabRole" AS ENUM ('MANAGER', 'ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "SuperUserRole" AS ENUM ('ADMIN', 'MANAGER', 'STAFF');

-- AlterTable
ALTER TABLE "AuthUser" ADD COLUMN     "labId" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "AuthUserRole" NOT NULL DEFAULT 'LAB_USER';

-- AlterTable
ALTER TABLE "LabUser" DROP COLUMN "role",
ADD COLUMN     "role" "LabRole" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "SuperUser" DROP COLUMN "role",
ADD COLUMN     "role" "SuperUserRole" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "session" DROP COLUMN "labId";

-- DropEnum
DROP TYPE "UserRole";
