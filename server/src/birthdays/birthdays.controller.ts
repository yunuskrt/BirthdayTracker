import { Controller, Delete, Get, Param, Patch, Post,ParseIntPipe, Body } from '@nestjs/common';
import { BirthdaysService } from './birthdays.service';
import { Birthday } from './interfaces/birthday.interface';
import { CreateBirthdayDto } from './dto/create-birthday.dto';


@Controller('api/v1/birthdays')
export class BirthdaysController {
    constructor(private birthdaysService: BirthdaysService) {}
    private id: number = 1
    @Get()
    findAll() : Birthday[]{
        return this.birthdaysService.findAll();
    }

    @Post()
    create(@Body() createBirthDayDto: CreateBirthdayDto ) : Birthday {
        const id = `id-${this.id}`;
        this.id++;
        return this.birthdaysService.create({id, ...createBirthDayDto});
    }

    @Get('upcoming')
    findUpcoming() : Birthday[] {
        return this.birthdaysService.findUpcoming();
    }

    @Get(':id')
    findOne(
    // @Param('id', ParseIntPipe) id: string,
    @Param('id') id: string,
    ) : Birthday {
       return this.birthdaysService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id :string, @Body() updateBirthdayDto: CreateBirthdayDto) : Birthday{
        return this.birthdaysService.update(id, updateBirthdayDto);
    }

    @Delete(':id')
    delete(@Param('id') id :string) : void {
        return this.birthdaysService.delete(id);
    }



}
