/*
  Warnings:

  - The primary key for the `clinic_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `clinics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `customer_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `selected_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `clinic_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `clinic_id` on the `clinic_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `service_id` on the `clinic_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `clinics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `customer_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `client_id` on the `customer_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `professional_id` on the `customer_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `selected_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `clinic_service_id` on the `selected_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `customer_service_id` on the `selected_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role_id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "clinic_services" DROP CONSTRAINT "clinic_services_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_services" DROP CONSTRAINT "clinic_services_service_id_fkey";

-- DropForeignKey
ALTER TABLE "customer_services" DROP CONSTRAINT "customer_services_client_id_fkey";

-- DropForeignKey
ALTER TABLE "customer_services" DROP CONSTRAINT "customer_services_professional_id_fkey";

-- DropForeignKey
ALTER TABLE "selected_services" DROP CONSTRAINT "selected_services_clinic_service_id_fkey";

-- DropForeignKey
ALTER TABLE "selected_services" DROP CONSTRAINT "selected_services_customer_service_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AlterTable
ALTER TABLE "clinic_services" DROP CONSTRAINT "clinic_services_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "clinic_id",
ADD COLUMN     "clinic_id" UUID NOT NULL,
DROP COLUMN "service_id",
ADD COLUMN     "service_id" UUID NOT NULL,
ADD CONSTRAINT "clinic_services_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "clinics" DROP CONSTRAINT "clinics_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "clinics_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "customer_services" DROP CONSTRAINT "customer_services_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "client_id",
ADD COLUMN     "client_id" UUID NOT NULL,
DROP COLUMN "professional_id",
ADD COLUMN     "professional_id" UUID NOT NULL,
ADD CONSTRAINT "customer_services_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "selected_services" DROP CONSTRAINT "selected_services_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "clinic_service_id",
ADD COLUMN     "clinic_service_id" UUID NOT NULL,
DROP COLUMN "customer_service_id",
ADD COLUMN     "customer_service_id" UUID NOT NULL,
ADD CONSTRAINT "selected_services_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "services" DROP CONSTRAINT "services_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "services_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "role_id",
ADD COLUMN     "role_id" UUID NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_services" ADD CONSTRAINT "customer_services_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_services" ADD CONSTRAINT "customer_services_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_services" ADD CONSTRAINT "clinic_services_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_services" ADD CONSTRAINT "clinic_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selected_services" ADD CONSTRAINT "selected_services_clinic_service_id_fkey" FOREIGN KEY ("clinic_service_id") REFERENCES "clinic_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selected_services" ADD CONSTRAINT "selected_services_customer_service_id_fkey" FOREIGN KEY ("customer_service_id") REFERENCES "customer_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
