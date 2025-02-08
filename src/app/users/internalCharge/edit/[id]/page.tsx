import React from 'react'
import FormEditInternalCharge from '../../components/FormEditInternalCharge'
import ContainerUser from '@/app/components/ContainerUser'
import HeaderContent from '@/app/components/HeaderContent'

function Page({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <ContainerUser>
      <HeaderContent
        textHeader="Edit Internal Charge"
        textContent=""
        hrefContent=""
        textContentSub=""
      />
      <div className='bg-white p-5 rounded-lg shadow-md mt-3'>
        <FormEditInternalCharge  id={id}/>
      </div>
    </ContainerUser>
  )
}

export default Page