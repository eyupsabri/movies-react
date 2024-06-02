import { UserType } from "./User.type";

export type MovieReviewType = {
  title: string;
  description: string;
  star: number;
  created: Date;
  userName: string;
  userNickName?: string;
};
