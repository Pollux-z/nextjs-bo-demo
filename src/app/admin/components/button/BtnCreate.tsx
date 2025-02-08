import React from 'react'
import Link from 'next/link'
import { IoCreateOutline } from "react-icons/io5";

type BtnCreateType = {
  href: string
  btnText: string
}

const BtnCreate: React.FC<BtnCreateType> = ({href,btnText}) => {
  return (
    <>
        <Link
        href={href}
        className='bg-blue-500 text-white py-2 px-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-light'>
        <IoCreateOutline size="1rem" className="text-white " />
        {btnText}
        </Link>
    </>
  )
}

export default BtnCreate