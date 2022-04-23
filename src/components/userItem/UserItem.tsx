import { Link } from "react-router-dom";

const UserItem = ({ userProps, onMoreSelect }) => {
  const { id, name, address, company } = userProps;
  return (
    <li tabIndex={0} className={"user-item"}>
      <p>
        <span>ФИО:</span>
        {name}
      </p>
      <p>
        <span>город:</span>
        {address.city}
      </p>
      <div className="card-bottom">
        <p>
          <span>компания:</span>
          {company.name}
        </p>
        <Link to={`/user/${id}`} onClick={() => onMoreSelect(id)}>
          Подробнее
        </Link>
      </div>
    </li>
  );
};
export default UserItem;
