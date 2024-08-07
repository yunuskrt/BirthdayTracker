import { Test, TestingModule } from '@nestjs/testing';

import { BirthdaysController } from '../birthdays.controller';
import { BirthdaysService } from '../birthdays.service';
import { ResponseBirthday } from '../interfaces/response-birthday.interface';
import { convertBirthdayToGetBirthday } from '../../utils/conversions';
import { birthdayStub } from './stubs/birthday.stub';
import { BadRequestException } from '@nestjs/common';
import { Category } from '../enums/category';

jest.mock('../birthdays.service');
describe('BirthdaysController', () => {
  let birthdaysController: BirthdaysController;
  let birthdaysService: BirthdaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [BirthdaysController],
      providers: [BirthdaysService],
    }).compile();

    birthdaysController = module.get<BirthdaysController>(BirthdaysController);
    birthdaysService = module.get<BirthdaysService>(BirthdaysService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(birthdaysController).toBeDefined();
    expect(birthdaysService).toBeDefined();
  });

  describe('findAll', () => {
    
    describe('should return all birthdays if no query parameter is provided', () => {
      describe('when findAll is called', () => {
        let birthdays: ResponseBirthday[];
        const req = { user: { id: '66b16cc80576739d200c3d81' } };
        beforeEach(async() => {
          birthdays = await birthdaysController.findAll(req, {});  
        })
        test('then it should call birthdaysService', () => {
          expect(birthdaysService.findAll).toHaveBeenCalledWith('66b16cc80576739d200c3d81');
        });
        test('then it should return birthdays', () => {
          expect(birthdays).toEqual([convertBirthdayToGetBirthday(birthdayStub())]);
        });
      });
    });

    describe('should return searched birthdays if name query parameter is provided', () => {
      describe('when findAll is called', () => {
        let birthdays: ResponseBirthday[];
        const req = { user: { id: '66b16cc80576739d200c3d81' } };
        const query = { name: 'John' };
        beforeEach(async() => {
          birthdays = await birthdaysController.findAll(req, query);  
        })
        test('then it should call birthdaysService', () => {
          expect(birthdaysService.findByName).toHaveBeenCalledWith('John', '66b16cc80576739d200c3d81');
        });
        test('then it should return birthdays', () => {
          expect(birthdays).toEqual([convertBirthdayToGetBirthday(birthdayStub())]);
        });
      });
    });

    describe('should throw BadRequestException if invalid query parameters are provided', () => {
      describe('when findAll is called', () => {
        const req = { user: { id: '66b16cc80576739d200c3d81' } };
        const query = { name: 'John', invalidParam: 'value' };
        test('then it should throw BadRequestException', async () => {
          await expect(birthdaysController.findAll(req, query)).rejects.toThrow(BadRequestException);
        });
      });
    });

  })

  describe('findUpcoming', () => {
    
    describe('should return upcoming birthdays', () => {
      describe('when findUpcoming is called', () => {
        let birthdays: ResponseBirthday[];
        const req = { user: { id: '66b16cc80576739d200c3d81' } };
        const period = 30; // stub generates birthday 10 days later today
        beforeEach(async() => {
          birthdays = await birthdaysController.findUpcoming(req, period);  
        })
        test('then it should call birthdaysService', () => {
          expect(birthdaysService.findAll).toHaveBeenCalledWith('66b16cc80576739d200c3d81');
        });
        test('then it should return birthdays', () => {
          expect(birthdays).toEqual([convertBirthdayToGetBirthday(birthdayStub())]);
        });
      });
    });

    describe('should return empty array if no upcoming birthdays', () => {
      describe('when findUpcoming is called', () => {
        let birthdays: ResponseBirthday[];
        const req = { user: { id: '66b16cc80576739d200c3d81' } };
        const period = 5; // stub generates birthday 10 days later today
        beforeEach(async() => {
          birthdays = await birthdaysController.findUpcoming(req, period);  
        })
        test('then it should call birthdaysService', () => {
          expect(birthdaysService.findAll).toHaveBeenCalledWith('66b16cc80576739d200c3d81');
        });
        test('then it should return empty array', () => {
          expect(birthdays).toEqual([]);
        });
      });
    });

    describe('should throw BadRequestException if invalid period is provided', () => {
      describe('when findUpcoming is called', () => {
        const req = { user: { id: '66b16cc80576739d200c3d81' } };
        const period = 0;
        test('then it should throw BadRequestException', async () => {
          await expect(birthdaysController.findUpcoming(req, period)).rejects.toThrow(BadRequestException);
        });
      });
    });

  });

  describe('findOne',()=>{

    describe('should find a birthday',()=>{
      describe('when findOne is called',()=>{
        let birthday: ResponseBirthday;
        const req = { user: { id: '66b16cc80576739d200c3d81' } };
        const id = '12345';
        beforeEach(async() => {
          birthday = await birthdaysController.findOne(req, id);  
        })
        test('then it should call birthdaysService', () => {
          expect(birthdaysService.findOne).toHaveBeenCalledWith( '12345','66b16cc80576739d200c3d81');
        });
        test('then it should return birthday', () => {
          expect(birthday).toEqual(convertBirthdayToGetBirthday(birthdayStub()));
        });
      });
    });

  })

  describe('create',()=>{

    describe('should create a birthday',()=>{
      describe('when create is called',()=>{
        let birthday: ResponseBirthday;
        const req = { user: { id: '66b16cc80576739d200c3d81' } };
        const createBirthdayDto = { name: 'Yunus', date: new Date('22-08-2000'), category: 'friends' };
        beforeEach(async() => {
          birthday = await birthdaysController.create(req, createBirthdayDto);  
        })
        test('then it should call birthdaysService', () => {
          expect(birthdaysService.create).toHaveBeenCalledWith({ ...createBirthdayDto, owner: '66b16cc80576739d200c3d81' });
        });
        test('then it should return birthday', () => {
          expect(birthday).toEqual(convertBirthdayToGetBirthday(birthdayStub()));
        });
      });
    });

  });

  describe('delete',()=>{

    describe('should delete a birthday',()=>{
      describe('when delete is called',()=>{
        const req = { user: { id: '66b16cc80576739d200c3d81' } };
        const id = '66b16cc80576739d200c3d81';
        beforeEach(async() => {
          await birthdaysController.delete(req, id);  
        })
        test('then it should call birthdaysService', () => {
          expect(birthdaysService.delete).toHaveBeenCalledWith('66b16cc80576739d200c3d81', '66b16cc80576739d200c3d81');
        });

      });
    });

  });

  describe('update',()=>{
   
    describe('should update a birthday',()=>{
      describe('when update is called',()=>{
        let birthday: ResponseBirthday;
        const req = { user: { id: '66b16cc80576739d200c3d81' } };
        const updateBirthdayDto = { name: 'Yunus', date: new Date('22-08-2000'), category: Category.FRIENDS };
        const id = '66b16cc80576739d200c3d81';
        beforeEach(async() => {
          birthday = await birthdaysController.update(req, updateBirthdayDto, id);  
        })
        test('then it should call birthdaysService', () => {
          expect(birthdaysService.update).toHaveBeenCalledWith('66b16cc80576739d200c3d81', { ...updateBirthdayDto, owner: '66b16cc80576739d200c3d81' });
        });
        test('then it should return birthday', () => {
          expect(birthday).toEqual(convertBirthdayToGetBirthday(birthdayStub()));
        });
      });
    });

  })

});
