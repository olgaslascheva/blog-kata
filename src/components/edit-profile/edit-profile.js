import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCookie, setUserData } from '../../redux/user-actions';
import { updateUser } from '../../services/services';

import classes from './edit-profile.module.scss';

const EditProfile = ({ history }) => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState(false);
  const username = useSelector((state) => state.user.username);
  const email = useSelector((state) => state.user.email);
  const token = getCookie('token');

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      userNameEdit: username,
      emailEdit: email,
    },
  });

  const onSubmit = ({ userNameEdit, emailEdit, newPassword, imageUrl }) => {
    updateUser(userNameEdit, emailEdit, newPassword, imageUrl, token)
      .then(({ user: { email, username, image } }) => {
        dispatch(setUserData({ username, email, image, isLogin: true }));
        history.push('/');
      })
      .catch((error) => {
        if (error === 422) setValidationError(true);
      });
  };

  return (
    <div className={classes['edit-profile']}>
      <h3 className={classes['edit-profile__title']}>Edit Profile</h3>
      <form className={classes['edit-profile__form']} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          <input
            className={classes['edit-profile__input']}
            {...register('userNameEdit', {
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
          <div className="error-form">{errors?.userNameEdit?.message}</div>
          {validationError ? <div className="error-form">Это имя пользователя занято</div> : null}
        </label>
        <label>
          Email address
          <input
            className={classes['edit-profile__input']}
            {...register('emailEdit', { required: 'This field is required.' })}
            type="email"
            placeholder="Email address"
          />
          <div className="error-form">{errors?.emailEdit?.message}</div>
          {validationError ? <div className="error-form">Email уже зарегистрирован</div> : null}
        </label>
        <label>
          New password
          <input
            className={classes['edit-profile__input']}
            {...register('newPassword', {
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
          <div className="error-form">{errors?.newPassword?.message}</div>
        </label>
        <label>
          Avatar image (url)
          <input
            className={classes['edit-profile__input']}
            {...register('imageUrl', {})}
            type="url"
            placeholder="Avatar image"
          />
        </label>
        <button className={classes['edit-profile__submit']} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default withRouter(EditProfile);
