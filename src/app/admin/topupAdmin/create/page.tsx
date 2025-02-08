import React from 'react'
import ContainerAdmin from '../../components/ContainerAdmin'
import HeaderContent from '@/app/components/HeaderContent';
import FormCreateTopUp from '@/app/users/timeoff/components/FormCreateTopUp';

function page() {
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader="Create Top-Up"
        textContent=""
        hrefContent=""
        textContentSub=""
      />
      <div className="mt-5 bg-white p-3 rounded-md">
        <FormCreateTopUp />
      </div>
    </ContainerAdmin>
  );
}

export default page