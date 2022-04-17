import {
  GET_ALL_USERS,
  SET_ACTIVE_SORT,
  SET_ACTIVE_ID,
} from "../reducers/UsersReducer";
import { IUser } from "../types/types";

export const getAllUsers = (users: IUser[]) => {
  return {
    type: GET_ALL_USERS,
    payload: users,
  };
};
export const setActiveSort = (sortBy: string) => {
  return {
    type: SET_ACTIVE_SORT,
    payload: sortBy,
  };
};
export const setActiveId = (activeId: number) => {
  return {
    type: SET_ACTIVE_ID,
    payload: activeId,
  };
};