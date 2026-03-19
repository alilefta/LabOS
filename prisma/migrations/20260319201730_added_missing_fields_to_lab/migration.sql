/*
  Warnings:

  - Added the required column `title` to the `Lab` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lab" ADD COLUMN     "brandAvatarUrl" TEXT,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
