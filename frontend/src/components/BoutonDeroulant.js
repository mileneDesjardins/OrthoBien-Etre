import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function BoutonDeroulant({ titre, option1, option2, option3, option4 }) {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={titre}
      style={{ margin: "0px 0px 15px 0px" }}
    >
      <Dropdown.Item href="#/action-1">{option1}</Dropdown.Item>
      <Dropdown.Item href="#/action-2">{option2}</Dropdown.Item>
      <Dropdown.Item href="#/action-3">{option3}</Dropdown.Item>
      <Dropdown.Item href="#/action-4">{option4}</Dropdown.Item>
    </DropdownButton>
  );
}

export default BoutonDeroulant;
