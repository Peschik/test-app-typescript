import { createContext } from "react";
import { IUserCard } from "../../types/types";

export const AllUsersContext = createContext<IUserCard[]>(null);
