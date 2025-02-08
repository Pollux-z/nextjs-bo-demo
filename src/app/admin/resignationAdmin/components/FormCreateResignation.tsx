"use client";

import {
  useProjects,
  useUsers,
  useUsersTeamConsultant,
} from "@/app/services/queries";
import { ProjectType } from "@/interfaces/Project";
import { UsersType } from "@/interfaces/User";
import React, { useState } from "react";
import Select from "react-select";
// import { useCreateResignation } from "@/app/services/mutations";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { StatusResign } from "@/app/db/option";
import { useCreateResignation } from "@/app/services/mutations";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { CiCalendar } from "react-icons/ci";
import DatePickerInput from "../../components/DatePickerInput";

type selectedOptions = {
  value: string;
  label: string;
};

function FormCreateResignation() {
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const sessionUserName = sessionUser?.nameEng;
  const sessionUserTitle = sessionUser?.employeeTitle;
  const sessionUserId = sessionUser?.id;

  const [issueDate, setIssueDate] = useState<DateObject | null>(null);

  console.log(issueDate)
  const [selectedStatus, setSelectedStatus] = React.useState<
    selectedOptions | undefined
  >({
    value: "Pending",
    label: "Pending",
  });
  const [note, setNote] = React.useState("");

  const format = "MM/DD/YYYY";

  const { trigger: createResignation } = useCreateResignation();

  const optionStatus = StatusResign.map((status) => ({
    value: status,
    label: status,
  }));

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createResignation({
      userRequest: sessionUserId,
      effectiveDate: issueDate,
      note,
      status: selectedStatus?.value,
      userCreate: sessionUserId,
    });
  };

  return (
    <div>
      <p className="border-l-2 border-purple-500 px-2 font-semibold">
        Create Resignation
      </p>
     
      <div className="mt-4 ">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="">
              <label htmlFor="" className="text-sm">
                User Name
              </label>
              <input
                disabled
                type="text"
                className="text-sm mt-2 w-full border border-gray-300 rounded-md p-3"
                placeholder="Please input title..."
                value={sessionUserName ?? ""}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm">
                Title User
              </label>
              <input
                disabled
                type="text"
                className="text-sm mt-2 w-full border border-gray-300 rounded-md p-3"
                placeholder="Please input title..."
                value={sessionUserTitle ?? ""}
              />
            </div>

            <div className="">
              <label htmlFor="" className="text-sm">
                Effective Date
              </label>
              <div className="relative w-full text-sm mt-2">
                <DatePickerInput issueDate={issueDate} setIssueDate={setIssueDate} format={format} />
              </div>
            </div>

            <div>
              <label htmlFor="" className="text-sm">
                Status
              </label>
              <Select
                value={selectedStatus}
                onChange={(selected) => {
                  setSelectedStatus(selected || undefined);
                }}
                isClearable
                isSearchable
                name="color"
                options={optionStatus}
                className="text-sm mt-2"
                placeholder="Select status"
                styles={{
                  control: (styles) => ({
                    ...styles,
                    height: "45px",
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }),
                }}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="" className="text-sm">
                Notes <span className="text-xs">(optional)</span>
              </label>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type a description or add a note here..."
                className="text-sm mt-2 h-40 w-full border border-gray-300 rounded-md p-3 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreateResignation;
