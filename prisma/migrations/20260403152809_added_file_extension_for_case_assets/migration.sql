/*
  Warnings:

  - Added the required column `fileExtension` to the `CaseAssetFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CaseAssetFile" ADD COLUMN     "fileExtension" TEXT NOT NULL;
