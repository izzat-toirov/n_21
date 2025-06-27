import { User } from "../model/user.model";

export const UserStub = (): Partial<User> => {
  return {
    id: 1,
    name: "user1",
    email: "example@getMaxListeners.com",
    password: "12345qwert!@#$",
  };
};
