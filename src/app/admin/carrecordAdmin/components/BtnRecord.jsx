import React from 'react'
import Link from 'next/link'

function BtnRecord() {
  return (
    <>
        <Link
            href="/admin/carrecordAdmin/record"
            className="bg-blue-500 text-white py-2 px-3 rounded-lg shadow-lg"
          >
            Record
          </Link>
    </>
  )
}

export default BtnRecord