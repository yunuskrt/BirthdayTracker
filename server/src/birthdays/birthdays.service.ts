import { Injectable } from '@nestjs/common';
import { Birthday } from './interfaces/birthday.interface';

@Injectable()
export class BirthdaysService {
    private readonly birthdays: Birthday[] = [];

    create(birthday: Birthday): Birthday {
        this.birthdays.push(birthday);
        return birthday;
    }

    findAll(): Birthday[] {
        return this.birthdays;
    }

    findOne(id: string): Birthday {
        return this.birthdays.find(birthday => birthday.id === id);
    }

    update(id: string, birthday: Birthday) : Birthday {
        const index = this.birthdays.findIndex(birthday => birthday.id === id);
        this.birthdays[index] = birthday;
        return birthday;
    }

    delete(id: string) {
        const index = this.birthdays.findIndex(birthday => birthday.id === id);
        this.birthdays.splice(index, 1);
    }

    findUpcoming() {
        return this.birthdays.filter(birthday => {
            const today = new Date();
            const date = new Date(birthday.date);
            return date.getMonth() === today.getMonth() && date.getDate() > today.getDate();
        });
    }


}
