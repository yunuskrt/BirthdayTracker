import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Birthday } from './schemas/birthdays.schema';

@Injectable()
export class BirthdaysService {
    constructor(@InjectModel('Birthday') private readonly birthdayModel: Model<Birthday>) {}

    async findAll(ownerId: string): Promise<Birthday[]> {
        return await this.birthdayModel.find({ owner: ownerId });
    }

    async findOne(id: string, ownerId: string): Promise<Birthday> {
        return await this.birthdayModel.findOne({ _id: id, owner: ownerId });
    }

    async create(birthday: Birthday): Promise<Birthday> {
        const newBirthday = new this.birthdayModel(birthday);
        return await newBirthday.save();
    }

    async delete(id: string, ownerId: string): Promise<Birthday> {
        return await this.birthdayModel.findOneAndDelete({ _id: id, owner: ownerId });
    }

    async update(id: string, birthday: Birthday): Promise<Birthday> {
        return await this.birthdayModel.findByIdAndUpdate(id, birthday, { new: true });
    }

}
