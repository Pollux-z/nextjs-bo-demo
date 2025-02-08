import ContainerAdmin from "@/app/admin/components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import React from "react";
import FormEditMeetingRoomAdmin from "../../components/FormEditMeetingRoomAdmin";

function Page({ params }) {
  const { id } = params;
  return (
    <ContainerAdmin>
      <HeaderContent 
      textHeader={`Edit Meeting Room`}
      />
      <div className="bg-white py-5 px-10 w-full mt-5">
        <FormEditMeetingRoomAdmin id={id}/>
      </div>
    </ContainerAdmin>
  );
}

export default Page;
