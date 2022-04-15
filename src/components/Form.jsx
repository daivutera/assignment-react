/* eslint-disable quotes */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-undef */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { React, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '../UI/Container';
import ErrorContainer from '../UI/ErrorContainer';
import css from './form.module.css';
import { sendFetch, sendFetchToken } from '../helpers/postFetch';
import AuthContext from '../store/authContext';
// import SubmitContext from './../store/submitContext';

function Form(props) {
  const { formName, className } = props;
  Form.propTypes = {
    formName: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
  };
  const authCtxValue = useContext(AuthContext);
  // const submitCtxValue = useContext(SubmitContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isErrorUi, setIsErrorUi] = useState(false);
  const initErrors = {
    emailMsg: '',
    passwordMsg: '',
    titleMsg: '',
    descriptionMsg: '',
  };
  const initErrorsBack = {};
  const [errorObject, setErrorObject] = useState(initErrors);
  const [errorObjectBack, setErrorObjectBack] = useState(initErrorsBack);
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (className === 'add' && title.length && description.length) {
      setFormValid(true);
      setIsErrorUi(false);
    }
    if (className !== 'add' && email.length && password.length) {
      setFormValid(true);
      setIsErrorUi(false);
    } else {
      console.log('ner visko');
      setFormValid(false);
      setIsErrorUi(true);
    }
  }, [title, description, email, password]);

  async function submitHandlerLogReg(e) {
    setFormValid(true);
    setIsError(false);
    setErrorObject('');
    e.preventDefault();
    const newDataObj = {
      email,
      password,
    };
    if (email.trim() === '') {
      setErrorObject((prevState) => ({
        ...prevState,
        emailMsg: `Please indicate email correctly!`,
      }));
      // setFormValid(false);
      // setIsErrorUI(true);
    }

    if (password.trim() === '') {
      setErrorObject((prevState) => ({
        ...prevState,
        passwordMsg: `Enter your password!`,
      }));
      // setFormValid(false);
    }
    if (!formValid) {
      return;
    }

    const answerFromBack = await sendFetch('v1/auth/register', newDataObj);
    console.log('answerFromBack', answerFromBack);
    if (answerFromBack.err) {
      console.log('not connected from back');
      // setIsError(true);
      setErrorObjectBack(answerFromBack.err);
      return;
    }
    authCtxValue.isLoggedIn = true;
    console.log('connected ');
  }

  async function submitHandlerAdd(e) {
    setIsError(false);
    setErrorObject('');
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('token===', token);
    const newDataObj = {
      title,
      description,
    };
    if (title.trim() === '') {
      setErrorObject((prevState) => ({
        ...prevState,
        titleMsg: `Title can't be blank!`,
      }));
      // setIsErrorUI(true);
      // setFormValid(false);
    }
    if (description.trim() === '') {
      setErrorObject((prevState) => ({
        ...prevState,
        descriptionMsg: `Description can't be blank!`,
      }));
      // setFormValid(false);
    }
    if (!formValid) {
      return;
    }

    const answerFromBack = await sendFetchToken(
      'v1/content/skills',
      newDataObj,
      token
    );
    if (answerFromBack.err) {
      setIsError(true);
      setErrorObjectBack(answerFromBack.err);
      console.log('not connected from back');
      return;
    }
    // authCtxValue.isLoggedIn = true;
    console.log('connected ');
  }

  return (
    <Container className={`${css.form} ${className}`}>
      <h1 className={css.fonth1}>{formName}</h1>
      <form
        onSubmit={(e) => {
          if (className === 'add') {
            submitHandlerAdd(e);
          } else {
            submitHandlerLogReg(e);
          }
        }}>
        {className !== 'add' && isErrorUi && !email.length && (
          <ErrorContainer>{errorObject.emailMsg}</ErrorContainer>
        )}
        {className === 'add' && isErrorUi && !title.length && (
          <ErrorContainer>{errorObject.titleMsg}</ErrorContainer>
        )}
        <input
          onChange={(e) => {
            if (className === 'add') {
              setTitle(e.target.value);
            } else {
              setEmail(e.target.value);
            }
          }}
          // value={className === 'add' ? 'title' : 'email'}
          type='text'
          placeholder={className === 'add' ? 'Title' : 'Email'}
        />
        <br />

        {className !== 'add' && isErrorUi && !password.length && (
          <ErrorContainer>{errorObject.passwordMsg}</ErrorContainer>
        )}
        {className === 'add' && isErrorUi && !description.length && (
          <ErrorContainer>{errorObject.descriptionMsg}</ErrorContainer>
        )}
        <input
          onChange={(e) => {
            if (className === 'add') {
              setDescription(e.target.value);
            } else {
              setPassword(e.target.value);
            }
          }}
          // value={className === 'add' ? 'description' : 'password'}
          className={className === 'add' ? css.addInput : ''}
          type='text'
          placeholder={className === 'add' ? 'Description' : 'Password'}
        />
        <br />
        {className === 'add' && (
          <input
            type='submit'
            disabled={!isErrorUi ? 'disabled' : ''}
            value='Add'
          />
        )}
        {className === 'register' && (
          <input
            type='submit'
            disabled={!isErrorUi ? 'disabled' : ''}
            value='Register'
          />
        )}
        {className === 'login' && (
          <input
            type='submit'
            disabled={!isErrorUi ? 'disabled' : ''}
            value='Login'
          />
        )}
      </form>
      {isError && <ErrorContainer>{errorObjectBack}</ErrorContainer>}
    </Container>
  );
}

export default Form;
