import React from 'react'

const SignInput = React.forwardRef(({ name, placeholder, type, ...props }, ref) => {
    return (
        <input
            {...props}
            ref={ref}
            className='border-gray-500 border-t-0 border-x-0 border-b-2 px-1 py-2 focus:outline-none placeholder:text-black opacity-50 mb-4 text-black'
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
        />
    );
});

export default SignInput;
