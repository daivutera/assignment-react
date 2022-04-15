/* eslint-disable comma-dangle */
import PropTypes from 'prop-types';
import css from './errorContainer.module.css';

function ErrorContainer(props) {
  const { children, green } = props;
  ErrorContainer.propTypes = {
    children: PropTypes.node.isRequired,
    green: PropTypes.string,
  };
  ErrorContainer.defaultProps = {
    green: '',
  };
  return <h3 className={green ? css.green : css.errContainer}>{children}</h3>;
}

export default ErrorContainer;
