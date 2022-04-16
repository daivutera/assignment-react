import PropTypes from 'prop-types';
import Container from '../../UI/Container';
import css from './cardItem.module.css';

function CardItem(props) {
  const { title, description } = props;
  CardItem.propTypes = {
    title: PropTypes.node.isRequired,
    description: PropTypes.node.isRequired,
  };
  return (
    <Container className={css.flex}>
      <h1 className={css.homeh1}>{title}</h1>
      <h3 className={css.homeh3}>{description}</h3>
    </Container>
  );
}

export default CardItem;
