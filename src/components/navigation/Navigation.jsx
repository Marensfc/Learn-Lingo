import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const createClassForNavLink = isActive => {
  return isActive ? `${css.headerNavLink} ${css.active}` : css.headerNavLink;
};

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className={css.headerNav}>
      <ul className={css.headerNavList}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => createClassForNavLink(isActive)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/teachers"
            className={({ isActive }) => createClassForNavLink(isActive)}
          >
            Teachers
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) => createClassForNavLink(isActive)}
            >
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
