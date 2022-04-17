import Page from "./components/pages/PageList/Page";
import UsersList from "./components/usersList/UsersList";
import PageProfile from "./components/pages/PageProfile/PageProfile";
import useUsersService from "./components/services/useUsersService";
import { useEffect, useState, FC } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AppFilters from "./components/app-filters/AppFilters";
import { Row, Col } from "react-bootstrap";

import { UserContext } from "./components/contexts/UserContext";
import { AllUsersContext } from "./components/contexts/AllUsersContext";
import { IUser } from "./types/types";

export const App: FC = () => {
  const { getAllUsers } = useUsersService();
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentId, setCurrentId] = useState<number>();

  useEffect(() => {
    onRequest();
  }, []);

  useEffect(() => {
    sortPost(usersList, sortBy);
  }, [sortBy]);

  const onRequest = () => {
    getAllUsers().then(onUsersListLoaded);
  };

  const sortPost = (items: IUser[], sortBy: string) => {
    setUsersList(sortArray(items, sortBy));
  };

  const onSortSelect = (sortName: string) => {
    sortName !== sortBy ? setSortBy(sortName) : setSortBy("name");
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

  const onUsersListLoaded = (usersList: IUser[]) => setUsersList(usersList);

  const onMoreSelect = (gotId: number) => {
    setCurrentId(gotId);
  };

  const currentUser: IUser = usersList.find((item) => item.id === currentId);
  const sortedUsers = sortArray(usersList, sortBy);

  return (
    <Router>
      <Row>
        <Col className="col-filters" sm={4} md={2} lg={2}>
          <AppFilters onSortSelect={onSortSelect} />
        </Col>
        <AllUsersContext.Provider value={sortedUsers}>
          <UserContext.Provider value={currentUser}>
            <Routes>
              <Route
                path="/"
                element={
                  <Page content={<UsersList onMoreSelect={onMoreSelect} />} />
                }
              ></Route>
              <Route
                path="/user"
                element={<Page content={<PageProfile />} />}
              ></Route>
              <Route path="/test" element={<h1>sdfwrgfrewge</h1>}></Route>
            </Routes>
          </UserContext.Provider>
        </AllUsersContext.Provider>
      </Row>
    </Router>
  );
};
