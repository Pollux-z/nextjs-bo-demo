import React, { Children } from 'react'

function Card({children}) {
  return (
    <div className='bg-white rounded-md shadow-md p-7'>
        {children}
    </div>
  )
}

export default Card