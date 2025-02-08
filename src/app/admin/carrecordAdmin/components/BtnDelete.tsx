import React from 'react'
import { IoTrashBinOutline } from "react-icons/io5";

type BtnDeleteType = {
  id: string
}

const  BtnDelete: React.FC<BtnDeleteType> = ({id}) => {
  const handleDelete = async () => {
    const confrim = confirm("Are your sure delete ?");
    if(confrim){
      const res = await fetch(`http://localhost:3000/api/deleteCarrecord?id=${id}`,{
        method: "DELETE"
      })
      if(res.ok){
        window.location.reload();
      }
    }
  }
  return (
    <>
      <a
        onClick={handleDelete}
        className='bg-red-100 text-red-500 px-2 py-1 rounded-md shadow-sm text-xs font-light flex items-center justify-center gap-1 cursor-pointer'
        >
          <IoTrashBinOutline />
            Delete
        </a>
    </>
  )
}

export default BtnDelete