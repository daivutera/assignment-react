import Form from '../components/Form';

function AddPage() {
  return (
    <div>
      <Form
        className='add'
        errorText='Something went wrong, please check if all fields are filled in'
        formName='Add new item'
      />
    </div>
  );
}

export default AddPage;
