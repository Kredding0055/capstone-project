import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav-bar">
      <div>
        <NavLink to="/" className='home-button'></NavLink>
      </div>
      <h1>WeRide</h1>
      <div>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
