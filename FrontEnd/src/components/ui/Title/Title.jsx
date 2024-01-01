import React from 'react'

const Title = ({children,...props }) => {
  return (
    <div className='flex gap-2 items-center' >
        <span className='content-none bg-bgButton h-8 w-4 rounded-sm'></span>
        <span className='text-bgButton font-semibold'>{children} </span>
      
    </div>
  )
}

export default Title
