import Button from '../../UI/Button';
import Container from '../../UI/Container';
import css from './cardItem.module.css';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <Container className={scss.petsCard}>
      <h1 className={scss.h1css}>{props.title}</h1>
      <div className={scss.body}>
        <h3 className={scss.h3css}>{formatedDate}</h3>
        <h3 className={scss.h3css}>{props.body}</h3>
      </div>
      {/* {!props.listType && (<>
          <Link to={`/logs/${props.id}`}>
            <Button>View Log</Button>
          </Link>
          <Button outline onClick={handleDelete}>
            Delete
          </Button>
        </>)} */}

      {props.listType ? (
        ''
      ) : (
        <>
          <Link to={`/logs/${props.id}`}>
            <Button>View Log</Button>
          </Link>
          <Button outline onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={authCtxValue.logout} outline>
            Logout
          </Button>
        </>
      )}
    </Container>
  );
}

export default CardItem;
