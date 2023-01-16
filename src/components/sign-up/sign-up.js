import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setCookie, setUserData } from '../../redux/user-actions';
import { registerUser } from '../../services/services';

import classes from './sign-up.module.scss';

const SignUp = ({ history }) => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState(false);

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      acceptCreate: true,
    },
  });

  const onSubmit = ({ userNameCreate, emailCreate, passwordCreate }) => {
    registerUser(userNameCreate, emailCreate, passwordCreate)
      .then(({ user: { email, token, username } }) => {
        setCookie('token', token);
        dispatch(setUserData({ username, email, isLogin: true }));
        history.push('/');
      })
      .catch((error) => {
        if (error === 422) setValidationError(true);
      });
  };

  return (
    <div className={classes['sign-up']}>
      <h3 className={classes['sign-up__title']}>Create new account</h3>
      <form className={classes['sign-up__form']} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          <input
            className={classes['sign-up__input']}
            {...register('userNameCreate', {
              required: 'This field is required.',
              minLength: {
                value: 3,
                message: 'Your username needs to be at least 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your username needs to be ne bolee 20 characters))',
              },
            })}
            placeholder="Username"
          />
          <div className="error-form">{errors?.userNameCreate?.message}</div>
          {validationError ? <div className="error-form">Такой пользователь уже зарегистрирован</div> : null}
        </label>
        <label>
          Email address
          <input
            className={classes['sign-up__input']}
            {...register('emailCreate', {
              required: 'This field is required.',
            })}
            type="email"
            placeholder="Email address"
          />
          <div className="error-form">{errors?.emailCreate?.message}</div>
          {validationError ? <div className="error-form">Такой пользователь уже зарегистрирован</div> : null}
        </label>
        <label>
          Password
          <input
            className={classes['sign-up__input']}
            {...register('passwordCreate', {
              required: 'This field is required.',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to be ne bolee 40 characters))',
              },
            })}
            type="password"
            placeholder="Password"
          />
          <div className="error-form">{errors?.passwordCreate?.message}</div>
        </label>
        <label>
          Repeat password
          <input
            className={classes['sign-up__input']}
            {...register('repeatPasswordCreate', {
              validate: (value) => value === getValues('passwordCreate'),
            })}
            type="password"
            placeholder="Password"
          />
          <div className="error-form">
            {errors?.repeatPasswordCreate && <span className="error-form">Passwords must match</span>}
          </div>
        </label>
        <div className={classes['sign-up__accept']}>
          <label className={classes['sign-up__label-checkbox']}>
            <input
              className={classes['sign-up__checkbox']}
              {...register('acceptCreate', {
                required: 'Postavte galochku please',
              })}
              type="checkbox"
            />
            <span>I agree to the processing of my personal information</span>
          </label>
          <div className="error-form">{errors?.acceptCreate?.message}</div>
        </div>
        <button className={classes['sign-up__submit']} type="submit">
          Create
        </button>
      </form>
      <span className={classes['sign-up__footer']}>
        Don't have an account?{' '}
        <Link to="/sign-in" className={classes['sign-up__link']}>
          Sign In
        </Link>
        .
      </span>
    </div>
  );
};

export default withRouter(SignUp);
