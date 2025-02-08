import ContainerUser from '@/app/components/ContainerUser'
import HeaderContent from '@/app/components/HeaderContent'
import React from 'react'
import FormCreateResignation from '../components/FormCreateResignation'

function CreateResignationPage() {
    return (
        <ContainerUser>
                <HeaderContent
                        textHeader="Create Resignation"
                        textContent=""
                        hrefContent=""
                        textContentSub=""
                />
                <div className='bg-white p-5 rounded-md shadow-lg mt-3'>
                        <FormCreateResignation />
                </div>
        </ContainerUser>
    )
}

export default CreateResignationPage