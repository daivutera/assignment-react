import PropTypes from 'prop-types';
import css from './grid.module.css';

function Grid({ children }) {
  Grid.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return <div className={css.grid}>{children}</div>;
}

export default Grid;
