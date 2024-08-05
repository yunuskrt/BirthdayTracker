import { IsDateString, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from '../enums/category';

export class UpdateBirthdayDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    date: Date;


    @IsIn([null, ...Object.values(Category)])
    category: Category | null;
}
