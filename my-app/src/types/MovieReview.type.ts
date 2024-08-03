import { UserType } from "./User.type";

export type MovieReviewType = {
  id: string;
  title: string;
  description: string;
  star: number;
  created: Date;
  userName: string;
  userNickName?: string;
  userId: string;
};
