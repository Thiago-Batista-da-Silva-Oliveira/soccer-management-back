-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
