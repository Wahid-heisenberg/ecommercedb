import React from 'react'

function SignButton(props) {
    const { value ,disabled } = props;

    return (
        <input type="submit" value={value} 
        disabled={disabled}
        className='text-white bg-[#DB4444] px-4 py-2 font-bold w-full cursor-pointer mb-3' />
    )
}

export default SignButton