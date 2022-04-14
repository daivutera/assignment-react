/* eslint-disable comma-dangle */
import PropTypes from 'prop-types';
import css from './errorContainer.module.css';

function ErrorContainer(props) {
  const { children } = props;
  ErrorContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return <h3 className={css.errContainer}>{children}</h3>;
}

export default ErrorContainer;
