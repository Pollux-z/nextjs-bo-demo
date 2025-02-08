import React from 'react'

function BtnDelete({ id }) {
    const handleDelete = async () => {
        const confrim = confirm("Are your sure delete ?");
        if(confrim){
            const res = await fetch(`http://localhost:3000/api/deleteAnnouncement?id=${id}`,{
                method: "DELETE",
            })

            if(res.ok){
                window.location.reload();
            }
        }
    }
  return (
    <>
        <a 
        className='bg-red-500 text-white px-2 py-1 rounded-md shadow-md'
        onClick={handleDelete}
        >
            Delete
        </a>
    </>
  )
}

export default BtnDelete