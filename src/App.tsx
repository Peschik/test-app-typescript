import Page from "./components/pages/PageList/Page";
import UsersList from "./components/usersList/UsersList";
import PageProfile from "./components/pages/PageProfile/PageProfile";
import useUsersService from "./components/services/useUsersService";
import { useEffect, FC, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppSorters from "./components/app-filters/AppSorters";
import { Row, Col } from "react-bootstrap";

import { UserContext } from "./components/contexts/UserContext";
import { AllUsersContext } from "./components/contexts/AllUsersContext";
import { EditContext } from "./components/contexts/EditContext";
import { IUser } from "./types/types";
import { usersReducer } from "./reducers/UsersReducer";
import {
  setAllUsers,
  setActiveSort,
  setActiveId,
  editUser,
} from "./actions/actions";

export const App: FC = () => {
  const { getAllUsers } = useUsersService();
  // const [usersList, setUsersList] = useState<IUser[]>([]);
  // const [sortBy, setSortBy] = useState<string>("name");
  // const [currentId, setCurrentId] = useState<number>();

  const [{ usersList, sortBy, activeId, edit }, dispatch] = useReducer(
    usersReducer,
    {
      usersList: [],
      sortBy: "",
      edit: false,
      activeId: null,
    }
  );

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    getAllUsers()
      .then(onUsersListLoaded)
      .catch((error) => console.log(error));
  };

  const onUsersListLoaded = (usersList: IUser[]) => {
    dispatch(setAllUsers(usersList));
  };

  // useEffect(() => {
  //   sortPost(usersList, sortBy);
  // }, [sortBy]);
  // const sortPost = (items: IUser[], sortBy: string) => {
  //   setUsersList(sortArray(items, sortBy));
  // };

  const onSortSelect = (sortName: string) => {
    sortName !== sortBy
      ? dispatch(setActiveSort(sortName))
      : dispatch(setActiveSort("name"));
  };

  const onEditSelect = () => {
    dispatch(editUser(true));
  };

  const sortArray = (
    arr: IUser[],
    sortBy: IUser["name"] | IUser["city"] | IUser["company"]
  ) => {
    const sortedList = arr.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return -1;
    });
    return sortedList;
  };

  const onMoreSelect = (gotId: number) => {
    dispatch(setActiveId(gotId));
  };

  const currentUser: IUser = usersList.find(
    (item: IUser) => item.id === activeId
  );
  const sortedUsers = sortArray(usersList, sortBy);

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
            path="/user"
            element={
              <UserContext.Provider value={currentUser}>
                <EditContext.Provider value={edit} />
                <Page content={<PageProfile onEditSelect={onEditSelect} />} />
              </UserContext.Provider>
            }
          ></Route>
        </Routes>
      </Row>
    </Router>
  );
};
