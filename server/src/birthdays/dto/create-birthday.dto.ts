import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from '../enums/category';

export class CreateBirthdayDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    date: Date;


    @IsEnum(Category)
    @IsOptional()
    category: string;
}
