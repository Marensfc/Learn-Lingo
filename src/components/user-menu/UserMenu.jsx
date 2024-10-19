import css from './UserMenu.module.css';
import { FaCircleUser } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/auth/selectors';
import { toast } from 'react-toastify';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  return (
    <div className={css.userMenuWrapper}>
      <div className={css.userInfoWrapper}>
        <FaCircleUser className={css.userIcon} />
        <p className={css.userName}>{userName}</p>
      </div>
      <button
        type="button"
        className={css.logoutBtn}
        onClick={() => {
          dispatch(logout());
          toast.success('Logout is successful!');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
