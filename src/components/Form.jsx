/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Container from '../UI/Container';
import ErrorContainer from '../UI/ErrorContainer';
import css from './form.module.css';

function Form(props) {
  Form.propTypes = {
    textFirstLine: PropTypes.node.isRequired,
    textSecondLine: PropTypes.node.isRequired,
    errorText: PropTypes.node.isRequired,
    formName: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
  };

  const { textFirstLine, textSecondLine, errorText, formName, className } =
    props;

  return (
    <Container className={`${css.form} ${className}`}>
      <h1 className={css.fonth1}>{formName}</h1>
      <form>
        <ErrorContainer>{textFirstLine}</ErrorContainer>
        <input
          type='text'
          placeholder={className === 'add' ? 'Title' : 'Email'}
        />
        <ErrorContainer>{textSecondLine}</ErrorContainer>
        <input
          className={className === 'add' ? css.addInput : ''}
          type='text'
          placeholder={className === 'add' ? 'Description' : 'Password'}
        />
      </form>
      <ErrorContainer>{errorText}</ErrorContainer>
    </Container>
  );
}

export default Form;
