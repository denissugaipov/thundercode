-- AlterTable
ALTER TABLE "User" ADD COLUMN     "qrEyeRadius" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "qrForegroundColor" TEXT NOT NULL DEFAULT E'#000',
ADD COLUMN     "qrStyleTheme" TEXT NOT NULL DEFAULT E'dots',
ALTER COLUMN "verified" SET DEFAULT false;