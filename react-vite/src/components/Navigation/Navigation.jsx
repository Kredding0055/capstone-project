import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FaShoppingCart } from "react-icons/fa";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-bar-wrapper">
      <nav className="nav-bar">
        <div>
          <NavLink to="/" className='home-button'></NavLink>
        </div>
        <h1 className="inspiration-font">WeRide</h1>
        <div>
          <NavLink to="/checkout" className="shopping-cart-link">
            <FaShoppingCart className="shopping-cart"/>
          </NavLink>
          <ProfileButton />
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
