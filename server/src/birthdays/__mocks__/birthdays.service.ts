import { birthdayStub } from '../test/stubs/birthday.stub';

export const BirthdaysService = jest.fn().mockReturnValue({
    findAll: jest.fn().mockResolvedValue([birthdayStub()]),
    findByName: jest.fn().mockResolvedValue([birthdayStub()]),
    findOne: jest.fn().mockResolvedValue(birthdayStub()),
    create: jest.fn().mockResolvedValue(birthdayStub()),
    delete: jest.fn().mockResolvedValue(birthdayStub()),
    update: jest.fn().mockResolvedValue(birthdayStub()),
});