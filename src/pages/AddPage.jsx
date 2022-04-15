import Form from '../components/Form';

function AddPage() {
  return (
    <div>
      {' '}
      <Form
        className='add'
        textFirstLine='Please indicate title'
        textSecondLine='Please write a description'
        errorText='Something went wrong, please check if all fields are filled in'
        formName='Add new item'
      />
    </div>
  );
}

export default AddPage;
