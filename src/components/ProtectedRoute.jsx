/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable comma-dangle */
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import AuthContext from '../store/authContext';
import NotLoggedIn from './NotLoggedIn';

function ProtectedRoute({ children, ...rest }) {
  console.log('rest', rest);
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    rest: PropTypes.node.isRequired,
  };
  const authCtx = useContext(AuthContext);
  return (
    <Route {...rest}>{authCtx.isLoggedIn ? children : <NotLoggedIn />}</Route>
  );
}

export default ProtectedRoute;
