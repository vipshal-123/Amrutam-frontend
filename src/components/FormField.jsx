import React from 'react'

const FormField = ({ label, name, type = 'text', as = 'input', formik, ...props }) => {
    const Component = as

    return (
        <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
            <Component
                name={name}
                type={type}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='w-full border rounded p-2'
                {...props}
            />
            {formik.touched[name] && formik.errors[name] && <div className='text-red-500 text-sm mt-1'>{formik.errors[name]}</div>}
        </div>
    )
}
export default FormField
