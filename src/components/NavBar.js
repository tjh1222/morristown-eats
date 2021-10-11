import './NavBar.css';
import logo from "../motownEats.png";

function NavBar() {
  return (
    <nav>
      <ul className="nav">
       
        <li><img src={logo} alt="logo"/></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Sign Up</a></li>
        <li><a href="#">Sign Up</a></li>
      </ul>
      
    </nav>
  );
}

export default NavBar;



