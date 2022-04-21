import {
  GET_ALL_USERS,
  SET_ACTIVE_SORT,
  SET_ACTIVE_ID,
  EDIT_USER,
} from "../reducers/UsersReducer";
import { IUser } from "../types/types";

export const setAllUsers = (users: IUser[]) => {
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
export const editUser = () => {
  return {
    type: EDIT_USER,
  };
};
