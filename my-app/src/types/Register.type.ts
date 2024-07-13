import { Dayjs } from "dayjs";

export type RegisterType = {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  birthdate: Dayjs | null;
};
