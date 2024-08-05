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
} from '@nestjs/common';
import { BirthdaysService } from './birthdays.service';
import { Birthday } from './interfaces/birthday.interface';
import { CreateBirthdayDto } from './dto/create-birthday.dto';
import { UpdateBirthdayDto } from './dto/update-birthday.dto';


@Controller('api/v1/birthdays')
export class BirthdaysController {
    constructor(private birthdaysService: BirthdaysService) {}
    
    @Get()
    async findAll(): Promise<Birthday[]> {
        return await this.birthdaysService.findAll();

    }


    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Birthday> {
        const birthday = await this.birthdaysService.findOne(id);
        console.log({birthday, type: typeof birthday});
        if (!birthday) {
            throw new NotFoundException(`Birthday with id ${id} not found`);
        }
        return birthday
    }

    

    @Post()
    async create(@Body() createBirthDayDto: CreateBirthdayDto ) : Promise<Birthday> {
        return await this.birthdaysService.create(createBirthDayDto);
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
    async update(@Body() updateBirthdayDto: UpdateBirthdayDto, @Param('id') id: string) : Promise<Birthday> {
        const birthday =  await this.birthdaysService.update(id, updateBirthdayDto);
         if (!birthday) {
            throw new NotFoundException(`Birthday with id ${id} not found`);
        }
        return birthday
    }

}
