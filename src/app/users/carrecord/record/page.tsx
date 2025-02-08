"use client";

import ContainerUser from "@/app/components/ContainerUser";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import HeaderContent from "@/app/components/HeaderContent";
import { useCarrecord, useLastCarrecord } from "@/app/services/queries";
import Loading from "@/app/loading";
import CreateCarrecord from "../components/CreateCarrecord";
import UpdateCarrecord from "../components/UpdateCarrecord";

function Page(): React.ReactElement {
  const { data: session } = useSession();

  const {
    data: lastCarrecord,
    isLoading,
    isValidating,
    error,
  } = useLastCarrecord();
  const dataLastCarrecord = lastCarrecord?.lastCarrecord;
  const endDistanceData = dataLastCarrecord?.endDistance;

  const [inputData, setInputData] = useState({
    destination: "",
    startDistance: "",
    endDistance: "",
    floor: "",
    slot: "",
    remark: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Record use Car`}
        textContent={`Car record`}
        hrefContent={`/users/carrecord`}
        textContentSub={`Record use car`}
      />
      {!dataLastCarrecord || endDistanceData ? (
        <CreateCarrecord
          data={dataLastCarrecord}
          handleChange={handleChange}
          inputData={inputData}
        />
      ) : (
        <UpdateCarrecord
          data={dataLastCarrecord}
          inputData={inputData}
          handleChange={handleChange}
        />
      )}
    </ContainerUser>
  );
}

export default Page;
