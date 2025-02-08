import React from 'react'
import ContainerAdmin from '../components/ContainerAdmin'
import HeaderContent from '@/app/components/HeaderContent'
import BtnCreate from '../components/button/BtnCreate'
import TableResignation from './components/TableResignation'

function page() {
  return (
    <ContainerAdmin>
        <HeaderContent 
            textHeader={`Resignation Admin`}
            textContent={``}
            textContentSub={``}
            hrefContent={``}
        />
        <div>
            <div className="bg-white rounded-md shadow-md my-2 p-3">
                <div className="flex justify-end ">
                    <BtnCreate btnText="Request" href="/admin/resignationAdmin/create" />
                </div>
                <div className="mt-3">
                    <TableResignation  />
                </div>
            </div>
        </div>
    </ContainerAdmin>
  )
}

export default page