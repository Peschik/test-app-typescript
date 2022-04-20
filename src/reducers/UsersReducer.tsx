import { IUser } from "../types/types";
import { useReducer } from "react";
interface IState {
  usersList: IUser[] | undefined;
  activeId: number;
  sortBy: string;
  edit: boolean;
}

interface IAction {
  type: string;
  payload: any;
}

export const GET_ALL_USERS = "GET_ALL_USERS";
export const SET_ACTIVE_ID = "SET_ACTIVE_ID";
export const SET_ACTIVE_SORT = "SET_ACTIVE_SORT";
export const usersReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, usersList: action.payload };
    case SET_ACTIVE_ID:
      return { ...state, activeId: action.payload };
    case SET_ACTIVE_SORT:
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
};
