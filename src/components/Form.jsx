/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '../UI/Container';
import ErrorContainer from '../UI/ErrorContainer';
import css from './form.module.css';
import SubmitContext from './../store/submitContext';

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

 const submitCtxValue = useContext(SubmitContext)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newObject, setNewObject] = useState({})
  const [newObjectAdd, setNewObjectAdd] = useState({})

  // useEffect(() => {
  //   if (title.length && author.length && body.length) {
  //     setFormValid(true);
  //   } else {
  //     setFormValid(false);
  //   }
  // }, [title, author, body]);
  console.log(title, description, email, password);

  function submitHandlerRegister(event) {
    event.preventDefault();
    const newPostObj = {
      title: title,
      author: author,
      body: body,
    };
    function submitHandlerLogin(event) {
      event.preventDefault();
      const newAddObj = {
        email: email,
        password: password,
      };
      function submitHandlerAdd(event) {
        event.preventDefault();
        const newPostObj = {
          title: title,
          author: author,
          body: body,
        };
    // console.log('newPostObj ===', newPostObj);

    props.onNewPost(newPostObj);
  }

  return (
    <Container className={`${css.form} ${className}`}>
      <h1 className={css.fonth1}>{formName}</h1>
      <form
        onSubmit={() => {
          submitHandler(e);
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
          value={className === 'add' ? 'title' : 'email'}
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
          value={className === 'add' ? 'description' : 'password'}
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
