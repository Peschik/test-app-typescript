import { IUser } from "../types/types";

interface IState {
  usersList: IUser[];
  activeId: number;
  sortBy: string;
  edit: boolean;
}

interface IAction {
  type: string;
  payload: any;
}

const initialState: IState = {
  usersList: [],
  activeId: null,
  sortBy: "name",
  edit: false,
};

export const GET_ALL_USERS = "GET_ALL_USERS";
export const SET_ACTIVE_ID = "SET_ACTIVE_ID";
export const SET_ACTIVE_SORT = "SET_ACTIVE_SORT";
const usersReducer = (state: IState = initialState, action: IAction) => {
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

export default usersReducer;
