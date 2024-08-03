/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "items" TEXT NOT NULL DEFAULT '1';

-- DropTable
DROP TABLE "Item";
