import React from 'react'
import MultiSelect from './MultiSelect'
import InfiniteSelect from './InfiniteSelect'

const FormField = ({ label, name, type = 'text', as = 'input', formik, multiple = false, children, options, infiniteData, ...props }) => {
    const Component = as

    if (multiple && as === 'select') {
        return (
            <div>
                <MultiSelect label={label} name={name} formik={formik} options={options} {...props} />
                {formik.touched[name] && formik.errors[name] && <div className='text-red-500 text-sm mt-1'>{formik.errors[name]}</div>}
            </div>
        )
    }

    if (multiple && as === 'infinite_select') {
        return (
            <>
                <InfiniteSelect
                    name={name}
                    onChange={(val) => formik.setFieldValue(name, val)}
                    cursor={infiniteData.cursor}
                    fetchMore={infiniteData.fetchData}
                    hasMore={infiniteData.hasMore}
                    options={options}
                    value={formik.values[name] || ''}
                />
                {formik.touched[name] && formik.errors[name] && <div className='text-red-500 text-sm mt-1'>{formik.errors[name]}</div>}
            </>
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
