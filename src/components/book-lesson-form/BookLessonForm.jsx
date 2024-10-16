import css from './BookLessonForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { useId } from 'react';
import 'yup-phone-lite';

const bookLessonSchema = yup.object().shape({
  reason: yup.string().required('You should choose something from the list'),
  fullName: yup
    .string('Name should be a string')
    .required('Name is a required field')
    .trim()
    .min(4, 'Full name should have at least 4 characters')
    .max(40, 'Name should have at most 18 characters')
    .test(
      'isFullName',
      'Full name should contain name and surname',
      function (fullName) {
        const isFullName = fullName.split(' ').length === 2;
        return isFullName;
      }
    ),
  email: yup
    .string('Email should be a string')
    .required('Email is a required field')
    .email('Email should be valid')
    .test('isValidAfterSign', 'Invalid email', function (email) {
      const strAfterEmailSign = email.slice(email.indexOf('@'));
      return (
        !strAfterEmailSign.includes('@') || strAfterEmailSign.includes('.')
      );
    }),
  phoneNumber: yup
    .string()
    .trim()
    .phone('UA', 'Invalid phone number')
    .required('Phone number is a required field'),
});

const BookLessonForm = ({ teacherInfo, closeModal }) => {
  const radioButton1 = useId();
  const radioButton2 = useId();
  const radioButton3 = useId();
  const radioButton4 = useId();
  const radioButton5 = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(bookLessonSchema),
    mode: 'onChange',
    defaultValues: { reason: '', fullName: '', email: '', phoneNumber: '' },
  });

  const onSubmit = data => {
    reset();
    closeModal();
  };

  return (
    <>
      <p className={css.modalTitle}>Book trial lesson</p>
      <p className={css.modalSupportText}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={css.teacherInfo}>
        <div className={css.teacherAvatarThumb}>
          <img src={teacherInfo.avatar_url} alt="Teacher's avatar" />
        </div>
        <div className={css.teacherTextHintTextName}>
          <p className={css.teacherTextHint}>Your Teacher</p>
          <p className={css.teacherName}>{teacherInfo.fullName}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.bookLessonForm}>
        <p className={css.textQuestion}>
          What is your main reason for learning English?
        </p>
        <div
          className={clsx({
            [css.radioButtonsWrapper]: true,
            [css.radioButtonsWrapperWithError]: errors.reason,
          })}
        >
          <div className={css.radioButtonWrapper}>
            <input
              id={radioButton1}
              {...register('reason')}
              type="radio"
              value="career and business"
              name="reason"
              className={`visually-hidden ${css.radioButton}`}
            />
            <label
              htmlFor={radioButton1}
              className={css.labelWrapperCustomRadioBtn}
            >
              <span className={css.customRadioBtn}></span>Career and business
            </label>
          </div>
          <div className={css.radioButtonWrapper}>
            <input
              id={radioButton2}
              {...register('reason')}
              type="radio"
              name="reason"
              value="lesson for kids"
              className={`visually-hidden ${css.radioButton}`}
            />
            <label
              htmlFor={radioButton2}
              className={css.labelWrapperCustomRadioBtn}
            >
              <span className={css.customRadioBtn}></span>Lesson for kids
            </label>
          </div>
          <div className={css.radioButtonWrapper}>
            <input
              id={radioButton3}
              {...register('reason')}
              type="radio"
              name="reason"
              value="living abroad"
              className={`visually-hidden ${css.radioButton}`}
            />
            <label
              htmlFor={radioButton3}
              className={css.labelWrapperCustomRadioBtn}
            >
              <span className={css.customRadioBtn}></span>Living abroad
            </label>
          </div>
          <div className={css.radioButtonWrapper}>
            <input
              id={radioButton4}
              {...register('reason')}
              type="radio"
              name="reason"
              value="exams and coursework"
              className={`visually-hidden ${css.radioButton}`}
            />
            <label
              htmlFor={radioButton4}
              className={css.labelWrapperCustomRadioBtn}
            >
              <span className={css.customRadioBtn}></span>Exams and coursework
            </label>
          </div>
          <div className={css.radioButtonWrapper}>
            <input
              id={radioButton5}
              {...register('reason')}
              type="radio"
              name="reason"
              value="culture, travel or hobby"
              className={`visually-hidden ${css.radioButton}`}
            />
            <label
              htmlFor={radioButton5}
              className={css.labelWrapperCustomRadioBtn}
            >
              <span className={css.customRadioBtn}></span>Culture, travel or
              hobby
            </label>
          </div>
        </div>
        {errors.reason && (
          <span className={css.errorMessage}>{errors.reason.message}</span>
        )}
        <input
          type="text"
          {...register('fullName')}
          className={clsx({
            [css.fullNameInput]: true,
            [css.fullNameInputHasError]: errors.fullName,
          })}
          placeholder="Full Name"
        />
        {errors.fullName && (
          <span className={css.errorMessage}>{errors.fullName.message}</span>
        )}
        <input
          type="email"
          {...register('email')}
          className={clsx({
            [css.emailInput]: true,
            [css.emailInputHasError]: errors.email,
          })}
          placeholder="Email"
        />
        {errors.email && (
          <span className={css.errorMessage}>{errors.email.message}</span>
        )}
        <input
          type="tel"
          {...register('phoneNumber')}
          className={clsx({
            [css.telephoneInput]: true,
            [css.telephoneInputHasError]: errors.phoneNumber,
          })}
          placeholder="Phone number"
        />
        {errors.phoneNumber && (
          <span className={css.errorMessage}>{errors.phoneNumber.message}</span>
        )}
        <button type="submit" className={css.btnSubmit}>
          Book
        </button>
      </form>
    </>
  );
};

export default BookLessonForm;
