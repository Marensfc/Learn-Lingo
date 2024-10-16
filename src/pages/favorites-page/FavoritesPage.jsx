import css from './FavoritesPage.module.css';

import FiltersForm from '../../components/filters-form/FiltersForm';
import TeachersList from '../../components/teachers-list/TeachersList';
import BookLessonModal from '../../components/book-lesson-modal/BookLessonModal';
import ScreenSaver from '../../components/screen-saver/ScreenSaver';
import Loader from '../../components/loader/Loader';

import { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { setBodyBgColor } from '../../utils/setBodyBgColor';

import { auth } from '../../api/firebaseInit';
import {
  getUserFavoriteTeachers,
  updateFavoriteTeachersInFirebase,
} from '../../api/firebaseFunctions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FavoritesPage = () => {
  setBodyBgColor('#f8f8f8');

  const bookLessonModal = useModal();

  const [chosenTeacher, setChosenTeacher] = useState(null);
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const loadFavoriteTeachers = async () => {
      try {
        const response = await getUserFavoriteTeachers(auth.currentUser.uid);
        setFavoriteTeachers(response);
      } catch (error) {
        toast.error(error.message);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    loadFavoriteTeachers();
  }, []);

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
      <BookLessonModal
        isOpen={bookLessonModal.isOpen}
        closeModal={bookLessonModal.closeModal}
        teacherInfo={chosenTeacher}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
      />
    </>
  );
};

export default FavoritesPage;
