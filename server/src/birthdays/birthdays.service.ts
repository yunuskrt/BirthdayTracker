import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Birthday } from './schemas/birthdays.schema';

@Injectable()
export class BirthdaysService {
    constructor(@InjectModel('Birthday') private readonly birthdayModel: Model<Birthday>) {}

    async findAll(): Promise<Birthday[]> {
        return await this.birthdayModel.find();
    }

    async findOne(id: string): Promise<Birthday> {
        return await this.birthdayModel.findOne({ _id: id });
    }

    async create(birthday: Birthday): Promise<Birthday> {
        const newBirthday = new this.birthdayModel(birthday);
        return await newBirthday.save();
    }

    async delete(id: string): Promise<Birthday> {
        return await this.birthdayModel.findByIdAndDelete(id);
    }

    async update(id: string, birthday: Birthday): Promise<Birthday> {
        return await this.birthdayModel.findByIdAndUpdate(id, birthday, { new: true });
    }

}
