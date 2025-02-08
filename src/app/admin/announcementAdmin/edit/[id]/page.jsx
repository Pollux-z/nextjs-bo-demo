"use client";

import React, { useEffect, useState } from "react";
import NavbarAdmin from "@/app/admin/components/NavbarAdmin";
import Header from "@/app/components/Header";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

function EditAnnouncementAdminPage({ params }) {
  const { data: session } = useSession();

  const { id } = params;
  const route = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [announcementData, setAnnouncementData] = useState([]);
  const [newSubject, setNewSubject] = useState();
  const [newIssueDate, setNewIssueDate] = useState();
  const [newRemark, setNewRemark] = useState();

  const getOldAnnouncement = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/totalAnnouncement/${id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Error fetch announcement");
      }
      const data = await res.json();
      setAnnouncementData(data?.post);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/totalAnnouncement/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newSubject, newIssueDate, newRemark }),
        }
      );
      if (!res.ok) {
        throw new Error("Error Put data");
      }

      route.refresh();
      route.push("/admin/announcementAdmin");
    } catch (error) {}
  };

  useEffect(() => {
    getOldAnnouncement(id);
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
          <div className="py-5 px-10 bg-gray-100 h-full">
            <div>
              <h4 className="text-xl">Edit Announcement post</h4>
            </div>
            <div className="mt-5 w-80">
              <form onSubmit={handleSubmit} className="grid gap-3 ">
                <input
                  className="py-2 px-3 rounded-md shadow-md"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder={announcementData?.subject}
                  type="text"
                  aria-label="subject"
                />
                <input
                  className="py-2 px-3 rounded-md shadow-md"
                  onChange={(e) => setNewIssueDate(e.target.value)}
                  value={newIssueDate}
                  placeholder={announcementData?.issueDate}
                  type="date"
                  aria-label="subject"
                />
                <input
                  className="py-2 px-3 rounded-md shadow-md"
                  onChange={(e) => setNewRemark(e.target.value)}
                  value={newRemark}
                  placeholder={announcementData?.remark}
                  type="text"
                  aria-label="subject"
                />
                <div>
                <button
                  type="submit"
                  className="bg-blue-400 py-1 px-4 rounded-md text-white"
                >
                  Save
                </button>
                <a 
                href="/admin/announcementAdmin"
                className="bg-yellow-400 rounded-md text-white px-3 py-[6px] mx-2"
                >Cancel</a>
                </div>
                
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditAnnouncementAdminPage;
