/* eslint-disable comma-dangle */
import PropTypes from 'prop-types';

function Container(props) {
  const { children, className } = props;
  Container.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
  };
  return <div className={`container ${className}`}>{children}</div>;
}

export default Container;
