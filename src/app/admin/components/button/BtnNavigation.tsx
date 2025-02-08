import React from 'react'
import Link from 'next/link'
import { IoCreateOutline } from "react-icons/io5";
import { CiViewTable } from "react-icons/ci";

type BtnNavigationType = {
  href: string;
  btnText: string;
}

const BtnNavigation: React.FC<BtnNavigationType> = ({ href,btnText}) =>  {
  return (
    <>
        <Link
        href={href}
        className='bg-purple-500 text-white py-2 px-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-light'>
        <CiViewTable size="1rem" className="text-white " />
        {btnText}
        </Link>
    </>
  )
}

export default BtnNavigation