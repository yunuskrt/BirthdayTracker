import { 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Put, 
    Post, 
    Body, 
    NotFoundException,
    HttpCode,
    Query,
    ParseIntPipe,
    Request
} from '@nestjs/common';
import { BirthdaysService } from './birthdays.service';
import { CreateBirthdayDto } from './dto/create-birthday.dto';
import { UpdateBirthdayDto } from './dto/update-birthday.dto';
import { ResponseBirthday } from './interfaces/response-birthday.interface';
import { convertBirthdayToGetBirthday } from 'src/utils/conversions';


@Controller('api/v1/birthdays')
export class BirthdaysController {
    constructor(private birthdaysService: BirthdaysService) {}

    @Get()
    async findAll(@Request() req): Promise<ResponseBirthday[]> {
        const allBirthdays =  await this.birthdaysService.findAll();
        console.log(req.user);
        // add daysUntil to each birthday and sort ascending
        return allBirthdays.map((birthday) => {
            return convertBirthdayToGetBirthday(birthday);
        }).sort((a, b) => a.daysUntil - b.daysUntil);
    }

    @Get('upcoming')
    findUpcoming(@Query('period', ParseIntPipe) period: number): string{
        return `Upcoming birthdays for ${period} period`;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ResponseBirthday> {
        const birthday = await this.birthdaysService.findOne(id);
        if (!birthday) {
            throw new NotFoundException(`Birthday with id ${id} not found`);
        }
        return convertBirthdayToGetBirthday(birthday)
    }

    @Post()
    async create(@Body() createBirthDayDto: CreateBirthdayDto ) : Promise<ResponseBirthday> {
        const createdBirthday =  await this.birthdaysService.create(createBirthDayDto);
        return convertBirthdayToGetBirthday(createdBirthday)
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string): Promise<void> {
        const birthday =  await this.birthdaysService.delete(id);
        if (!birthday) {
            throw new NotFoundException(`Birthday with id ${id} not found`);
        }
    }

    @Put(':id')
    async update(@Body() updateBirthdayDto: UpdateBirthdayDto, @Param('id') id: string) : Promise<ResponseBirthday> {
        const updatedBirthday =  await this.birthdaysService.update(id, updateBirthdayDto);
         if (!updatedBirthday) {
            throw new NotFoundException(`Birthday with id ${id} not found`);
        }
        return convertBirthdayToGetBirthday(updatedBirthday)
    }

}
