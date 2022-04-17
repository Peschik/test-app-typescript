import { NavLink } from "react-router-dom";
const UserItem = (props) => {
  const { id, name, city, company } = props;
  return (
    <li
      tabIndex={0}
      className={"user-item"}

      // onClick={() => {props.onCharSelected(item.id)}}
      // onKeyPress= {(e) => {
      //     e.preventDefault()
      //     if (e.key === ' ' || e.key === 'Enter') {
      //         props.onCharSelected(item.id);
      //     }
      // }}
    >
      <p>
        <span>ФИО:</span>
        {name}
      </p>
      <p>
        <span>город:</span>
        {city}
      </p>
      <div className="card-bottom">
        <p>
          <span>компания:</span>
          {company}
        </p>
        <NavLink to="/user" onClick={() => props.onMoreSelect(id)}>
          Подробнее
        </NavLink>
      </div>
    </li>
  );
};
export default UserItem;
