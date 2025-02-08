"use client";

import React, { useState } from "react";
import InputFunction from "./InputFunction";
import { useCreateCarrecord } from "@/app/services/mutations";
import { useSession } from "next-auth/react";
import { CarrecordType } from "@/interfaces/Carrecord";

const CreateCarrecord: React.FC<{
  data: CarrecordType;
  handleChange: any;
  inputData: any;
}> = ({ data, handleChange, inputData }) => {
  const { data: session } = useSession();
  const { trigger, isMutating } = useCreateCarrecord();
  const [error, setError] = useState<string>();

  const endDistanceData = data?.endDistance ? data?.endDistance : 0;
  const code = data?.code ? data?.code + 1 : 1;

  const userCreate = session?.user?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputData.destination) return setError("Please input all data..");

    trigger({
      code: code,
      destination: inputData.destination,
      startDistance: endDistanceData,
      remark: inputData.remark,
      userCreate: userCreate,
    });
  };

  return (
    <>
      <div className="bg-green-100 mt-5  px-5 py-3 rounded-md text-green-600">
        <p>
          {data?.floor
            ? `รถจอดอยู่ที่ ชั้น ${data?.floor} ช่องจอด ${data?.slot}`
            : "ไม่มีข้อมูล ติดต่อ Admin"}
        </p>
      </div>
      {error ? (
        <div className="bg-red-100 mt-5  px-5 py-3 rounded-md text-red-600">
          <p>{error}</p>
        </div>
      ) : null}
      <div className="bg-white py-5 px-10 w-full mt-5">
        <div className="grid gap-2">
          <form onSubmit={handleSubmit} className="">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <div className="">
                <InputFunction
                  disabled={true}
                  labelText="ระยะทาง กม./ไมล์ ไป"
                  value={endDistanceData}
                  placeholder="Kilometers at the starting point..."
                  onChange={handleChange}
                  type="number"
                  name="startDistance"
                />
              </div>
              <div>
                <InputFunction
                  disabled={false}
                  labelText="สถานที่ไป"
                  value={inputData.destination}
                  placeholder="Enter your destination"
                  onChange={handleChange}
                  type="text"
                  name="destination"
                />
              </div>
              <div>
                <InputFunction
                  disabled={false}
                  labelText="หมายเหตุ ( Optional )"
                  value={inputData.remark}
                  placeholder=""
                  onChange={handleChange}
                  type="text"
                  name="remark"
                />
              </div>
            </div>

            <button
              disabled={isMutating}
              type="submit"
              className={
                isMutating
                  ? "bg-gray-500 w-36 text-white py-2 rounded-lg shadow-md mt-5"
                  : "bg-green-500 w-36 text-white py-2 rounded-lg shadow-md mt-5"
              }
            >
              {isMutating ? "Creating..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCarrecord;
