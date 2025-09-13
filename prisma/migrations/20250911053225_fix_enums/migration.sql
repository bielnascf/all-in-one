/*
  Warnings:

  - The values [Revenue] on the enum `FinanceCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pix,Deposit,Salary,Rent,AutoDebit,CreditCard] on the enum `FinanceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."FinanceCategory_new" AS ENUM ('Income', 'Expense');
ALTER TABLE "public"."Finance" ALTER COLUMN "category" TYPE "public"."FinanceCategory_new" USING ("category"::text::"public"."FinanceCategory_new");
ALTER TYPE "public"."FinanceCategory" RENAME TO "FinanceCategory_old";
ALTER TYPE "public"."FinanceCategory_new" RENAME TO "FinanceCategory";
DROP TYPE "public"."FinanceCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."FinanceType_new" AS ENUM ('Income', 'Housing', 'Transportation', 'Food', 'PersonalCare', 'Entertainment', 'Health', 'Shopping', 'Miscellaneous');
ALTER TABLE "public"."Finance" ALTER COLUMN "type" TYPE "public"."FinanceType_new" USING ("type"::text::"public"."FinanceType_new");
ALTER TYPE "public"."FinanceType" RENAME TO "FinanceType_old";
ALTER TYPE "public"."FinanceType_new" RENAME TO "FinanceType";
DROP TYPE "public"."FinanceType_old";
COMMIT;
