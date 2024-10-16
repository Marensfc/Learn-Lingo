import css from './MobMenu.module.css';
import icons from '../../assets/icons.svg';

import { useRef } from 'react';
import { FiMenu } from 'react-icons/fi';
import { FaCircleUser } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectUserName } from '../../redux/auth/selectors';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/auth/operations';

const MobMenu = ({ openLoginModal, openRegisterModal }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const mobMenuContentRef = useRef();

  const toggleOpenMobMenu = e => {
    if (e.target.nodeName === 'UL') return;
    mobMenuContentRef.current.classList.toggle(css.active);
    const isActive = mobMenuContentRef.current.classList.contains(css.active);

    if (isActive) {
      document.querySelector('body').style.setProperty('overflow', 'hidden');
    }
    if (!isActive) {
      document.querySelector('body').style.removeProperty('overflow');
    }
  };

  return (
    <>
      <button
        type="button"
        className={css.mobMenuBtn}
        onClick={toggleOpenMobMenu}
      >
        <FiMenu className={css.mobMenuIcon} />
      </button>
      <div className={css.mobMenuContentWrapper} ref={mobMenuContentRef}>
        <button
          type="button"
          className={css.closeModalBtn}
          onClick={toggleOpenMobMenu}
        >
          <svg width={32} height={32} className={css.closeModalIcon}>
            <use href={`${icons}#close-modal`}></use>
          </svg>
        </button>
        {isLoggedIn && (
          <div className={css.mobMenuUserMenuWrapper}>
            <div className={css.userInfoWrapper}>
              <FaCircleUser className={css.userIcon} />
              <p className={css.userName}>{userName}</p>
            </div>
            <button
              type="button"
              className={css.logoutBtn}
              onClick={() => {
                dispatch(logout());
                mobMenuContentRef.current.classList.remove(css.active);
                document.querySelector('body').style.removeProperty('overflow');
              }}
            >
              Logout
            </button>
          </div>
        )}
        <nav>
          <ul className={css.mobMenuLinksList} onClick={toggleOpenMobMenu}>
            <li>
              <Link className={css.mobMenuLink} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={css.mobMenuLink} to="/teachers">
                Teachers
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link className={css.mobMenuLink} to="/favorites">
                  Favorites
                </Link>
              </li>
            )}
          </ul>
        </nav>
        {!isLoggedIn && (
          <div className={css.mobMenuAuthButtonsWrapper}>
            <button
              type="button"
              className={css.loginButton}
              onClick={() => {
                mobMenuContentRef.current.classList.remove(css.active);
                openLoginModal();
                document.querySelector('body').style.removeProperty('overflow');
              }}
            >
              <svg width="20" height="20">
                <use href={`${icons}#log-in`}></use>
              </svg>{' '}
              Log in
            </button>
            <button
              type="button"
              className={css.registrationButton}
              onClick={() => {
                mobMenuContentRef.current.classList.remove(css.active);
                openRegisterModal();
                document.querySelector('body').style.removeProperty('overflow');
              }}
            >
              Registration
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MobMenu;
