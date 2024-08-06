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
    Request,
    HttpStatus
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
        const allBirthdays =  await this.birthdaysService.findAll(req.user.id);
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
    async findOne(@Request() req, @Param('id') id: string): Promise<ResponseBirthday> {
        const birthday = await this.birthdaysService.findOne(id, req.user.id);
        if (!birthday) {
            throw new NotFoundException(`Birthday with id ${id} not found`);
        }
        return convertBirthdayToGetBirthday(birthday)
    }

    @Post()
    async create(@Request() req, @Body() createBirthDayDto: CreateBirthdayDto ) : Promise<ResponseBirthday> {
        const createBirthDayDtoWithOwner = {...createBirthDayDto, owner: req.user.id};
        
        const createdBirthday =  await this.birthdaysService.create(createBirthDayDtoWithOwner);
        return convertBirthdayToGetBirthday(createdBirthday)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Request() req, @Param('id') id: string): Promise<void> {
        const birthday =  await this.birthdaysService.delete(id, req.user.id);
        if (!birthday) {
            throw new NotFoundException(`Birthday with id ${id} not found`);
        }
    }

    @Put(':id')
    async update(@Request() req, @Body() updateBirthdayDto: UpdateBirthdayDto, @Param('id') id: string) : Promise<ResponseBirthday> {
        const updatedBirthdayDtoWithOwner = {...updateBirthdayDto, owner: req.user.id};
        const updatedBirthday =  await this.birthdaysService.update(id, updatedBirthdayDtoWithOwner);
        if (!updatedBirthday) {
            throw new NotFoundException(`Birthday with id ${id} not found`);
        }
        return convertBirthdayToGetBirthday(updatedBirthday)
    }

}
