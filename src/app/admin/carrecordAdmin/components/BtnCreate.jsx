import React from 'react'
import Link from 'next/link'

function BtnCreate() {
  return (
    <>
        <Link
            href="/admin/carrecordAdmin/create"
            className="bg-green-500 text-white py-2 px-3 rounded-lg shadow-lg"
          >
            Create post
          </Link>
    </>
  )
}

export default BtnCreate