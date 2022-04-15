import Form from '../components/Form';

function RegisterPage() {
  // async function addItem(e) {
  //   e.preventDefault();
  //   console.log('delete', props.id);
  //   const deleteResult = await deleteFetch('pets', props.id);
  //   console.log('deleteResult ===', deleteResult);
  //   if (deleteResult.changes === 1) {
  //     props.onDelete();
  //   }
  // }

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
