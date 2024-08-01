import { Dayjs } from "dayjs";

export type RegisterType = {
  email: string;
  password: string;
  name: string;
  IsAdmin: boolean;
  birthdate: Dayjs | null;
};
