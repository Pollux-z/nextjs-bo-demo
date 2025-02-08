import React, { useState } from "react";
import { useLastCoverLetters, useProjects } from "@/app/services/queries";
import { useSession } from "next-auth/react";
import { useCreateCoverletter } from "@/app/services/mutations";
import Loading from "@/app/loading";
import { ProjectType } from "@/interfaces/Project";


export const FormCreateCoverletter: React.FC = () => {
  const { data: session } = useSession();
  const userCreate = session?.user?.nameEng;

  const { trigger, isMutating } = useCreateCoverletter();

  const { data: getProjects } = useProjects();
  const projects: ProjectType[] = getProjects?.totalProject;

  const {
    data: idCoverletter,
    isLoading,
    isValidating,
    error,
  } = useLastCoverLetters();
  const lastCoverletterData = idCoverletter?.lastCoverletter;
  const idLastCoverletter = lastCoverletterData?.id;
  const id = idLastCoverletter ? idLastCoverletter + 1 : 1;

  const dates = new Date();
  const date = dates.getDate();
  const month = dates.getMonth();
  const year = dates.getFullYear();
  const nowDate = `${year}-0${month + 1}-${date < 10 ? `0${date}` : date}`;

  const [dataCoverletter, setDataCoverletter] = useState({
    subject: "",
    project: "",
    issueDate: nowDate,
    remark: "",
  });

  const [success, setSuccess] = useState("");
  const [showError, setShowError] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDataCoverletter({
      ...dataCoverletter,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!dataCoverletter.subject) return setShowError("Please Input subject");

    trigger({
      id,
      subject: dataCoverletter.subject,
      project: dataCoverletter.project,
      issueDate: dataCoverletter.issueDate,
      remark: dataCoverletter.remark,
      userCreate,
    });
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <label htmlFor="subject" className="text-xs">
            Subject
          </label>
          <input
            value={dataCoverletter.subject}
            onChange={handleChange}
            type="text"
            placeholder="Subject"
            className=" border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs"
            name="subject"
          />
        </div>

        <div>
          <label htmlFor="subject" className="text-xs">
            Project
            <input
              list="projectList"
              name="project"
              onChange={handleChange}
              placeholder="Enter project..."
              className="border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs"
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
            title="Date Issue"
            value={dataCoverletter.issueDate}
            onChange={handleChange}
            type="date"
            className=" border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs"
            name="issueDate"
          />
        </div>
        <div>
          <label htmlFor="subject" className="text-xs">
            Remark
          </label>
          <input
            value={dataCoverletter.remark}
            onChange={handleChange}
            type="text"
            placeholder="Remark"
            className=" border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs"
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
      </form>
    </>
  );
};
