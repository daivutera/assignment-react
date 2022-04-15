/* eslint-disable quotes */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-undef */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { React, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Container from '../UI/Container';
import ErrorContainer from '../UI/ErrorContainer';
import css from './form.module.css';
import { sendFetch, sendFetchToken } from '../helpers/postFetch';
import AuthContext from '../store/authContext';
// import SubmitContext from './../store/submitContext';

function Form(props) {
  const { textFirstLine, textSecondLine, errorText, formName, className } =
    props;
  Form.propTypes = {
    textFirstLine: PropTypes.node.isRequired,
    textSecondLine: PropTypes.node.isRequired,
    errorText: PropTypes.node.isRequired,
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
  const [isErrorUI, setIsErrorUI] = useState(false);
  const initErrors = {
    email,
    password,
    title,
    description,
  };
  const initErrorsBack = {};
  const [errorObject, setErrorObject] = useState(initErrors);
  const [errorObjectBack, setErrorObjectBack] = useState(initErrorsBack);
  const [formValid, setFormValid] = useState(true);

  // useEffect(() => {
  //   if (title.length && author.length && body.length) {
  //     setFormValid(true);
  //   } else {
  //     setFormValid(false);
  //   }
  // }, [title, author, body]);

  // if (!isErrorsEmpty) {
  //   return;
  // }

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
        email: `Email can't be blank`,
      }));
      setFormValid(false);
      setIsErrorUI(true);
    }

    if (password.trim() === '') {
      setErrorObject((prevState) => ({
        ...prevState,
        password: `Password can't be blank`,
      }));
      setFormValid(false);
    }

    const answerFromBack = await sendFetch('v1/auth/register', newDataObj);
    console.log('answerFromBack', answerFromBack);
    if (answerFromBack.err) {
      console.log('not connected from back');
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
        title: `Title can't be blank`,
      }));
      setIsErrorUI(true);
      setFormValid(false);
    }
    if (description.trim() === '') {
      setErrorObject((prevState) => ({
        ...prevState,
        description: `Description can't be blank`,
      }));
      setFormValid(false);
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
        {isErrorUI && (
          <ErrorContainer>
            {textFirstLine}
            {errorObject.title}
          </ErrorContainer>
        )}
        {isErrorUI && (
          <ErrorContainer>
            {textFirstLine}
            {errorObject.email}
          </ErrorContainer>
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
        <ErrorContainer>
          {textSecondLine}
          {errorObject.name}
        </ErrorContainer>
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
            disabled={!formValid ? 'disabled' : ''}
            value='Add'
          />
        )}
        {className === 'register' && (
          <input
            type='submit'
            disabled={!formValid ? 'disabled' : ''}
            value='Register'
          />
        )}
        {className === 'login' && (
          <input
            type='submit'
            disabled={!formValid ? 'disabled' : ''}
            value='Login'
          />
        )}
      </form>
      {isError && (
        <ErrorContainer>
          {errorText}
          {errorObjectBack}
        </ErrorContainer>
      )}
    </Container>
  );
}

export default Form;
