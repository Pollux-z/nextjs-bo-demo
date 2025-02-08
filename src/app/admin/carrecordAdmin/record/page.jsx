"use client";

import React, { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import Header from "@/app/components/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function Page() {
  const { data: session } = useSession();
  

  const useCreateAnnouncement = session?.user?.nameEng;

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {};

  return (
    <main>
      <div className="flex w-full">
        <div className="w-[244px] mx-3">
          <NavbarAdmin />
        </div>
        <div className="w-full px-2">
          <div className="">
            <Header session={session} />
          </div>
          <div className="py-5 px-10 bg-gray-100 h-full">
            <div>
              <h4 className="text-xl">Record Car record</h4>
            </div>
            <div className="my-10">
              {error && <p className=" text-white">{error}</p>}
              {success && <p className="bg-green-500 text-white">{success}</p>}
              <div className="bg-white py-5 px-10 w-full mt-5">
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="destination" className="text-sm">
                      Destination:
                    </label>
                    <input
                      type="text"
                      value="BKK"
                      className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md shadow-md mt-1 text-xs"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="totalDestination" className="text-sm">
                      KM:
                    </label>
                    <input
                      type="number"
                      className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md shadow-md mt-1 text-xs"
                      placeholder="Record total driver KM"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 w-36 text-white py-2 rounded-lg mt-5"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
