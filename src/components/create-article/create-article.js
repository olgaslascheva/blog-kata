import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { createArticle, editArticle } from '../../services/services';
import { getCookie } from '../../redux/user-actions';

import classes from './create-article.module.scss';

const CreateArticle = ({ history, edit, slug }) => {
  const token = getCookie('token');
  const [tags, setTags] = useState([]);
  const currentArticle = useSelector((state) => state.articles.currentArticle);
  let tagId = useRef(100);

  useEffect(() => {
    if (edit) {
      currentArticle.tagList.forEach((tag) => addTag(tag));
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      articleTitle: edit && currentArticle?.title,
      articleDescription: edit && currentArticle?.description,
      articleText: edit && currentArticle?.body,
    },
  });

  const onSubmit = ({ articleTitle, articleDescription, articleText }) => {
    const tagList = tags.map((tag) => tag.label);
    if (edit) {
      editArticle(articleTitle, articleDescription, articleText, slug, token).then(({ article: { slug } }) => {
        history.push(`/articles/${slug}`);
      });
    } else {
      createArticle(articleTitle, articleDescription, articleText, tagList, token).then(({ article: { slug } }) => {
        history.push(`/articles/${slug}`);
      });
    }
  };

  const createTag = (label) => {
    tagId.current += 1;
    return { id: tagId.current, label: label };
  };

  const addTag = (label) => {
    const newItem = createTag(label);
    setTags((tags) => [...tags, newItem]);
  };

  const deleteTag = (id) => {
    setTags((tags) => {
      const idx = tags.findIndex((el) => el.id === id);
      return [...tags.slice(0, idx), ...tags.slice(idx + 1)];
    });
  };

  const isLogin = useSelector((state) => state.user.isLogin);
  if (!isLogin) return <Redirect to="/sign-in" />;

  return (
    <div className={classes['create-article']}>
      <h3 className={classes['create-article__title']}>{edit ? 'Edit article' : 'Create new article'}</h3>
      <form className={classes['create-article__form']} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes['create-article__label']}>
          Title
          <input
            className={classes['create-article__input']}
            {...register('articleTitle', {
              required: 'This field is required.',
            })}
            placeholder="Title"
          />
          <div className="error-form">{errors?.articleTitle?.message}</div>
        </label>
        <label className={classes['create-article__label']}>
          Short description
          <input
            className={classes['create-article__input']}
            {...register('articleDescription', {
              required: 'This field is required.',
            })}
            placeholder="Short description"
          />
          <div className="error-form">{errors?.articleDescription?.message}</div>
        </label>
        <label className={classes['create-article__label']}>
          Text
          <textarea
            className={classes['create-article__input']}
            {...register('articleText', {
              required: 'This field is required.',
            })}
            placeholder="Text"
          ></textarea>
          <div className="error-form">{errors?.articleText?.message}</div>
        </label>
        <div className={classes['tag-list']}>
          <h4 className={classes['create-article__label']}>Tags</h4>
          <TagList tags={tags} addTag={addTag} deleteTag={deleteTag} />
        </div>
        <button className={classes['create-article__submit']} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

const TagList = ({ tags, addTag, deleteTag }) => {
  const [inputValue, setInputValue] = useState('');

  const onAddTag = (e) => {
    e.preventDefault();
    addTag(inputValue);
    setInputValue('');
  };

  const clearInput = (e) => {
    e.preventDefault();
    setInputValue('');
  };

  return (
    <>
      {tags.map(({ id, label }) => {
        return (
          <div key={id} className={classes['tag-list__item']}>
            <div className={classes['tag-list__input']}>{label}</div>
            <button className={classes['tag-list__delete']} onClick={() => deleteTag(id)}>
              Delete
            </button>
          </div>
        );
      })}
      <div className={classes['tag-list__item']}>
        <input
          className={classes['tag-list__input']}
          placeholder="Tag"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button className={classes['tag-list__delete']} onClick={clearInput}>
          Delete
        </button>
        <button className={classes['tag-list__add']} onClick={onAddTag}>
          Add tag
        </button>
      </div>
    </>
  );
};

export default withRouter(CreateArticle);
