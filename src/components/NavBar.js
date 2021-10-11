import './NavBar.css';
import logo from "../motownEats.png";
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul className="nav">
       
        <li><img src={logo} alt="logo"/></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      
    </nav>
  );
}

export default NavBar;



