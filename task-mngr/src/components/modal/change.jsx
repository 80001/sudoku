import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateTask } from '../../utils/firebase';

const ChangeTask = ({ task, setChange }) => {
    const closeModal = () => {
        setChange(false)
    }

    const { title, status, priority, category, id } = task
    return (
        <Formik
            initialValues={{ title, status, priority, category }}
            validate={values => {
                const errors = {};
                if (!values.title) {
                    errors.title = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                updateTask(id, values)
                setTimeout(() => {
                    console.log(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
                closeModal()
            }}
        >
            {({ isSubmitting }) => (
                <Form className='modal-task'>
                    <div className="modal-task__block">
                        <label htmlFor="title">Title:</label>
                        <ErrorMessage name="title" component="span" />
                    </div>
                    <Field id='title' type="text" name="title" placeholder='20symbals' />
                    <div className="modal-task__block">
                        <label htmlFor="status">Complete:</label>
                        <ErrorMessage name="status" component="span" />
                    </div>
                    <Field type="checkbox" name="status" />
                    <div className="modal-task__block">
                        <label htmlFor="priority">Priority:</label>
                        <ErrorMessage name="priority" component="span" />
                    </div>
                    <Field as="select" name="priority" placeholder="priority">
                        <option value="">Select Priority</option>
                        <option value="&#9650; High">&#9650; High</option>
                        <option value="&#9668; Medium">&#9668; Medium</option>
                        <option value="&#9660; Low">&#9660; Low</option>
                    </Field>
                    <div className="modal-task__block">
                        <label htmlFor="category">Category:</label>
                        <ErrorMessage name="category" component="span" />
                    </div>
                    <Field as="select" name="category" placeholder="category">
                        <option value="">Select Category</option>
                        <option value="⁜ Work">&#87; Work</option>
                        <option value="※ Home">&#72; Home</option>
                        <option value="⁂ Education">&#69; Education</option>
                    </Field>
                    <button className="modal-task__button-close" type='button' onClick={closeModal}>X</button>
                    <button type="submit" disabled={isSubmitting} className='modal-task__button-create'>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default ChangeTask
