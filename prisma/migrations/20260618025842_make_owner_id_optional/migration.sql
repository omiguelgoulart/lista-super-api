-- DropForeignKey
ALTER TABLE "lists" DROP CONSTRAINT "lists_owner_id_fkey";

-- AlterTable
ALTER TABLE "lists" ALTER COLUMN "owner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
