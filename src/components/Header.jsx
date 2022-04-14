import Container from '../UI/Container';
import css from './header.module.css';
import NavLink from './NavLink';

function Header() {
  return (
    <header>
      <Container className={css.flex}>
        <div className={css.logo}>
          <img src='logo.webp' alt='smth' />
          <h1 className={css.pageName}>Super experience</h1>
        </div>
        <nav>
          <NavLink />
        </nav>
      </Container>
    </header>
  );
}

export default Header;
