import "./appSorters.scss";
import { Button } from "react-bootstrap";
import goHome from "../../img/home-button.png";
import { Link } from "react-router-dom";
import { FC, ReactNode } from "react";
import { IButton } from "../../types/types";
import { Col } from "react-bootstrap";
interface AppSorterProps {
  onSortSelect: (sortName: string) => void;
}
const buttons: IButton[] = [
  { name: "address.city", label: "По городу" },
  { name: "company.name", label: "По компании" },
];

const AppSorters: FC<AppSorterProps> = ({ onSortSelect }) => {
  const renderItems = (arr: IButton[]) => {
    return arr.map((item: IButton, index): ReactNode => {
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
  const elements: ReactNode = renderItems(buttons);
  return (
    <Col sm={4} md={2} lg={2}>
      <div className="side__panel">
        <span>Сортировка</span>
        {elements}
        <Link to="/">
          <img
            className="button__home animated"
            src={goHome}
            alt="Want to go to the main page?"
          />
        </Link>
      </div>
    </Col>
  );
};
export default AppSorters;
