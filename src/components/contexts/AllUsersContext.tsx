import { createContext } from "react";
import { IUser } from "../../types/types";

export const AllUsersContext = createContext<IUser[]>(null);
