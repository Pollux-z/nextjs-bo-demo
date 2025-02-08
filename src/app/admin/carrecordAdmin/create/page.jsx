"use client";

import React, { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import Header from "@/app/components/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function CreateCarReocrdAdminPage() {
  const { data: session } = useSession();


  const useCreateAnnouncement = session?.user?.nameEng;

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    const  handleSubmit = (e) => {

    }

  
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
              <h4 className="text-xl">Create Car record</h4>
            </div>
            <div className="my-10">
              {error && <p className="bg-red-500 text-white">{error}</p>}
              {success && <p className="bg-green-500 text-white">{success}</p>}
              <form onSubmit={handleSubmit} className="grid gap-2">
                <label htmlFor="subject">Destination :</label>
                <input
                  onChange={(e) => setSubject(e.target.value)}
                  type="text"
                  placeholder="Destination"
                  className="py-3 px-2 rounded-md"
                  name="Destination"
                />
                <label htmlFor="date">Date:</label>
                <div className="flex items-center">
                <input
                  onChange={(e) => setIssueDate(e.target.value)}
                  type="date"
                  placeholder="Issue date"
                  className="py-3 px-2 rounded-md w-full"
                  name="date"
                />
                <p className="px-5">To</p>
                <input
                  onChange={(e) => setIssueDate(e.target.value)}
                  type="date"
                  placeholder="Issue date"
                  className="py-3 px-2 rounded-md w-full"
                  name="date"
                />
                </div>

                <label htmlFor="date">Time:</label>
                <div className="flex items-center">
                <input
                  onChange={(e) => setIssueDate(e.target.value)}
                  type="time"
                  placeholder="Issue date"
                  className="py-3 px-2 rounded-md w-full"
                  name="Start time"
                />
                <p className="px-5">To</p>
                <input
                  onChange={(e) => setIssueDate(e.target.value)}
                  type="time"
                  placeholder="Issue date"
                  className="py-3 px-2 rounded-md w-full"
                  name="date"
                />
                </div>
                <label htmlFor="remark">Remark:</label>
                <input
                  onChange={(e) => setRemark(e.target.value)}
                  type="text"
                  placeholder="Remark"
                  className="py-3 px-2 rounded-md"
                  name="remark"
                />
                
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
    </main>
  );
}

export default CreateCarReocrdAdminPage;
