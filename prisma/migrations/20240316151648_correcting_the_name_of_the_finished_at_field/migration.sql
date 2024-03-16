/*
  Warnings:

  - You are about to drop the column `fineshed_at` on the `customer_services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer_services" DROP COLUMN "fineshed_at",
ADD COLUMN     "finished_at" TIMESTAMP(3);
