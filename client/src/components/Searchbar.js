import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import SearchIcon from '@mui/icons-material/Search'
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
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Searchbar = (props) => {
    return (
      <div >
        <InputGroup style= {{width: '80%'}} >
          <Input placeholder="Search book by name" />
          <InputGroupAddon addonType="append">
            <Button><SearchIcon></SearchIcon></Button>
          </InputGroupAddon>
          <UncontrolledDropdown inNavbar style= {{marginLeft: '3%'}}>
              <DropdownToggle caret>
                Book Genres
              </DropdownToggle>
              <DropdownMenu right>
                <Link
                  to={'/genre/Fantasy'}
                >
                <DropdownItem>
                  Fantasy
                </DropdownItem>
                </Link>
                <Link
                  to={'/genre/Novel'}
                >
                <DropdownItem>
                  Novel
                </DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </InputGroup>
      </div>
    )
}

export default Searchbar;