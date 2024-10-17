import FiltersForm from '../../components/filters-form/FiltersForm';
import TeachersList from '../../components/teachers-list/TeachersList';
import BookLessonModal from '../../components/book-lesson-modal/BookLessonModal';
import Loader from '../../components/loader/Loader';
import LoadMoreBtn from '../../components/load-more-btn/LoadMoreBtn';

import { useRef, useState, useEffect } from 'react';
import { useModal } from '../../hooks/useModal';
import { calculatePaginationParams } from '../../utils/calculatePaginationParams';
import { setBodyBgColor } from '../../utils/setBodyBgColor';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTeachers,
  fetchFilteredTeachers,
} from '../../redux/teachers/operations';
import {
  selectTeachers,
  selectIsLoading,
} from '../../redux/teachers/selectors';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from '../../redux/auth/selectors';
import {
  selectLanguage,
  selectLevel,
  selectPricePerHour,
} from '../../redux/filters/selectors';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../api/firebaseInit';
import {
  getUserFavoriteTeachers,
  updateFavoriteTeachersInFirebase,
} from '../../api/firebaseFunctions';

const TeacherPage = () => {
  setBodyBgColor('#f8f8f8');

  const dispatch = useDispatch();
  const bookLessonModal = useModal();
  const [chosenTeacher, setChosenTeacher] = useState(null);

  const teachers = {
    items: useSelector(selectTeachers) || [],
    isLoading: useSelector(selectIsLoading),
  };

  const authRedux = {
    isLoggedIn: useSelector(selectIsLoggedIn),
    isRefreshing: useSelector(selectIsRefreshing),
  };

  const filters = {
    language: useSelector(selectLanguage),
    level: useSelector(selectLevel),
    price_per_hour: useSelector(selectPricePerHour),
  };

  const [showBtn, setShowBtn] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 4;
  const totalPages = useRef();

  useEffect(() => {
    console.log('useEffect works');

    const load = async (fetchDataFunction = fetchTeachers) => {
      setShowBtn(false);
      try {
        if (page === 1) {
          const data = await dispatch(
            fetchDataFunction(calculatePaginationParams(perPage, page, filters))
          ).unwrap();

          if (data.items.length === 0) {
            toast.info(
              'Sorry, there are no records matching your search query. Please try again!'
            );
            return;
          }
          if (data.items.length < perPage || data.totalPages === 0) {
            toast.info(
              'Sorry, but you have reached the end of the search results'
            );
            return;
          }
          totalPages.current = data.totalPages;
          setShowBtn(true);
          return;
        }
        if (page > 1) {
          const data = await dispatch(
            fetchDataFunction(calculatePaginationParams(perPage, page, filters))
          ).unwrap();

          totalPages.current -= 1;
          if (totalPages.current === 0) {
            toast.info(
              'Sorry, but you have reached the end of the search results'
            );
            return;
          }
          setShowBtn(true);
          return;
        }
      } catch (error) {
        console.log(error);

        toast.error(error.message);
        setShowBtn(false);
      }
    };

    const isThereAnyFilter = Object.values(filters).find(
      filter => filter !== 'All'
    );

    if (isThereAnyFilter) {
      load(fetchFilteredTeachers);
      return;
    }

    load(fetchTeachers);
  }, [page, filters.language, filters.level, filters.price_per_hour, dispatch]);

  const [favoriteTeachers, setFavoriteTeachers] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const response = await getUserFavoriteTeachers(auth.currentUser.uid);
        setFavoriteTeachers(response);
      }
    });

    return () => unsubscribe();
  }, [authRedux.isLoggedIn, authRedux.isRefreshing]);

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

  const checkIsSelected = id => {
    if (authRedux.isLoggedIn) {
      return Boolean(favoriteTeachers.find(teacher => teacher._id === id));
    } else return false;
  };

  return (
    <>
      <section style={{ paddingTop: '10px' }}>
        <div className="container">
          <FiltersForm setPageToFirst={() => setPage(1)} />
          <TeachersList
            teachers={teachers.items}
            openModal={bookLessonModal.openModal}
            setChosenTeacher={setChosenTeacher}
            addTeacher={addTeacherToFavorite}
            deleteTeacher={deleteTeacherFromFavorite}
            checkIsSelected={checkIsSelected}
            toast={toast}
          />
          {teachers.isLoading && <Loader />}
          {showBtn && (
            <LoadMoreBtn increasePageFunction={() => setPage(page + 1)} />
          )}
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

export default TeacherPage;
