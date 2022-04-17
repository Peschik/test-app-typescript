import { createContext } from "react";
import { IUser } from "../../types/types";

export const UserContext = createContext<IUser>(null);
