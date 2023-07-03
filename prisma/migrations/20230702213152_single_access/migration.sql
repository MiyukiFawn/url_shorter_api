/*
  Warnings:

  - Added the required column `single_access` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "single_access" BOOLEAN NOT NULL;
