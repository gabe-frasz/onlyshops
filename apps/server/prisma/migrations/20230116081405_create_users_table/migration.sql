/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gihtubId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "users_gihtubId_key" ON "users"("gihtubId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
