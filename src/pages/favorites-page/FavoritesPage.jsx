import css from './FavoritesPage.module.css';

import FiltersForm from '../../components/filters-form/FiltersForm';
import TeachersList from '../../components/teachers-list/TeachersList';
import BookLessonModal from '../../components/book-lesson-modal/BookLessonModal';
import ScreenSaver from '../../components/screen-saver/ScreenSaver';
import Loader from '../../components/loader/Loader';
import ScrollBtn from '../../components/scroll-btn/ScrollBtn';

import { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { setBodyBgColor } from '../../utils/setBodyBgColor';

import { useSelector } from 'react-redux';
import {
  selectLanguage,
  selectLevel,
  selectPricePerHour,
} from '../../redux/filters/selectors';

import { auth } from '../../api/firebaseInit';
import {
  getUserFavoriteTeachers,
  updateFavoriteTeachersInFirebase,
} from '../../api/firebaseFunctions';

import { toast } from 'react-toastify';

const FavoritesPage = () => {
  setBodyBgColor('#f8f8f8');

  const bookLessonModal = useModal();

  const [chosenTeacher, setChosenTeacher] = useState(null);
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filters = {
    language: useSelector(selectLanguage),
    level: useSelector(selectLevel),
    price_per_hour: useSelector(selectPricePerHour),
  };

  const isThereAnyFilter = Object.values(filters).find(
    filter => filter !== 'All'
  );

  useEffect(() => {
    setIsLoading(true);
    const loadFavoriteTeachers = async () => {
      try {
        const response = await getUserFavoriteTeachers(auth.currentUser.uid);
        if (isThereAnyFilter) {
          const filteredTeachers = response
            .filter(
              teacher =>
                (teacher.languages.includes(filters.language) ||
                  filters.language === 'All') &&
                (teacher.levels.includes(filters.level) ||
                  filters.level === 'All') &&
                (teacher.price_per_hour <= filters.price_per_hour ||
                  filters.price_per_hour === 'All')
            )
            .reverse();
          setFavoriteTeachers(filteredTeachers);
          return;
        }
        setFavoriteTeachers(response.reverse());
      } catch (error) {
        toast.error(error.message);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    loadFavoriteTeachers();
  }, [
    filters.language,
    filters.level,
    filters.price_per_hour,
    isThereAnyFilter,
  ]);

  const addTeacherToFavorite = async teacher => {
    const newList = [...favoriteTeachers, teacher];

    await updateFavoriteTeachersInFirebase(auth.currentUser.uid, newList);
    setFavoriteTeachers(newList);
  };

  const deleteTeacherFromFavorite = async id => {
    const newList = favoriteTeachers.filter(teacher => teacher._id !== id);

    if (newList.length === 0) {
      await updateFavoriteTeachersInFirebase(auth.currentUser.uid, ['empty']);
      setFavoriteTeachers(newList);
      return;
    }

    await updateFavoriteTeachersInFirebase(auth.currentUser.uid, newList);
    setFavoriteTeachers(newList);
  };

  return (
    <>
      <section className={css.favorites}>
        <div className="container">
          <FiltersForm />
          <TeachersList
            teachers={favoriteTeachers}
            openModal={bookLessonModal.openModal}
            setChosenTeacher={setChosenTeacher}
            checkIsSelected={() => true}
            showBtn={false}
            isLoading={false}
            addTeacher={addTeacherToFavorite}
            deleteTeacher={deleteTeacherFromFavorite}
          />
          {isLoading && <Loader />}
          {!isLoading && favoriteTeachers.length === 0 && <ScreenSaver />}
        </div>
      </section>
      <ScrollBtn />
      <BookLessonModal
        isOpen={bookLessonModal.isOpen}
        closeModal={bookLessonModal.closeModal}
        teacherInfo={chosenTeacher}
      />
    </>
  );
};

export default FavoritesPage;
