import { Module } from '@nestjs/common';
import { BirthdaysService } from './birthdays.service';
import { BirthdaysController } from './birthdays.controller';

@Module({
    controllers: [BirthdaysController],
    providers: [BirthdaysService],
})
export class BirthdaysModule {}

