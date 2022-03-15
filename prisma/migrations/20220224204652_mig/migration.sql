-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userdataId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Userdata" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specify" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Userdata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userdataId_fkey" FOREIGN KEY ("userdataId") REFERENCES "Userdata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
