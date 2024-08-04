import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBirthdayDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    date: Date;


    @IsString()
    @IsOptional()
    category: string;
}
