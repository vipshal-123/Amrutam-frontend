import React from 'react'

const MultiSelect = ({ label, name, formik, options = [], ...props }) => {
    const handleMultiChange = (e) => {
        const selectedValue = e.target.value
        if (selectedValue && !formik.values[name]?.includes(selectedValue)) {
            formik.setFieldValue(name, [...(formik.values[name] || []), selectedValue])
        }
        e.target.value = ''
    }

    const handleRemove = (value) => {
        formik.setFieldValue(
            name,
            formik.values[name].filter((item) => item !== value),
        )
    }

    return (
        <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>

            {formik.values[name]?.length > 0 && (
                <div className='flex flex-wrap gap-2 mb-2'>
                    {formik.values[name].map((value) => (
                        <span key={value} className='flex items-center bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full'>
                            {options.find((opt) => opt.value === value)?.label || value}
                            <button type='button' className='ml-2 text-emerald-600 hover:text-red-600' onClick={() => handleRemove(value)}>
                                ✕
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <select name={name} value='' onChange={handleMultiChange} className='w-full border rounded p-2' {...props}>
                <option value=''>Select an option</option>
                {options
                    .filter((opt) => !formik.values[name]?.includes(opt.value))
                    .map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
            </select>

            {formik.touched[name] && formik.errors[name] && <div className='text-red-500 text-sm mt-1'>{formik.errors[name]}</div>}
        </div>
    )
}

export default MultiSelect
