"use client";

import Error from "@/app/Error";
import Loading from "@/app/loading";
import {
  useCreateTopUp,
  useUpdateTimerWithOther,
} from "@/app/services/mutations";
import { useTopUpLast, useUsers } from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const FormCreateTopUp = () => {
  const { data: session } = useSession();
  const userCreate = session?.user?.id;


  const [inputData, setInputData] = useState({
    employee: "",
    type: "",
    topUpDay: "",
    remark: "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  const { trigger: updateTopUp, isMutating } = useCreateTopUp();


  const { data: getUsers, isLoading, error } = useUsers();
  const users: UsersType[] = getUsers?.totalUsers;


  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateTopUp({
      employee: inputData.employee,
      type: inputData.type,
      topUpDay: inputData.topUpDay,
      remark: inputData.remark,
      userCreate: userCreate,
    });
  };

  if(isLoading) return <Loading />
  if(error) return <Error />
  
  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-2  w-[450px]">
        <div className="">
          <label htmlFor="employee" className="text-sm">
            Employee
          </label>
          <select
            onChange={handleChange}
            name="employee"
            id="employee"
            className="border py-5 px-5 w-full rounded-md  mt-1 text-xs text-gray-500"
          >
            <option value="null">- Selete employee -</option>
            {users?.map((val, index) => (
              <option key={index} value={val?._id}>
                TIME-{val?.userCode} {val?.nameTh}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <label htmlFor="reason" className="text-sm">
            Add date for request
          </label>
          <div className="flex gap-5">
            <div className="flex items-center gap-1">
              <input
                id="increase"
                type="radio"
                value="increase"
                name="type"
                onChange={handleChange}
              />
              <label className="text-sm" htmlFor="increase">
                {" "}
                เพิ่ม
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                id="reduce"
                type="radio"
                value="reduce"
                name="type"
                onChange={handleChange}
              />
              <label className="text-sm" htmlFor="reduce">
                {" "}
                ลด
              </label>
            </div>
          </div>

          <input
            onChange={handleChange}
            name="topUpDay"
            type="number"
            min={0}
            placeholder="Enter number date topup"
            className="border py-5 px-5 w-full rounded-md  mt-1 text-xs text-gray-500"
          />
        </div>
        <div>
          <label htmlFor="remark" className="text-sm">
            Remark
          </label>
          <input
            type="text"
            name="remark"
            onChange={handleChange}
            placeholder="Enter remark..."
            className="border py-5 px-5 w-full rounded-md  mt-1 text-xs text-gray-500"
          />
        </div>
        <div>
          <button
            disabled={isMutating}
            type="submit"
            className={
              isMutating
                ? "bg-gray-500 w-36 text-white py-2 rounded-lg shadow-md mt-5 font-extralight"
                : "bg-green-500 w-36 text-white py-2 rounded-lg shadow-md mt-5 font-extralight"
            }
          >
            {isMutating ? "Creating..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}

export default FormCreateTopUp;
