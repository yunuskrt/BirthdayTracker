import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BirthdaysController } from './birthdays/birthdays.controller';
import { BirthdaysService } from './birthdays/birthdays.service';
import { BirthdaysModule } from './birthdays/birthdays.module';

@Module({
  imports: [BirthdaysModule],
  controllers: [AppController, BirthdaysController],
  providers: [AppService, BirthdaysService],
})
export class AppModule {}
