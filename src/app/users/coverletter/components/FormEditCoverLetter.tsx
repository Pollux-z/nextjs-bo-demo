"use client";

import { useUpdateCoverLetter } from "@/app/services/mutations";
import { useCoverLetter, useProjects } from "@/app/services/queries";
import React, { useCallback, useState } from "react";

const FormEditCoverLetter: React.FC<{ id: string }> = ({ id }) => {
  const { data: getCoverLeter } = useCoverLetter(id);
  const coverletter = getCoverLeter?.post;

  const { trigger: updateCoverletter, isMutating } = useUpdateCoverLetter(id);

  const { data: getProject } = useProjects();
  const projects = getProject?.totalProject;

  const [data, setData] = useState({
    subject: "",
    project: "",
    issueDate: "",
    remark: "",
  });

  const [editData, setEditData] = useState(coverletter);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCoverletter({
      // subject: editData.subject,
      // project: editData.project,
      // issueDate:  editData.issueDate,
      // remark: editData.remark
    });
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <label htmlFor="subject" className="text-xs">
            Subject
          </label>
          <input
            value={coverletter?.subject}
            onChange={handleChange}
            type="text"
            className=" bg-[#F5F6FA] py-5 px-5 w-full rounded-md  mt-1 text-xs"
            name="subject"
          />
        </div>
        <div>
          <label htmlFor="subject" className="text-xs">
            Project
            <input
              value={coverletter?.project}
              list="projectList"
              name="project"
              onChange={handleChange}
              placeholder="Enter project..."
              className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md mt-1 text-xs"
            />
          </label>

          <datalist
            id="projectList"
            className=" bg-[#F5F6FA] py-5 px-5 w-full rounded-md mt-1 text-xs"
          >
            <option value="null">- Selete Project -</option>
            <option value="newProject">New Project</option>
            {projects?.map((val, index) => (
              <option
                value={`${val?.projectCode} ${val?.projectEng}`}
                key={index}
              ></option>
            ))}
          </datalist>
        </div>
        <div className="w-72">
          <label htmlFor="subject" className="text-xs">
            Date Issue
          </label>
          <input
            value={coverletter?.issueDate}
            onChange={handleChange}
            type="date"
            className=" bg-[#F5F6FA] py-5 px-5 w-full rounded-md mt-1 text-xs"
            name="issueDate"
          />
        </div>
        <div>
          <label htmlFor="subject" className="text-xs">
            Remark
          </label>
          <input
            value={coverletter?.remark}
            onChange={handleChange}
            type="text"
            placeholder="Remark"
            className=" bg-[#F5F6FA] py-5 px-5 w-full rounded-md mt-1 text-xs"
            name="remark"
          />
        </div>

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
      </form> */}
    </>
  );
}

export default FormEditCoverLetter;
