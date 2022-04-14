import { Link } from 'react-router-dom';
function NotLoggedIn() {
  return (
    <>
      <h2>You are not logged in</h2>
      <p>Please log in to see content</p>
      <Link to='/login'>Login</Link>
    </>
  );
}
