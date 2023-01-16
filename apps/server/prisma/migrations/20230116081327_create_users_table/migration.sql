-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gihtubId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_gihtubId_key" ON "User"("gihtubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
