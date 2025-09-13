-- CreateEnum
CREATE TYPE "public"."FinanceCategory" AS ENUM ('Revenue', 'Expense');

-- CreateEnum
CREATE TYPE "public"."FinanceType" AS ENUM ('Pix', 'Deposit', 'Salary', 'Rent', 'AutoDebit', 'CreditCard');

-- CreateEnum
CREATE TYPE "public"."FinanceStatus" AS ENUM ('Pending', 'Paid', 'Received');

-- CreateTable
CREATE TABLE "public"."Finance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "public"."FinanceCategory" NOT NULL,
    "type" "public"."FinanceType" NOT NULL,
    "status" "public"."FinanceStatus" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Finance_userId_idx" ON "public"."Finance"("userId");
