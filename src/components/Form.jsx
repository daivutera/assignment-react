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
  // const [newObject, setNewObject] = useState({});
  // const [newObjectAdd, setNewObjectAdd] = useState({});

  // useEffect(() => {
  //   if (title.length && author.length && body.length) {
  //     setFormValid(true);
  //   } else {
  //     setFormValid(false);
  //   }
  // }, [title, author, body]);
  console.log(title, description, email, password);

  async function submitHandlerLogReg(e) {
    e.preventDefault();
    const newDataObj = {
      email,
      password,
    };
    const answerFromBack = await sendFetch('v1/auth/register', newDataObj);
    if (!answerFromBack) {
      console.log('not connected from back');
      return;
    }
    authCtxValue.isLoggedIn = true;
    console.log('connected ');
  }
  async function submitHandlerAdd(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('token===', token);
    const newDataObj = {
      title,
      description,
    };
    await sendFetchToken('v1/content/skills', newDataObj, token);
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
        <ErrorContainer>{textFirstLine}</ErrorContainer>
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
        <ErrorContainer>{textSecondLine}</ErrorContainer>
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
        {className === 'add' && <input type='submit' value='Add' />}
        {className === 'register' && <input type='submit' value='Register' />}
        {className === 'login' && <input type='submit' value='Login' />}
      </form>
      <ErrorContainer>{errorText}</ErrorContainer>
    </Container>
  );
}

export default Form;
