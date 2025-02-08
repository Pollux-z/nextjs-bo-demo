import ContainerUser from '@/app/components/ContainerUser'
import HeaderContent from '@/app/components/HeaderContent'
import React from 'react'
import FormCreateSwapDate from '../components/FormCreateSwapDate'

function Page() {
  return (
    <div>
      <ContainerUser>
        <HeaderContent 
        textHeader={`Create Swap date`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
        />
        <div className='bg-white py-5 px-10 w-full mt-5'>
          <FormCreateSwapDate />
        </div>
      </ContainerUser>
    </div>
  )
}

export default Page