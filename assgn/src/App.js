import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  title: Yup.string().min(2,"Too short!").max(10,"Too long!").required("Required!"),
  desc: Yup.string().min(10,"Too short!").max(40,"Too long"),
  assignee: Yup.string().max(20,"Too long!").required("Required!"),
  dueDate: Yup.date().required("Required!").nullable(),
})

function App() {
  return (
    <div className="App">
      <h3 className='text-3xl font-bold block w-fit m-auto'>Formik Form</h3>
      <Formik
        initialValues={{
          title: "",
          desc: "",
          assignee: "",
          dueDate: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          alert(JSON.stringify(values))
        }}
      >
        {({errors, touched})=>(
          <Form className='max-w-sm mx-auto'>
          <label htmlFor='title' className='mt-2.5 block mb-2 text-sm font-medium text-gray-900'>Title</label>
          <Field id="title" name="title" placeholder="Enter task title" className= "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></Field>
          {errors.title && touched.title ? <div className='mt-2 text-sm text-red-500'>{errors.title}</div> : null}
          <label htmlFor='desc' className='mt-2.5 block mb-2 text-sm font-medium text-gray-900'>Description</label>
          <Field id="desc" name="desc" placeholder="Enter task description" className= "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></Field>
          {errors.desc && touched.desc ? <div className='mt-2 text-sm text-red-500'>{errors.desc}</div> : null}
          <label htmlFor='assignee' className='mt-2.5 block mb-2 text-sm font-medium text-gray-900'>Assignee</label>
          <Field id="assignee" name="assignee" placeholder="Enter task assignee" className= "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></Field>
          {errors.assignee && touched.assignee ? <div className='mt-2 text-sm text-red-500'>{errors.assignee}</div> : null}
          <label htmlFor='dueDate' className='mt-2.5 block mb-2 text-sm font-medium text-gray-900'>Due Date</label>
          <Field id="dueDate" name="dueDate" placeholder="Enter task due date" type="Date" className= "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></Field>
          {errors.dueDate && touched.dueDate ? <div className='mt-2 text-sm text-red-500'>{errors.dueDate}</div> : null}
          <button id='submit' type="submit" className="mt-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </Form>)}
      </Formik>
    </div>
  );
}

export default App;
