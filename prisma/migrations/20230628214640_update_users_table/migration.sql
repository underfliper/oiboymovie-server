-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMALE', 'MALE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "country" VARCHAR(255),
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "phone" VARCHAR(11);
