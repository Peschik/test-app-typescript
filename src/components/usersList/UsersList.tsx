import "./usersList.scss";
import UserItem from "../userItem/UserItem";
import { useContext } from "react";
import { AllUsersContext } from "../contexts/AllUsersContext";

const UsersList = ({ onMoreSelect }) => {
  const gotUsersList = useContext(AllUsersContext);
  function renderItems(arr) {
    const items = arr.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <UserItem
          key={id}
          onMoreSelect={() => onMoreSelect(id)}
          {...itemProps}
        />
      );
    });
    return <ul>{items}</ul>;
  }
  const items = renderItems(gotUsersList);

  return (
    <div className="list-container">
      <h1 className="mt-4 mb-4 header-list">Список пользователей</h1>
      {items}
      <div className="total-count">
        {gotUsersList.length > 0 ? (
          <span className="total mb-4">
            Найдено {gotUsersList.length} пользователей
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default UsersList;
