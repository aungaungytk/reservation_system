import DarkModeIcon from '@mui/icons-material/DarkMode';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import AccountMenu from '../avatar/avatar';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
      
        <AccountMenu/>
        <div className="item">
            <DarkModeIcon
              className="icon"
              fontSize='large'
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
        </div>
      </div>
    </div>
  );
};

export default Navbar;