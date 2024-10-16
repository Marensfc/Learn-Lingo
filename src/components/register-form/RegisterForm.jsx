import css from './RegisterForm.module.css';
import icons from '../../assets/icons.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/auth/operations';
import { useRef } from 'react';

const registerSchema = yup.object().shape({
  name: yup
    .string('Name should be a string')
    .required('Name is a required field')
    .trim()
    .min(2, 'Name should have at least 2 characters')
    .max(18, 'Name should have at most 18 characters'),
  email: yup
    .string('Email should be a string')
    .required('Email is a required field')
    .email('Email should be valid')
    .test('isValidAfterSign', function (email) {
      const strAfterEmailSign = email.slice(email.indexOf('@'));
      return (
        !strAfterEmailSign.includes('@') || strAfterEmailSign.includes('.')
      );
    }),
  password: yup
    .string('Password should be a string')
    .required('Password is a required field')
    .trim()
    .min(6, 'Password should have at least 6 characters')
    .max(28, 'Password should have at most 28 characters'),
});

const RegisterForm = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '' },
  });

  const { ref, ...rest } = register('password');
  const inputPasswordRef = useRef();
  const svgEyeTogglePasswordVisibility = useRef();

  const dispatch = useDispatch();
  const onSubmit = async data => {
    try {
      dispatch(signUp(data)).unwrap();
      closeModal();
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnClickTogglePasswordVisibility = () => {
    const inputType = inputPasswordRef.current.type;

    if (inputType === 'password') {
      inputPasswordRef.current.type = 'text';
      svgEyeTogglePasswordVisibility.current.firstElementChild.href.baseVal = `${icons}#icon-eye-on`;
    } else if (inputType === 'text') {
      inputPasswordRef.current.type = 'password';
      svgEyeTogglePasswordVisibility.current.firstElementChild.href.baseVal = `${icons}#icon-eye-off`;
    }
  };

  return (
    <>
      <p className={css.registerModalTitle}>Registration</p>
      <p className={css.registerModalSupportText}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.registerForm}>
        <input
          type="text"
          {...register('name')}
          className={clsx({
            [css.nameInput]: true,
            [css.nameInputHasError]: errors.name,
          })}
          placeholder="Name"
        />
        {errors.name && (
          <span className={css.nameErrorMessage}>{errors.name.message}</span>
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
          <span className={css.emailErrorMessage}>{errors.email.message}</span>
        )}
        <div
          className={clsx({
            [css.passwordInputWrapper]: true,
            [css.passwordInputWrapperWithError]: errors.password,
          })}
        >
          <input
            type="password"
            {...rest}
            ref={e => {
              ref(e);
              inputPasswordRef.current = e;
            }}
            className={clsx({
              [css.passwordInput]: true,
              [css.passwordInputHasError]: errors.password,
            })}
            placeholder="Password"
          />
          <button
            type="button"
            className={css.togglePwdVisibilityBtn}
            onClick={handleOnClickTogglePasswordVisibility}
          >
            <svg
              width={20}
              height={20}
              className={css.eyeIcon}
              ref={svgEyeTogglePasswordVisibility}
            >
              <use href={`${icons}#icon-eye-off`}></use>
            </svg>
          </button>
        </div>
        {errors.password && (
          <span className={css.passwordErrorMessage}>
            {errors.password.message}
          </span>
        )}
        <button type="submit" className={css.btnSubmit}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
