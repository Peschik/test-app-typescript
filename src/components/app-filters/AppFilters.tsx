import "./AppFilters.scss";
import { Button } from "react-bootstrap";
import goHome from "../../img/home-button.png";
import { Link } from "react-router-dom";
import { FC } from "react";
import { IButton } from "../../types/types";

interface AppFilterProps {
  onSortSelect: (sortName: string) => void;
}
const buttons: IButton[] = [
  { name: "city", label: "По городу" },
  { name: "company", label: "По компании" },
];

const AppFilters: FC<AppFilterProps> = ({ onSortSelect }) => {
  const renderItems = (arr: IButton[]) => {
    return arr.map((item: IButton, index) => {
      const { name, label } = item;
      return (
        <Button
          className="animated"
          onClick={() => onSortSelect(name)}
          variant="primary"
          name={name}
          key={index + 1}
        >
          {label}
        </Button>
      );
    });
  };
  const elements = renderItems(buttons);
  return (
    <div className="side">
      <span>Сортировка</span>
      {elements}
      <Link to="/">
        <img
          className="button__home animated"
          src={goHome}
          alt="Wanna go home?"
        />
      </Link>
    </div>
  );
};
export default AppFilters;
