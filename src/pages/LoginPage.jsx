import Form from '../components/Form';

function LoginPage() {
  return (
    <div>
      <Form
        className='login'
        errorText='Something went wrong, please check your email and password'
        formName='Please login'
      />
    </div>
  );
}

export default LoginPage;
