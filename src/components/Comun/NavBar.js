import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-menu">
      {/* <div className="nav-menu--opacity"></div> */}
      <div className="logo">Swipoo</div>
      <div className="nav-menu-link-container">
        <NavLink to={"/search"} dataCy="searchNavBar">
          <div
          >
            Coches
          </div>
        </NavLink>
        <NavLink to={"/"} dataCy="uploadNavBar">
          <div
            className=""
            
          >
            Registro
          </div>
        </NavLink>
      </div>
    </nav>
  );
};
export default NavBar;
