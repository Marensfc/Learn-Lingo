import css from './ScreenSaver.module.css';
import { Link } from 'react-router-dom';

const ScreenSaver = () => {
  return (
    <>
      <p className={css.hintText}>Nothing here yet &#129300;</p>
      <Link className={css.teachersLink} to="/teachers">
        Teachers
      </Link>
    </>
  );
};

export default ScreenSaver;
