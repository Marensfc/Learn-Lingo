import css from './HomePage.module.css';
import heroImg from '../../assets/students.jpg';

import { Link } from 'react-router-dom';
import { setBodyBgColor } from '../../utils/setBodyBgColor';

const HomePage = () => {
  setBodyBgColor('#ffffff');
  return (
    <>
      <section className={css.hero}>
        <div className={`container ${css.heroContainer}`}>
          <div className={css.heroTextContentWrapper}>
            <h1 className={css.heroTitle}>
              Unlock your potential with the best{' '}
              <span className={css.heroTitleAccent}>language</span> tutors
            </h1>
            <p className={css.heroText}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Link to="/teachers" className={css.heroLink}>
              Get started
            </Link>
          </div>
          <div className={css.heroImgThumb}>
            <img src={heroImg} alt="Students" />
          </div>
        </div>
      </section>
      <section className={css.statisticBar}>
        <div className="container">
          <ul className={css.statisticBarList}>
            <li className={css.statisticBarItem}>
              <p className={css.statisticBarItemNumber}>32,000 +</p>
              <h3 className={css.statisticBarItemTitle}>Experienced tutors</h3>
            </li>
            <li className={css.statisticBarItem}>
              <p className={css.statisticBarItemNumber}>300,000 +</p>
              <h3 className={css.statisticBarItemTitle}>
                5-star tutor reviews
              </h3>
            </li>
            <li className={css.statisticBarItem}>
              <p className={css.statisticBarItemNumber}>120 +</p>
              <h3 className={css.statisticBarItemTitle}>Subjects taught</h3>
            </li>
            <li className={css.statisticBarItem}>
              <p className={css.statisticBarItemNumber}>200 +</p>
              <h3 className={css.statisticBarItemTitle}>Tutor nationalities</h3>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default HomePage;
