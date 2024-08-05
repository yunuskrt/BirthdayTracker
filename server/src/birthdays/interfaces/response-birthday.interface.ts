export interface ResponseBirthday {
  id: string;
  name: string;
  date: Date;
  category: string | null;
  daysUntil: number;
}