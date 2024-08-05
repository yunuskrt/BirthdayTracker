import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BirthdaysModule } from './birthdays/birthdays.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    BirthdaysModule, 
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }), 
    
  ],
})
export class AppModule {}
