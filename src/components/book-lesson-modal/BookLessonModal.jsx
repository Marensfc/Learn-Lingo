import BaseModal from '../base-modal/BaseModal';
import BookLessonForm from '../book-lesson-form/BookLessonForm';

const BookLessonModal = ({ isOpen, closeModal, teacherInfo }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      styles={{
        content: { maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' },
      }}
    >
      <BookLessonForm teacherInfo={teacherInfo} closeModal={closeModal} />
    </BaseModal>
  );
};

export default BookLessonModal;
