"use client";

import { useSession } from "next-auth/react";
import React, { useState, useCallback, useEffect } from "react";
import {
  useProjects,
  useSwapDateLast,
  useUsers,
  useSwapDate,
} from "@/app/services/queries";
import DatePicker, { DateObject } from "react-multi-date-picker";
import {
  useAdminUpdateSwapDate,
  useCreateSwapDate,
  useUpdateSwapDate,
} from "@/app/services/mutations";
import BtnFormCreate from "@/app/components/button/BtnFormCreate";

import { CiWarning } from "react-icons/ci";
import { StatusApprove } from "@/app/db/option";
import FilterUser from "@/app/components/FilterUser";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import { ProjectType } from "@/interfaces/Project";

export default function FormAdminEditSwapDate({ id }: { id: string }) {
  const { data: getSwapDate, isLoading, isValidating, error } = useSwapDate(id);
  const swapDate = getSwapDate?.swapDate;

  const [editData, setEditData] = useState();
  const [editProjectAction, setEditProjectAction] = useState("");
  const [editActionDate, setEditActionDate] = useState<number[]>([]);
  const [editSwapDate, setEditSwapDate] = useState<number[]>([]);
  const [editAttachFile, setEditAttachFile] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editRemark, setEditRemark] = useState("");

  const { data: getProjects } = useProjects();
  const projects = getProjects?.totalProject;

  const { trigger, isMutating } = useAdminUpdateSwapDate(id);

  const format = "MM/DD/YYYY";

  const handleActionDateChange = (dates: DateObject[]) => {
    const convertUnix: number[] = dates?.map((date: any) => date.unix * 1000);
    setEditActionDate(convertUnix);
  };

  const handleSwapDateChange = (dates: DateObject[]) => {
    const convertUnix: number[] = dates?.map((date: any) => date.unix * 1000);
    setEditSwapDate(convertUnix);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger({
      projectAction: editProjectAction,
      status: editStatus,
      remark: editRemark,
      actionDate: editActionDate,
      swapDate: editSwapDate,
      attachFile: editAttachFile,
    });
  };
  useEffect(() => {
    if (swapDate) {
      setEditData(swapDate);
      setEditProjectAction(swapDate?.projectAction);
      setEditActionDate(swapDate?.actionDate);
      setEditSwapDate(swapDate?.swapDate);
      setEditStatus(swapDate?.status);
      setEditRemark(swapDate?.remark);
      setEditAttachFile(swapDate?.attachFile);
    }
  }, [swapDate]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <>
      <p className="text-sm font-semibold border-l-2 px-2 border-purple-500">
        <FilterUser userData={swapDate?.employee ? swapDate?.employee : ""} />{" "}
      </p>
      <form action="" className="grid gap-5 mt-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject" className="text-xs">
            Project
            <input
              onChange={(e) => setEditProjectAction(e.target.value)}
              list="projectList"
              name="project"
              placeholder={editProjectAction}
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
            name="editActionDate"
            calendarPosition="bottom-center"
            sort
            multiple
            format={format}
            value={editActionDate}
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
            name="swapDate"
            calendarPosition="bottom-center"
            sort
            multiple
            format={format}
            value={editSwapDate}
            onChange={handleSwapDateChange}
            placeholder="Please selete date..."
          />
        </div>
        <div>
          <label htmlFor="status" className="text-xs">
            Status
          </label>
          <select
            onChange={(e) => setEditStatus(e.target.value)}
            value={editStatus}
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
            onChange={(e) => setEditAttachFile(e.target.value)}
            value={editAttachFile}
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
            onChange={(e) => setEditRemark(e.target.value)}
            value={editRemark}
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
}
