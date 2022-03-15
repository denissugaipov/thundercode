/*
  Warnings:

  - You are about to drop the column `userdataId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Userdata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userdataId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userdataId",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "specify" TEXT,
ADD COLUMN     "verified" BOOLEAN;

-- DropTable
DROP TABLE "Userdata";
