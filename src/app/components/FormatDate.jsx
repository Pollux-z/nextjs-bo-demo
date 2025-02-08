import React from 'react'
import { format, parseISO } from 'date-fns'

function FormatDate({dateData}) {
    const dformat = format(parseISO(dateData), 'LLLL dd yyyy')
  return (
    <>
        <p className='text-sm font-semibold  bg-slate-100 py-1 px-1 rounded-md shadow-sm  my-2'>{dformat}</p>
    </>
  )
}

export default FormatDate