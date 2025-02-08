"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";


function HowToContent() {
  const [announcementData, setAnnouncementData] = useState({});
  console.log("Announcement :", announcementData);

  const getAnnouncementData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/totalAnnouncement", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Error load data Announcement Data");
      }
      const data = await res.json();
      setAnnouncementData(data.totalAnnouncement);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnnouncementData();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center my-10">
        <h1 className="text-xl">How to Admin Page</h1>
        <div>
          <Link
            href="/admin/howtoAdmin/create"
            className="bg-green-500 text-white py-2 px-3 rounded-lg shadow-lg"
          >
            Create post
          </Link>
        </div>
      </div>
      {announcementData && announcementData.length > 0 
      ?(
        <table className="table-auto w-full text-left mt-5">
        <thead className="bg-gray-200 text-sm">
          <tr className="">
            <th className="p-3 w-[140px] rounded-s-md">ID</th>
            <th className="w-[120px] px-3">Date</th>
            <th className="px-3 ">Subject</th>
            <th className="px-3 w-[100px]">By</th>
            <th className="rounded-e-md px-3 text-center w-[150px]">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {/* {announcementData.map((val, index) => (
            <tr key={index} className=" border-b">
            <td className="py-5 px-3">TIME-2024/0{index + 1}</td>
            <td className="px-3">{val?.issueDate}</td>
            <td className="px-3">{val?.subject}</td>
            <td className="px-3">{val?.userCreate}</td>
            <td className="px-3 text-center flex justify-center items-center py-5">
              <BtnEdit id={val?._id}/>
              <BtnDelete id={val?._id}/>
            </td>
          </tr>
          ))} */}
          
        </tbody>
      </table>
      )
    : (
      <>
        <p>No data</p>
      </>
    )}
    </div>
  );
}

export default HowToContent;
