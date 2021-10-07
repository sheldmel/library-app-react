import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import SearchIcon from "@mui/icons-material/Search";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState } from "react";
const Searchbar = (props) => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const handleInput = (event) => {
    setSearch(event.target.value);
  };
  const handleClick = (event) => {
    history.push(`/book/${search}`);
    setSearch("");
  };
  return (
    <div>
      <InputGroup style={{ width: "100%" }}>
        <Input
          value={search}
          onChange={handleInput}
          placeholder="Search book by name or author"
        />
        <InputGroupAddon addonType="append">
          <Button onClick={handleClick} disabled={search === ""}>
            <SearchIcon></SearchIcon>
          </Button>
        </InputGroupAddon>
        <UncontrolledDropdown inNavbar style={{ marginLeft: "3%" }}>
          <DropdownToggle caret>Book Genres</DropdownToggle>
          <DropdownMenu right>
            <Link to={"/genre/Fantasy"}>
              <DropdownItem>Fantasy</DropdownItem>
            </Link>
            <Link to={"/genre/Novel"}>
              <DropdownItem>Novel</DropdownItem>
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </InputGroup>
    </div>
  );
};

export default Searchbar;
