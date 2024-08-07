// birthday.stub.ts

import { Types } from 'mongoose';
import { Birthday } from 'src/birthdays/schemas/birthdays.schema'; // Make sure this path is correct based on your project structure

const get10DaysLater = (): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 10);

  const year = tomorrow.getFullYear();
  const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
  const day = tomorrow.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const birthdayStub = (): Birthday => {
  return {
    name: 'Yunus Tan Kerestecioglu',
    owner: new Types.ObjectId('66b16cc80576739d200c3d81') as any, // Replace with a valid user object ID
    date: new Date(get10DaysLater()),
    category: 'friends'
  };
};
