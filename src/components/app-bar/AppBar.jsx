import css from './AppBar.module.css';
import icons from '../../assets/icons.svg';
import AuthMenu from '../auth-menu/AuthMenu';
import UserMenu from '../user-menu/UserMenu';
import Navigation from '../navigation/Navigation';
import MobMenu from '../mob-menu/MobMenu';
import LoginModal from '../login-modal/LoginModal';
import RegisterModal from '../register-modal/RegisterModal';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useModal } from '../../hooks/useModal';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loginModal = useModal();
  const registerModal = useModal();

  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <a href="/" className={css.logoLink}>
          <svg width="28" height="28">
            <use href={`${icons}#ukraine-logo`}></use>
          </svg>
          Learn Lingo
        </a>
        <MobMenu
          openLoginModal={loginModal.openModal}
          openRegisterModal={registerModal.openModal}
        />
        <Navigation isLoggedIn={isLoggedIn} />
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <AuthMenu
            openLoginModal={loginModal.openModal}
            openRegisterModal={registerModal.openModal}
          />
        )}
        <LoginModal
          isOpen={loginModal.isOpen}
          closeModal={loginModal.closeModal}
        />
        <RegisterModal
          isOpen={registerModal.isOpen}
          closeModal={registerModal.closeModal}
        />
      </div>
    </header>
  );
};

export default AppBar;
