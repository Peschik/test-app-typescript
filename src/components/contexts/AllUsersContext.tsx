import { createContext } from "react";
import { IUserCard } from "../../types/types";

type UsersContextData = {
  sortedUsers: IUserCard[];
  sortBy: string;
};

export const AllUsersContext = createContext<UsersContextData>(null);
