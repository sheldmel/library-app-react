import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import SearchIcon from "@mui/icons-material/Search";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

const Searchbar = (props) => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const handleInput = (event) => {
    setSearch(event.target.value);
  };
  const handleClick = () => {
    history.push(`/book/${search}`);
    setSearch("");
  };
  const handleDropdownClick = (genre) => {
    history.push(`/genre/${genre}`);
    setSearch("");
  };
  return (
    <div>
      <InputGroup style={{ width: "100%" }}>
        <Input
          style={{boxShadow: 'none', border: '0.1px ridge'}}
          shadow-none
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
              <DropdownItem onClick={()=>handleDropdownClick('Fantasy')}>Fantasy</DropdownItem>
              <DropdownItem onClick={()=>handleDropdownClick('Novel')}>Novel</DropdownItem>
              <DropdownItem onClick={()=>handleDropdownClick('Fiction')}>Fiction</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </InputGroup>
    </div>
  );
};

export default Searchbar;
