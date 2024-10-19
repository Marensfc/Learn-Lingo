import css from './LoginForm.module.css';
import icons from '../../assets/icons.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { signIn } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

const loginSchema = yup.object().shape({
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

const LoginForm = ({ closeModal }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const { ref, ...rest } = register('password');
  const inputPasswordRef = useRef();
  const svgEyeTogglePasswordVisibility = useRef();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async data => {
    setIsLoading(true);
    dispatch(signIn(data))
      .unwrap()
      .then(() => {
        reset();
        closeModal();
        toast.success('Login is successful!');
      })
      .catch(error => {
        toast.error(error);
      })
      .finally(() => setIsLoading(false));
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
      <p className={css.modalTitle}>Log In</p>
      <p className={css.hintText}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.loginForm}>
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
            {...rest}
            ref={e => {
              ref(e);
              inputPasswordRef.current = e;
            }}
            type="password"
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
        <button
          type="sumbit"
          className={css.btnSubmit}
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <ThreeDots
              visible={true}
              height="100%"
              width="60"
              color="#ffffff"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ display: 'block', height: '100%' }}
              wrapperClass={css.btnLoader}
            />
          ) : (
            'Log in'
          )}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
