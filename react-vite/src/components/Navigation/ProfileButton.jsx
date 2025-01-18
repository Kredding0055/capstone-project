import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import { Link } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault(); 
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <FaUserCircle className="profile-button" onClick={toggleMenu} fontSize='50px'/>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>Hello, {user.first_name}</li>
              <li>{user.email}</li>
              <li>Member since {user.member_since}</li>
              <li onClick={closeMenu}>
                <Link to='/newMotorcycle'> - Add Motorcycle</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to='/manageMotorcycle'> - Manage Motorcycles</Link >
              </li>
              <li onClick={closeMenu}>
                <Link to='/favorites'> - Favorited Motorcycles</Link>
              </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              <li>
                <OpenModalButton
                buttonText='Delete Account'
                modalComponent={<DeleteUserModal/>}
                />
              </li>              
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
