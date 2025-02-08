"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useProjects, useSwapDateLast, useUsers } from "@/app/services/queries";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useAdminCreateSwapDate } from "@/app/services/mutations";
import BtnFormCreate from "@/app/components/button/BtnFormCreate";

import { CiWarning } from "react-icons/ci";
import { StatusApprove } from "@/app/db/option";
import { UsersType } from "@/interfaces/User";
import { ProjectType } from "@/interfaces/Project";

const FormAdminCreateSwapDate: React.FC = () => {
  const { data: session } = useSession();
  const userCreate = session?.user?.id;

  const { data: getProjects } = useProjects();
  const projects = getProjects?.totalProject;

  const { data: getUsers } = useUsers();
  const users = getUsers?.totalUsers;

  const { trigger, isMutating } = useAdminCreateSwapDate();

  const { data: getSwapLast } = useSwapDateLast();
  const lastSwapDate = getSwapLast?.lastSwapDate;
  const id = lastSwapDate?.id + 1;

  const [employee, setEmployee] = useState("");
  const [attachFile, setAttachFile] = useState("");
  const [projectAction, setProjectAction] = useState<string | undefined>("");
  const [actionDate, setActionDate] = useState<number[]>([]);
  const [swapDate, setSwapDate] = useState<number[]>([]);
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const format = "MM/DD/YYYY";

  const [showError, setShowError] = useState("");

  const handleActionDateChange = (dates: DateObject[]) => {
    const convertUnix: number[] = dates?.map((date: any) => date.unix * 1000);
    setActionDate(convertUnix);
  };

  const handleSwapDateChange = (dates: DateObject[]) => {
    const convertUnix: number[] = dates?.map((date: any) => date.unix * 1000);
    setSwapDate(convertUnix);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!employee || !projectAction || !actionDate) {
      setShowError("Plaese enter request data...");
      return;
    }
    trigger({
      id,
      employee,
      projectAction,
      actionDate,
      swapDate: swapDate.length > 0 ? swapDate : null,
      attachFile,
      status,
      remark,
      userCreate,
    });
  };
  return (
    <>
      <div>
        {showError && (
          <p className="border text-red-500 py-3 px-3 rounded-md text-sm flex items-center border-l-red-500 border-l-4">
            <CiWarning
              size={30}
              className="bg-red-500 text-white rounded-full p-1 h-6 w-6"
            />{" "}
            <span className="mx-2">{showError}</span>
          </p>
        )}
      </div>
      <form action="" className="grid gap-5 mt-3" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="" className="text-xs">
            Selete user for request
          </label>
          <select
            title="employee"
            onChange={(e) => setEmployee(e.target.value)}
            name="employee"
            id="employee"
            className="border py-5 px-5 w-full rounded-md  mt-1 text-xs"
          >
            <option value="null">- Selete user name request -</option>
            {users?.map((users: UsersType, index: number) => (
              <option value={users?._id} key={index}>
                TIME-{users?.userCode} {users?.nameTh}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subject" className="text-xs">
            Project
            <input
              onChange={(e) => setProjectAction(e.target.value)}
              list="projectList"
              name="project"
              placeholder="Enter project..."
              className="border py-5 px-5 w-full rounded-md  mt-1 text-xs"
            />
          </label>
          <datalist
            id="projectList"
            className=" bg-[#F5F6FA] py-5 px-5 w-full rounded-md mt-1 text-xs"
          >
            <option value="null">- Selete Project -</option>
            <option value="newProject">New Project</option>
            {projects?.map((project: ProjectType, index: number) => (
              <option
                value={`${project?.projectCode} ${project?.projectEng}`}
                key={index}
              ></option>
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="" className="text-xs">
            Selete action date
          </label>
          <DatePicker
            style={{
              width: "100%",
              border: "solid 0.5px rgb(209 213 219)",
              padding: "28px",
              fontSize: "12px",
            }}
            containerStyle={{
              width: "100%",
            }}
            name="issueDate"
            calendarPosition="bottom-center"
            sort
            multiple
            format={format}
            value={actionDate}
            onChange={handleActionDateChange}
            placeholder="Please selete date..."
          />
        </div>
        <div>
          <label htmlFor="" className="text-xs">
            Selete swap date
          </label>
          <DatePicker
            style={{
              width: "100%",
              border: "solid 0.5px rgb(209 213 219)",
              padding: "28px",
              fontSize: "12px",
            }}
            containerStyle={{
              width: "100%",
            }}
            name="issueDate"
            calendarPosition="bottom-center"
            sort
            multiple
            format={format}
            value={swapDate}
            onChange={handleSwapDateChange}
            placeholder="Please selete date..."
          />
        </div>
        <div>
          <label htmlFor="status" className="text-xs">
            Status
          </label>
          <select
            onChange={(e) => setStatus(e.target.value)}
            name="status"
            id="status"
            className="border py-5 px-5 w-full rounded-md  mt-1 text-xs"
          >
            <option value="null">- Selete status -</option>
            {StatusApprove.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="attachFile" className="text-xs">
            Link file request (oneDrive)
          </label>
          <input
            onChange={(e) => setAttachFile(e.target.value)}
            type="text"
            name="attachFile"
            id="attachFile"
            placeholder="Enter link here..."
            className="border py-5 px-5 w-full rounded-md  mt-1 text-xs"
          />
        </div>
        <div>
          <label htmlFor="remark" className="text-xs">
            Remark
          </label>
          <input
            onChange={(e) => setRemark(e.target.value)}
            type="text"
            name="remark"
            id="remark"
            placeholder="Enter remark here..."
            className="border py-5 px-5 w-full rounded-md  mt-1 text-xs"
          />
        </div>
        <BtnFormCreate isMutating={isMutating} />
      </form>
    </>
  );
};

export default FormAdminCreateSwapDate;
