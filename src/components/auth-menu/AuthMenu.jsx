import css from './AuthMenu.module.css';
import icons from '../../assets/icons.svg';

const AuthMenu = ({ openLoginModal, openRegisterModal }) => {
  return (
    <div className={css.headerAuthButtons}>
      <button
        type="button"
        className={css.loginButton}
        onClick={() => openLoginModal()}
      >
        <svg width="20" height="20">
          <use href={`${icons}#log-in`}></use>
        </svg>{' '}
        Log in
      </button>
      <button
        type="button"
        className={css.registrationButton}
        onClick={() => openRegisterModal()}
      >
        Registration
      </button>
    </div>
  );
};

export default AuthMenu;
