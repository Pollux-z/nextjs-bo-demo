import React from 'react'
import { CiSquareAlert } from "react-icons/ci";

function AnnountmentSwapDate() {
  return (
    <div className='flex justify-center items-center bg-green-100 p-2  border-l-4 border-green-400 gap-4 min-h-20'>
        <CiSquareAlert size={25} className="text-green-500" />
        <p className='text-green-800 font-bold'>แจ้งทุกท่าน: หากพนักงานต้องการที่จะทำงานนอกเวลาทำการ จ-ศ และนำมาเปลี่ยนเป็นวันหยุด ให้พนักงานแจ้งกับทาง PM, Manager สำหรับแผนการทำงานก่อน 7-14 วัน</p>
    </div>
  )
}

export default AnnountmentSwapDate