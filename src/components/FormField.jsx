import React from 'react'
import MultiSelect from './MultiSelect'

const FormField = ({ label, name, type = 'text', as = 'input', formik, multiple = false, children, options, ...props }) => {
    const Component = as

    if (multiple && as === 'select') {
        return (
            <div>
                <MultiSelect label={label} name={name} formik={formik} options={options} {...props} />
                {formik.touched[name] && formik.errors[name] && <div className='text-red-500 text-sm mt-1'>{formik.errors[name]}</div>}
            </div>
        )
    }

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
            >
                {children}
            </Component>
            {formik.touched[name] && formik.errors[name] && <div className='text-red-500 text-sm mt-1'>{formik.errors[name]}</div>}
        </div>
    )
}

export default FormField
