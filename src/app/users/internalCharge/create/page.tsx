import ContainerUser from '@/app/components/ContainerUser'
import HeaderContent from '@/app/components/HeaderContent'
import React from 'react'
import FormCreateInternalCharge from '../components/FormCreateInternalCharge'

function page() {
  return (
    <ContainerUser>
        <HeaderContent
            textHeader="Internal Charge"
            textContent=""
            hrefContent=""
            textContentSub=""
        />
        <div className='bg-white p-5 rounded-md shadow-lg mt-3'>
            <FormCreateInternalCharge />
        </div>
        </ContainerUser>

  )
}

export default page