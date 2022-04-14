/* eslint-disable comma-dangle */
import PropTypes from 'prop-types';
import css from './button.module.css';

function Button({ children }) {
  Button.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <button type='button' className={css.btn}>
      {children}
    </button>
  );
}

export default Button;
