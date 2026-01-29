/*
  Warnings:

  - You are about to alter the column `status` on the `user_tbl` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `event_log_tbl` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user_tbl` MODIFY `status` ENUM('Active', 'Inactive', 'Blocked') NOT NULL DEFAULT 'Active';
