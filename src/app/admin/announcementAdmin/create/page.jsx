"use client";

import React, { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import Header from "@/app/components/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

import WalkFame from "../../../../../public/header-removebg.png";

function CreateAnnouncementAdminPage() {
  const { data: session } = useSession();
  const id = 0

  const userCreate = session?.user?.nameEng;

  const [subject, setSubject] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [attachFile, setAttachFile] = useState("");
  const [remark, setRemark] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/createAnnouncement`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            subject,
            issueDate,
            remark,
            attachFile,
            userCreate,
          }),
        }
      );

      if (res.ok) {
        const form = e.target;
        setError("");
        setSuccess("Create post success");
        form.reset();
      } else {
        console.log("Create post failed");
      }
    } catch (err) {
      console.log("Error during create post announcement:", err);
    }
  };

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
            <div className="bg-blue-100 px-8 rounded-lg flex justify-between items-center">
              <div className="">
                <h1 className="text-xl">Announcement Admin</h1>
                <ul className="font-light text-sm mt-1">
                  <li className="flex">
                    <a href="/admin/announcementAdmin">Announcement</a>
                    <ul className="list-disc px-6">
                      <li>Create post</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="overflow-hidden">
                <Image
                  src={WalkFame}
                  width={150}
                  height={20}
                  className="-mb-12"
                  alt="headerpic"
                />
              </div>
            </div>

            <div className="my-10">
              {error && <p className="bg-red-500 text-white">{error}</p>}
              {success && <p className="bg-green-500 text-white">{success}</p>}
              <div className="bg-white rounded-md shadow-md">
                <h5 className="py-3 px-7 text-xl">Create Post</h5>
                <hr />
                <form onSubmit={handleSubmit} className="grid gap-2 py-5 px-7">
                  <label htmlFor="subject" className="text-sm">
                    Subject
                  </label>
                  <input
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md  mt-1 text-xs"
                  />
                  <label htmlFor="date" className="text-sm mt-3">
                    Issue Date
                  </label>
                  <input
                    onChange={(e) => setIssueDate(e.target.value)}
                    type="date"
                    placeholder="Issue date"
                    name="date"
                    className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md  mt-1 text-xs"
                  />
                  <label htmlFor="remark" className="text-sm mt-3">
                    Remark
                  </label>
                  <input
                    onChange={(e) => setRemark(e.target.value)}
                    type="text"
                    placeholder="Remark"
                    name="remark"
                    className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md  mt-1 text-xs"
                  />
                  <label htmlFor="" className="text-sm mt-3">
                    File on oneDrive
                  </label>
                  <input
                    onChange={(e) => setAttachFile(e.target.value)}
                    type="text"
                    placeholder="Enter link here..."
                    name="attachFile"
                    className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md  mt-1 text-xs"
                  />

                  <div className="space-x-2 mt-2">
                    <a
                      href="/admin/announcementAdmin"
                      className="bg-orange-500 w-36 text-white py-2.5 px-10 rounded-lg font-extralight text-sm"
                    >
                      Cancel
                    </a>
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

export default CreateAnnouncementAdminPage;
