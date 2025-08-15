import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormField from './FormField'

const DynamicForm = ({ fields, onSubmit, validationSchema, infiniteData }) => {
    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = field.initialValue || ''
        return acc
    }, {})

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    return (
        <form onSubmit={formik.handleSubmit} className='bg-white p-6 rounded shadow space-y-6 max-w-3xl mx-auto'>
            {fields.map((field) => (
                <FormField key={field.name} {...field} formik={formik} infiniteData={infiniteData} />
            ))}

            <div className='flex justify-end'>
                <button type='submit' className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded transition'>
                    Submit
                </button>
            </div>
        </form>
    )
}
export default DynamicForm
