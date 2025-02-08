import React from 'react'
import Link from 'next/link'
import { IoCreateOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";

function BtnRecord({children, href,btnText}) {
  return (
    <>
        <Link
        href={href}
        className='bg-green-500 text-white py-3 px-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-light'>
        <CiClock1 size="1rem" className="text-white" />
        {btnText}
        </Link>
    </>
  )
}

export default BtnRecord