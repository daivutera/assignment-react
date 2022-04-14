/* eslint-disable comma-dangle */
import { Route, useContext } from 'react-router-dom';
import AuthContext from '../store/authContext';
import { NotLoggedIn } from './NotLoggedIn';
import PropTypes from 'prop-types';

function ProtectedRoute({ children, ...rest }) {
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    rest: PropTypes.node.isRequired,
  };
  const authCtx = useContext(AuthContext);
  return (
    <Route {...rest}>
      {authCtx.isUserLoggedIn ? children : <NotLoggedIn />}
    </Route>
  );
}

export default ProtectedRoute;
