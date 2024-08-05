import { Birthday } from 'src/birthdays/interfaces/birthday.interface';
import { ClientBirthday } from 'src/birthdays/interfaces/client-birthday.interface';

export function convertBirthdayToGetBirthday(birthday: Birthday): ClientBirthday {
  const date = birthday.date;
  const birthDay = date.getUTCDate();
  const birthMonth = date.getUTCMonth() + 1;

  const now = new Date();
  const currentYear = now.getFullYear();
  
  const nextBirthday = new Date(currentYear, birthMonth - 1, birthDay);
  if (nextBirthday < now) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  const diffTime = nextBirthday.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    id: birthday.id,
    name: birthday.name,
    date: birthday.date,
    category: birthday.category,
    daysUntil: diffDays,
  }
}
