/*
  Warnings:

  - You are about to alter the column `status` on the `jobs_tbl` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `jobs_tbl` MODIFY `status` ENUM('OPEN', 'CLOSED', 'PAUSED') NOT NULL DEFAULT 'OPEN';
