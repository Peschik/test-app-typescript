import "./usersList.scss";
import UserItem from "../userItem/UserItem";
import { useContext } from "react";
import { AllUsersContext } from "../contexts/AllUsersContext";
import { IUserCard, IReducedAddress } from "../../types/types";

const UsersList = ({ onMoreSelect }) => {
  const { sortedUsers, sortBy } = useContext(AllUsersContext);

  function renderItems(arr: IUserCard[]) {
    const items = arr.map((item) => {
      const { id } = item;
      return (
        <UserItem
          key={id}
          onMoreSelect={() => onMoreSelect(id)}
          userProps={item}
        />
      );
    });
    return <ul>{items}</ul>;
  }
  const items = renderItems(sortedUsers);

  return (
    <div className="list-container">
      <h1 className="mt-4 mb-4 header-list">Список пользователей</h1>
      {items}
      <div className="total-count">
        {sortedUsers.length > 0 ? (
          <span className="total mb-4">
            Найдено {sortedUsers.length} пользователей
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default UsersList;
