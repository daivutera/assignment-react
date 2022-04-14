/* eslint-disable comma-dangle */
import PropTypes from 'prop-types';
import { useContext } from 'react';
import css from './button.module.css';
import AuthContext from '../store/authContext';

function Button({ children }) {
  const authCtxValue = useContext(AuthContext);
  Button.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <button type='button' className={css.btn} onClick={authCtxValue.logout}>
      {children}
    </button>
  );
}

export default Button;
