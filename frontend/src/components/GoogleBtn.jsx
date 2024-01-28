import React from 'react'
import google from '../assets/google.svg';
function GoogleBtn() {
  return (
    <button className='flex items-center justify-center gap-2 w-full border-black py-2 px-4  border-2'>
    <img src={google} alt="google" />
    <span>
        Sign up with Google
    </span>
</button>
  )
}

export default GoogleBtn