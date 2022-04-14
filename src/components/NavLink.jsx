import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import AuthContext from '../store/authContext';
import css from './navLink.module.css';

function NavLink() {
  const authCtxValue = useContext(AuthContext);

  return (
    <div className={css.links}>
      <Link className={css.onelink} to='/'>
        Home
      </Link>
      {!authCtxValue.isLoggedIn && (
        <Link className={css.onelink} to='/register'>
          Register
        </Link>
      )}
      {!authCtxValue.isLoggedIn && (
        <Link className={css.onelink} to='/login'>
          Login
        </Link>
      )}
      {authCtxValue.isLoggedIn && (
        <Link className={css.onelink} to='/add'>
          Add
        </Link>
      )}
      {authCtxValue.isLoggedIn && (
        <Button onClick={authCtxValue.logout}>Logout</Button>
      )}
    </div>
  );
}

export default NavLink;
