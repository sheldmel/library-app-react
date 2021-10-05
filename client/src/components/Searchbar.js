import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import SearchIcon from '@mui/icons-material/Search'

const Searchbar = (props) => {
    return (
        <InputGroup >
          <Input placeholder="Search book by name" />
          <InputGroupAddon addonType="append">
            <Button><SearchIcon></SearchIcon></Button>
          </InputGroupAddon>
        </InputGroup>
    )
}

export default Searchbar;