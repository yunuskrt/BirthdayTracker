import { Module } from '@nestjs/common';
import { BirthdaysService } from './birthdays.service';
import { BirthdaysController } from './birthdays.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Birthday, BirthdaySchema } from './schemas/birthdays.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Birthday.name, schema: BirthdaySchema }])],
    controllers: [BirthdaysController],
    providers: [BirthdaysService],
})
export class BirthdaysModule {}

