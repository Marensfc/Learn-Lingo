import css from './TeacherCard.module.css';
import icons from '../../assets/icons.svg';

import { useState } from 'react';
import { FaUserLarge } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectLevel } from '../../redux/filters/selectors';
import clsx from 'clsx';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherCard = ({
  _id,
  openModalFunction,
  setChosenTeacher,
  addTeacherToFavoriteFunction,
  deleteTeacherFromFavorite,
  selected,
  avatar_url,
  conditions,
  experience,
  languages,
  lesson_info,
  lessons_done,
  levels,
  name,
  surname,
  price_per_hour,
  rating,
  reviews,
}) => {
  const additionalInfo = {
    experience,
    reviews,
  };

  const teacherAllInfo = {
    _id,
    avatar_url,
    conditions,
    experience,
    languages,
    lesson_info,
    lessons_done,
    levels,
    name,
    surname,
    price_per_hour,
    rating,
    reviews,
  };

  const selectedLevel = useSelector(selectLevel);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [detailedInfo, setDetailedInfo] = useState(null);

  const handleOnClickBookLessonBtn = () => {
    setChosenTeacher({
      fullName: `${name} ${surname}`,
      avatar_url,
    });
    openModalFunction();
  };

  const handleOnClickAddTeacherToFavorite = () => {
    if (!isLoggedIn) {
      toast.info('You must have an account to add/remove from favorites');
      return;
    }

    if (!selected) {
      addTeacherToFavoriteFunction(teacherAllInfo);
    } else {
      deleteTeacherFromFavorite(_id);
    }
  };

  return (
    <li className={css.teacherCard}>
      <div className={css.teacherAvatarThumb}>
        <img src={avatar_url} alt="Teacher's avatar" />
      </div>
      <div className={css.cardContentWrapper}>
        <button
          className={css.cardAddToFavoritesBtn}
          type="button"
          onClick={() => handleOnClickAddTeacherToFavorite()}
        >
          <svg
            width={26}
            height={26}
            className={clsx(selected ? css.selected : css.favoritesIcon)}
          >
            <use href={`${icons}#heart`}></use>
          </svg>
        </button>
        <div className={css.cardInfo_StatisticsWrapper}>
          <p className={css.info_StatisticFieldOfStudy}>Languages</p>
          <div className={css.cardInfoStatistics}>
            <p className={css.info_StatisticsLessonsFormat}>
              <svg width={16} height={16} className={css.bookIcon}>
                <use href={`${icons}#book-open`}></use>
              </svg>
              Lessons online
            </p>
            <p className={css.info_StatisticsLessonsCount}>
              Lessons done: {lessons_done}
            </p>
            <p className={css.info_StatisticsRating}>
              <svg width={16} height={16}>
                <use href={`${icons}#rating-star`}></use>
              </svg>
              Rating: {rating}
            </p>
            <p className={css.info_StatisticsPrice}>
              Price / 1 hour: <span>{price_per_hour}$</span>
            </p>
          </div>
        </div>
        <h3 className={css.cardTeacherName}>{`${name} ${surname}`}</h3>
        <p className={css.cardSpokenLanguages}>
          Speaks: <span>{languages.join(', ')}</span>
        </p>
        <p className={css.cardLessonInfo}>
          Lesson info: <span>{lesson_info}</span>
        </p>
        <p className={css.cardConditions}>
          Conditions: <span>{conditions.join(' ')}</span>
        </p>
        {detailedInfo ? (
          <div className={css.detailedInfoWrapper}>
            <p className={css.teacherExperience}>{detailedInfo.experience}</p>
            <ul className={css.reviewsList}>
              {detailedInfo.reviews.map((review, index) => (
                <li key={index} className={css.reviewItem}>
                  <div className={css.reviewerIconNameRatingWrapper}>
                    <span className={css.reviewIconContainer}>
                      <FaUserLarge className={css.reviewerIcon} />
                    </span>
                    <div className={css.reviewerNameRatingWrapper}>
                      <p className={css.reviewerName}>{review.reviewer_name}</p>
                      <p className={css.reviewerRating}>
                        <svg width={16} height={16}>
                          <use href={`${icons}#rating-star`}></use>
                        </svg>{' '}
                        {review.reviewer_rating}.0
                      </p>
                    </div>
                  </div>
                  <p className={css.reviewerComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <button
            type="button"
            className={css.cardBtnReadMore}
            onClick={() => setDetailedInfo(additionalInfo)}
          >
            Read more
          </button>
        )}
        <ul className={css.cardLevels}>
          {levels.map((level, index) => (
            <li key={index}>
              <p
                className={clsx({
                  [css.cardLevel]: true,
                  [css.selectedLevel]: level === selectedLevel,
                })}
              >
                #{level}
              </p>
            </li>
          ))}
        </ul>
        {detailedInfo !== null && (
          <button
            className={css.bookLessonBtn}
            onClick={() => handleOnClickBookLessonBtn()}
          >
            Book trial lesson
          </button>
        )}
      </div>
    </li>
  );
};

export default TeacherCard;
