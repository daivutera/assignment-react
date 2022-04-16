/* eslint-disable no-else-return */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable object-curly-newline */
import { React, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Container from '../UI/Container';
import ErrorContainer from '../UI/ErrorContainer';
import css from './form.module.css';
import { postFetchToken, sendFetch } from '../helpers/postFetch';
import AuthContext from '../store/authContext';

function Form(props) {
  const { formName, className } = props;
  Form.propTypes = {
    formName: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
  };
  const authCtxValue = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isErrorUi, setIsErrorUi] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const initErrors = {
    emailMsg: '',
    passwordMsg: '',
    titleMsg: '',
    descriptionMsg: '',
  };
  const initErrorsBack = {};
  const [errorObject, setErrorObject] = useState(initErrors);
  const [respObjectBack, setRespObjectBack] = useState(initErrorsBack);
  const [formValid, setFormValid] = useState(true);
  const history = useHistory();

  useEffect(() => {
    console.log('className', className);
    if (className === 'add' && title.length && description.length) {
      setFormValid(true);
      setIsErrorUi(false);
      console.log('formIsValidadd', formValid);
      return;
    } else if (
      className === 'register' ||
      (className === 'login' && email.length && password.length)
    ) {
      setFormValid(true);
      setIsErrorUi(false);
      console.log('formvalidreglog', formValid);
      return;
    } else {
      setFormValid(false);
      setIsErrorUi(true);
      console.log('formvalidelse', formValid);
    }
    console.log('formvalid', formValid);
  }, [title, description, email, password]);

  async function submitHandlerLogReg(e) {
    const logUrlEnd = '/v1/auth/login';
    const regUrlEnd = '/v1/auth/register';
    let urlForFetch = '';
    if (className === 'login') {
      urlForFetch = logUrlEnd;
    }
    if (className === 'register') {
      urlForFetch = regUrlEnd;
    }
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
        emailMsg: 'Please indicate email correctly!',
      }));
    }

    if (password.trim() === '') {
      setErrorObject((prevState) => ({
        ...prevState,
        passwordMsg: 'Enter your password!',
      }));
    }
    if (formValid) {
      const answerFromBack = await sendFetch(urlForFetch, newDataObj);
      if (!answerFromBack) {
        setRespObjectBack('Problems with fetching data');
        return;
      }
      if (answerFromBack.err) {
        console.log('not connected from back');
        setIsError(true);
        setRespObjectBack(answerFromBack.err);
        return;
      }
      if (className === 'login') {
        localStorage.setItem('token', answerFromBack.token);
      }
      setRespObjectBack('Success!');
      setSuccessMsg(true);
      if (className === 'login') {
        authCtxValue.login();
        console.log(authCtxValue.isLoggedIn);
        history.push('/home');
      }
      setEmail('');
      setPassword('');
    }
  }

  async function submitHandlerAdd(e) {
    const urlEnd = '/v1/content/skills';
    setIsError(false);
    setErrorObject('');
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('tokenFromAddHandler===', token);
    const newDataObj = {
      title,
      description,
    };
    console.log('newDataObj===', newDataObj);
    if (title.trim() === '') {
      setErrorObject((prevState) => ({
        ...prevState,
        titleMsg: 'Fill in title!',
      }));
    }
    if (description.trim() === '') {
      setErrorObject((prevState) => ({
        ...prevState,
        descriptionMsg: 'Write some description!',
      }));
    }
    console.log('formValid', formValid);
    if (formValid) {
      const answerFromBack = await postFetchToken(urlEnd, newDataObj, token);
      console.log('answerFromBack===', answerFromBack);
      if (!answerFromBack) {
        setRespObjectBack('Problems with fetching data');
        return;
      }
      if (answerFromBack.err) {
        setIsError(true);
        setRespObjectBack(answerFromBack.err);
        console.log('not connected from back');
        return;
      }
      setRespObjectBack(answerFromBack.msg);
      setSuccessMsg(true);
      setTitle('');
      setDescription('');
    }
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
          value={className === 'add' ? title : email}
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
          value={className === 'add' ? description : password}
          className={className === 'add' ? css.addInput : ''}
          type='text'
          placeholder={className === 'add' ? 'Description' : 'Password'}
        />
        <br />
        {className === 'add' && (
          <input
            type='submit'
            // disabled={isErrorUi ? 'disabled' : ''}
            value='Add'
          />
        )}
        {className === 'register' && (
          <input
            type='submit'
            // disabled={formValid ? 'disabled' : ''}
            value='Register'
          />
        )}
        {className === 'login' && (
          <input
            type='submit'
            // disabled={isErrorUi ? 'disabled' : ''}
            value='Login'
          />
        )}
      </form>
      {isError && <ErrorContainer>{respObjectBack}</ErrorContainer>}
      {successMsg && (
        <ErrorContainer green='true'>{respObjectBack}</ErrorContainer>
      )}
    </Container>
  );
}

export default Form;
