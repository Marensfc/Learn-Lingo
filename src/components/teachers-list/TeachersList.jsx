import css from './TeachersList.module.css';

import TeacherCard from '../teacher-card/TeacherCard';

const TeachersList = ({
  teachers,
  openModal,
  setChosenTeacher,
  addTeacher,
  deleteTeacher,
  checkIsSelected,
}) => {
  return (
    <>
      {teachers.length !== 0 && (
        <ul className={css.teacherList}>
          {teachers.length !== 0 &&
            teachers.map(teacher => {
              return (
                <TeacherCard
                  key={teacher._id}
                  _id={teacher._id}
                  openModalFunction={openModal}
                  setChosenTeacher={setChosenTeacher}
                  addTeacherToFavoriteFunction={addTeacher}
                  deleteTeacherFromFavorite={deleteTeacher}
                  selected={checkIsSelected(teacher._id)}
                  avatar_url={teacher.avatar_url}
                  conditions={teacher.conditions}
                  experience={teacher.experience}
                  languages={teacher.languages}
                  lesson_info={teacher.lesson_info}
                  lessons_done={teacher.lessons_done}
                  levels={teacher.levels}
                  name={teacher.name}
                  surname={teacher.surname}
                  price_per_hour={teacher.price_per_hour}
                  rating={teacher.rating}
                  reviews={teacher.reviews}
                />
              );
            })}
        </ul>
      )}
    </>
  );
};

export default TeachersList;
