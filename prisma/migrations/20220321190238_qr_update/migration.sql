/*
  Warnings:

  - The `qrStyleTheme` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "QR_STYLE" AS ENUM ('DOTS', 'SQUARES');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "qrStyleTheme",
ADD COLUMN     "qrStyleTheme" "QR_STYLE" NOT NULL DEFAULT E'DOTS';
