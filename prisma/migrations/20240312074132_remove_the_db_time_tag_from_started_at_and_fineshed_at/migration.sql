/*
  Warnings:

  - The `started_at` column on the `customer_services` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fineshed_at` column on the `customer_services` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "customer_services" DROP COLUMN "started_at",
ADD COLUMN     "started_at" TIMESTAMP(3),
DROP COLUMN "fineshed_at",
ADD COLUMN     "fineshed_at" TIMESTAMP(3);
