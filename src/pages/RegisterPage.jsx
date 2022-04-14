import Form from '../components/Form';

function RegisterPage() {
  return (
    <Form
      className='register'
      textFirstLine='Please indicate your email'
      textSecondLine='Please indicate your password'
      errorText='Something went wrong, please check your email and password'
      formName='Please register'
    />
  );
}

export default RegisterPage;
