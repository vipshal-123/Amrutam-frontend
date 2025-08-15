import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ChevronDown, ChevronUp } from 'lucide-react'

const InfiniteSelect = ({ name, onChange, fetchMore, cursor, options, hasMore, placeholder = 'Select option', value }) => {
    const [open, setOpen] = useState(false)

    const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder

    return (
        <div className='relative w-full md:w-auto'>
            <select name={name} value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ display: 'none' }}>
                <option value=''>{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <button
                type='button'
                className='border p-2 pr-8 rounded-md w-full text-left bg-white flex items-center justify-between shadow-sm hover:shadow-md transition'
                onClick={() => setOpen((prev) => !prev)}
            >
                <span className='truncate'>{selectedLabel}</span>
                {open ? <ChevronUp size={18} className='text-gray-500' /> : <ChevronDown size={18} className='text-gray-500' />}
            </button>

            {open && (
                <div id='select-scrollable' className='absolute z-50 mt-1 w-full max-h-48 overflow-auto border rounded-md bg-white shadow-lg'>
                    <InfiniteScroll
                        dataLength={options.length}
                        next={() => fetchMore(cursor)}
                        hasMore={hasMore}
                        scrollableTarget='select-scrollable'
                        height={180}
                        loader={<div className='p-2 text-gray-500 text-center'>Loading...</div>}
                    >
                        {/* Placeholder clickable option */}
                        <div
                            className={`p-2 hover:bg-gray-100 cursor-pointer ${value === '' ? 'bg-gray-200' : ''}`}
                            onClick={() => {
                                onChange('')
                                setOpen(false)
                            }}
                        >
                            {placeholder}
                        </div>

                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`p-2 hover:bg-gray-100 cursor-pointer ${value === option.value ? 'bg-gray-200' : ''}`}
                                onClick={() => {
                                    onChange(option.value)
                                    setOpen(false)
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            )}
        </div>
    )
}

export default InfiniteSelect
