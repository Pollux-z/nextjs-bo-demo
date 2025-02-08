"use client";

import React, { useState } from "react";
import { useUpdateCarrecord } from "@/app/services/mutations";
import InputFunction from "./InputFunction";
import { Floor } from "@/app/db/option";
import { CarrecordType } from "@/interfaces/Carrecord";

const UpdateCarrecord: React.FC<{
  inputData: any;
  handleChange: any;
  data: CarrecordType;
}> = ({ inputData, handleChange, data }) => {
  const id = data?._id;
  const { trigger, isMutating } = useUpdateCarrecord(id);
  const [error, setError] = useState<string>();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputData.endDistance || !inputData.floor || !inputData.slot)
      return setError("Please input all data..");

    trigger({
      endDistance: inputData.endDistance,
      floor: inputData.floor,
      slot: inputData.slot,
      remark: inputData.remark,
    });
    

  };
  return (
    <>
      {error ? (
        <div className="bg-red-100 mt-5  px-5 py-3 rounded-md text-red-600">
          <p>{error}</p>
        </div>
      ) : null}
      <div className="bg-white py-5 px-10 w-full mt-5">
        <div className="grid gap-2">
          <form onSubmit={handleUpdate} className="">
            <div className="grid grid-cols-2 gap-2">
              <div className="">
                <InputFunction
                  disabled={false}
                  labelText="ระยะทาง กม./ไมล์ กลับ"
                  value={inputData.endDistance}
                  placeholder="Kilometers at the starting point..."
                  onChange={handleChange}
                  type="number"
                  name="endDistance"
                />
              </div>
              <div>
                <label htmlFor="floor" className="text-sm">
                  ชั้นที่จอด
                </label>
                <select
                  title="Select"
                  name="floor"
                  onChange={handleChange}
                  value={inputData.floor}
                  className="border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs"
                >
                  <option value="null">- Selete option -</option>
                  {Floor.map((val, index) => (
                    <option value={val} key={index}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <InputFunction
                  disabled={false}
                  labelText="ช่องจอด"
                  value={inputData.slot}
                  placeholder=""
                  onChange={handleChange}
                  type="text"
                  name="slot"
                />
              </div>
              <div className="">
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
}

export default UpdateCarrecord;
