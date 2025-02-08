"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Datepicker from "react-tailwindcss-datepicker";

import NavbarAdmin from "@/app/admin/components/NavbarAdmin";
import Header from "@/app/components/Header";
import HeaderContent from "@/app/components/HeaderContent";

function EditCarrecordPage({ params }) {
  const { data: session } = useSession();

  const { id } = params;

  const date = new Date();

  const [value, setValue] = useState({ 
    startDate: null, 
    endDate: null
    }); 

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [carrecordData, setCarrecordData] = useState([]);
  const [startTime, setStartTime] = useState("00:00")
  const [endTime, setEndTime] = useState("00:00")

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
    } 

  const getOldCarrecord = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/totalCarrecord/${id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Error feltch carrecord");
      }
      const data = await res.json();
      setCarrecordData(data.post);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOldCarrecord(id);
  }, []);
  return (
    <main>
      <div className="flex w-full">
        <div className="w-[244px] mx-3">
          <NavbarAdmin />
        </div>
        <div className="w-full px-2">
          <div>
            <Header />
          </div>
          <div>
            <div>
              <HeaderContent
                textHeader={`Carrecord Admin`}
                textContent={`Carrecord`}
                textContentSub={`Edit`}
                hrefContent={`/admin/carrecordAdmin`}
              />
            </div>
            <div className="my-10">
              {error && <p className="bg-red-500 text-white">{error}</p>}
              {success && <p className="bg-green-500 text-white">{success}</p>}
              <div className="bg-white rounded-md shadow-md py-5">
                <h5 className=" px-7 text-xl">Create Post</h5>
                <hr className="my-5" />
                <form action="" className="grid gap-2 py-2 px-7">
                  <label htmlFor="" className="text-sm">
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder={carrecordData?.destination}
                    className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md shadow-md mt-1 text-xs"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="" className="text-sm">
                        Issue Date
                      </label>
                      <Datepicker
                      displayFormat={"DD/MM/YYYY"}
                      value={value} 
                      onChange={handleValueChange} 
                      inputClassName="bg-[#F5F6FA] py-5 px-5 w-full rounded-md shadow-md mt-1 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="">
                        <label htmlFor="starttime" className="text-sm block">Start Time</label>
                        <input
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        type="time" 
                        className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md shadow-md mt-1 text-xs"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="starttime" className="text-sm">End Time</label>
                        <input
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        type="time" 
                        className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md shadow-md mt-1 text-xs"
                        />
                    </div>
                  </div>
                  <label htmlFor="status" className="text-sm mt-2">
                    Status
                  </label>
                  <select

                  name="status"
                  className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md shadow-md mt-1 text-xs">
                    <option value="reserve">Reserve</option>
                    <option value="use">In use</option>
                    <option value="return">Return</option>
                    <option value="cancel">Cancel</option>
                  </select>
                  <div className="space-x-2 mt-5">
                    <a
                    href="/admin/carrecordAdmin"
                    className="bg-orange-500 w-36 text-white py-2.5 px-10 rounded-lg font-extralight text-sm"
                    >Cancel</a>
                    <button
                      type="submit"
                      className="bg-blue-500 w-36 text-white py-2 rounded-lg font-extralight text-sm"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditCarrecordPage;
