-- CreateTable
CREATE TABLE `client_tbl` (
    `client_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'BLOCKED') NOT NULL DEFAULT 'ACTIVE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `client_tbl_email_key`(`email`),
    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_tbl` (
    `project_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `client_id` BIGINT NOT NULL,
    `amount` DOUBLE NOT NULL,
    `deposit` DOUBLE NOT NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `notes` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_tbl` (
    `invoice_id` BIGINT NOT NULL AUTO_INCREMENT,
    `project_id` BIGINT NOT NULL,
    `amount` DOUBLE NOT NULL,
    `deposit` DOUBLE NOT NULL,
    `paid_amount` DOUBLE NOT NULL DEFAULT 0,
    `status` ENUM('PENDING', 'PARTIALLY_PAID', 'PAID') NOT NULL DEFAULT 'PENDING',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`invoice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `project_tbl` ADD CONSTRAINT `project_tbl_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client_tbl`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_tbl` ADD CONSTRAINT `invoice_tbl_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project_tbl`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
