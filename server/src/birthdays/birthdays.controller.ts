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
    HttpStatus,
    BadRequestException
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
    async findAll(@Request() req, @Query() query): Promise<ResponseBirthday[]> {
        const keys = Object.keys(query);  
        if (keys.length > 1 || (keys.length === 1 && keys[0] !== 'name')) {
            throw new BadRequestException('Only name parameter in query is allowed');
        }else if (keys.length === 1){
            // search by name functionality
            const searchedBirthdays = await this.birthdaysService.findByName(query.name, req.user.id);
            return searchedBirthdays.map((birthday) => {
                return convertBirthdayToGetBirthday(birthday);
            }).sort((a, b) => a.daysUntil - b.daysUntil);
        }
        const allBirthdays =  await this.birthdaysService.findAll(req.user.id);
        // add daysUntil to each birthday and sort ascending
        return allBirthdays.map((birthday) => {
            return convertBirthdayToGetBirthday(birthday);
        }).sort((a, b) => a.daysUntil - b.daysUntil);
    
        
       
    }

    @Get('upcoming')
    async findUpcoming(@Request() req, @Query('period', ParseIntPipe) period: number): Promise<ResponseBirthday[]> {
        if (period <= 0 || period > 90) {
            throw new BadRequestException('Period must be in range [1, 90]');
        }
        const ownerBirthdays = await this.birthdaysService.findAll(req.user.id);
        return ownerBirthdays.map((birthday) => {
            return convertBirthdayToGetBirthday(birthday);
        }).filter((birthday) => {
            return birthday.daysUntil <= period;
        }).sort((a, b) => a.daysUntil - b.daysUntil)
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
