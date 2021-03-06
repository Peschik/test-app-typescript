import Page from "./components/pages/PageList/Page";
import UsersList from "./components/usersList/UsersList";
import PageProfile from "./components/pages/PageProfile/PageProfile";
import useUsersService from "./components/services/useUsersService";
import { useEffect, FC, useReducer, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppSorters from "./components/app-filters/AppSorters";
import { Row } from "react-bootstrap";

import { UserContext } from "./components/contexts/UserContext";
import { AllUsersContext } from "./components/contexts/AllUsersContext";
import { IUserCard } from "./types/types";
import { usersReducer } from "./reducers/UsersReducer";
import {
  setAllUsers,
  setActiveSort,
  setActiveId,
  editUser,
} from "./actions/actions";

export const App: FC = () => {
  const { getAllUsers } = useUsersService();

  const [{ usersList, sortBy, activeId, edit }, dispatch] = useReducer(
    usersReducer,
    {
      usersList: [],
      sortBy: "name",
      edit: false,
      activeId: null,
    }
  );

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (): void => {
    getAllUsers()
      .then(onUsersListLoaded)
      .catch((error) => console.log(error));
  };

  const onUsersListLoaded = (usersList: IUserCard[]): void => {
    dispatch(setAllUsers(usersList));
  };

  const onSortSelect = useCallback(
    (sortName: string): void => {
      sortName !== sortBy
        ? dispatch(setActiveSort(sortName))
        : dispatch(setActiveSort("name"));
    },
    [sortBy]
  );

  const onEditSelect = useCallback((): void => {
    dispatch(editUser());
  }, [edit]);

  const onMoreSelect = useCallback(
    (gotId: number): void => {
      dispatch(setActiveId(gotId));
    },
    [activeId]
  );

  const sortArray = (arr: IUserCard[], sortBy: any): IUserCard[] => {
    const sortedArray = arr.sort((a, b) => {
      const subSort = sortBy.split(".");
      let firstToSort = a;
      let secondToSort = b;
      for (let propOfObj of subSort) {
        firstToSort = firstToSort[propOfObj];
        secondToSort = secondToSort[propOfObj];
      }
      if (firstToSort > secondToSort) {
        return 1;
      }
      return -1;
    });
    return sortedArray;
  };

  const sortedUsers: IUserCard[] = sortArray(usersList, sortBy);

  // ???????????????????? ?????????????????????? ?????????????????? ???????????????????? ???? ????????????????????

  return (
    <Router>
      <Row>
        <AppSorters onSortSelect={onSortSelect} />
        <Routes>
          <Route
            path="/"
            element={
              <AllUsersContext.Provider value={sortedUsers}>
                <Page content={<UsersList onMoreSelect={onMoreSelect} />} />
              </AllUsersContext.Provider>
            }
          ></Route>
          <Route
            path="/user/:id"
            element={
              <UserContext.Provider value={edit}>
                <Page content={<PageProfile onEditSelect={onEditSelect} />} />
              </UserContext.Provider>
            }
          ></Route>
        </Routes>
      </Row>
    </Router>
  );
};
