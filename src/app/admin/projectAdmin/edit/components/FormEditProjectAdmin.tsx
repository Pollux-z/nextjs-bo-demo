"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CiCircleAlert } from "react-icons/ci";
import { Status } from "@/app/db/option";
import { useProject, useUsers } from "@/app/services/queries";
import {
  useUpdateProject,
  useUpdateProjectAdmin,
} from "@/app/services/mutations";

import { CiFileOn } from "react-icons/ci";
import { ProjectType } from "@/interfaces/Project";
import { UsersType } from "@/interfaces/User";
import InputEditProject from "../../components/InputEditProject";
import FileEditProject from "@/app/users/project/edit/[id]/components/FileEditProject";
import FinanceProject from "@/app/users/project/edit/[id]/components/FinanceProject";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import InputBilabilityProject from "@/app/users/project/components/InputBilabilityProject";

type EditProjectType = {
  id: string;
};

const FormEditProjectAdmin: React.FC<EditProjectType> = ({ id }) => {
  const { data: session } = useSession();
  const sessionRole = session?.user?.role;
  const { data: getProject, isLoading, isValidating, error } = useProject(id);
  const project = getProject?.project;

  console.log(project);
  console.log(project?.billabilityProjects);

  const { trigger: updateProject, isMutating } = useUpdateProjectAdmin(id);

  const [projectCode, setProjectCode] = useState("");
  const [projectEng, setProjectEng] = useState("");
  const [projectTh, setProjectTh] = useState("");
  const [contactCode, setContactCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerTax, setCustomerTax] = useState("");
  const [value, setValue] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [startDateContact, setStartDateContact] = useState("");
  const [endDateContact, setEndDateContact] = useState("");
  const [letterGuarantee, setLetterGuarantee] = useState("");
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  
  const [valuePeriod, setValuePeriod] = useState([]);
  const [billabilityProjects, setBillabilityProjects] = useState(project?.billabilityProjects);

  console.log("state billability", billabilityProjects);


  const { data: getUsers } = useUsers();
  const users: UsersType[] = getUsers?.totalUsers;

  const [showFile, setShowfile] = useState({
    fileContact1: true,
    fileContact2: true,
    fileContact3: true,
    fileProjectPowerpoint: true,
    fileProjectWord: true,
    fileCertificate: true,
  });

  const [data, setData] = useState<any>();

  const fileData = data?.fileContact1;
  const valuePeriodData = data?.valuePeriod;
  const billabilityProjectData = data?.billabilityProject;

  const [fileChange, setFileChange] = useState();

 

  const handleOnChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      setData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [valuePeriodData]
  );

  const handleChage = (setState: React.Dispatch<React.SetStateAction<any>>, value: any) => {
    console.log(value)
    setState(value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    updateProject({
      projectCode,
      projectEng,
      projectTh,
      contactCode,
      customerName,
      customerAddress,
      customerTax,
      value,
      valuePeriod,
      billabilityProjects,
      projectOwner,
      projectManager,
      startDateContact,
      endDateContact,
      letterGuarantee,
      status,
      remark,
      userCreate: data?.userCreate,
    });
  };

  useEffect(() => {
    if (project) {
      setProjectCode(project?.projectCode);
      setProjectEng(project?.projectEng);
      setProjectTh(project?.projectTh);
      setContactCode(project?.contactCode);
      setCustomerName(project?.customerName);
      setCustomerAddress(project?.customerAddress);
      setCustomerTax(project?.customerTax);
      setValue(project?.value);
      setValuePeriod(project?.valuePeriod);
      setProjectOwner(project?.projectOwner);
      setProjectManager(project?.projectManager);
      setStartDateContact(project?.startDateContact);
      setEndDateContact(project?.endDateContact);
      setLetterGuarantee(project?.letterGuarantee);
      setStatus(project?.status);
      setRemark(project?.remark);
    }
  }, [project]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="bg-white py-5 px-10 w-full mt-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
              <CiCircleAlert className="" />
              Projects
            </h3>
            <div className="grid grid-cols-2 mt-3 gap-4">
              <div>
                <InputEditProject
                  value={projectCode || ""}
                  name="projectCode"
                  labelText={`Project Code`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChage(setProjectCode, e.target.value)}
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <InputEditProject
                  value={projectEng || ""}
                  name="projectEng"
                  labelText={`Project Name (Eng)`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChage(setProjectEng, e.target.value)}
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <InputEditProject
                  value={projectTh || ""}
                  name="projectTh"
                  labelText={`Project Name (TH)`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChage(setProjectTh, e.target.value)}
                  type="text"
                  placeholder=""
                />
              </div>

              <div>
                <label htmlFor="" className="text-xs">
                  PM
                </label>
                <select
                  title="projectManager"
                  value={projectManager || ""}
                  name="projectManager"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChage(setProjectManager, e.target.value)}
                  id="pm"
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  <option value="none">None</option>
                  {users?.map((user, index) => (
                    <option key={index} value={user?._id}>
                      TIME-{user.userCode} {user?.nameTh} ({user?.nickNameTh})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="" className="text-xs">
                  Team Lead
                </label>
                <select
                  title="projectOwner"
                  value={projectOwner || ""}
                  name="projectOwner"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChage(setProjectOwner, e.target.value)}
                  id="teamLead"
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  <option value="none">None</option>
                  {users?.map((user, index) => (
                    <option key={index} value={user?._id}>
                      TIME-{user.userCode} {user?.nameTh} ({user?.nickNameTh})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="" className="text-xs">
                  สถานะ
                </label>
                <select
                  title="status"
                  value={status || ""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChage(setStatus, e.target.value)}
                  name="status"
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  <option value="">{`- Please select status -`}</option>
                  {Status.map((val, index) => (
                    <option key={index} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          
          <div className="mt-5">
            <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
              <CiCircleAlert className="" />
              Customer
            </h3>
            <div className="grid grid-cols-2 mt-3 gap-4">
              <div>
                <InputEditProject
                  value={customerName || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChage(setCustomerName, e.target.value)}
                  name="customerName"
                  labelText={`ชื่อหน่วยงานผู้ว่าจ้าง`}
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <InputEditProject
                  value={contactCode || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChage(setContactCode, e.target.value)}
                  name="contactCode"
                  labelText={`เลขที่สัญญา`}
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <InputEditProject
                  value={customerAddress || ""}
                  name="customerAddress"
                  labelText={`ที่อยู่`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChage(setCustomerAddress, e.target.value)}
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <InputEditProject
                  value={customerTax || ""}
                  name="customerTax"
                  labelText={`เลขที่ผู้เสียภาษี`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChage(setCustomerTax, e.target.value)}
                  type="text"
                  placeholder=""
                />
              </div>

              <div>
                <InputEditProject
                  value={startDateContact || ""}
                  name="startDateContact"
                  labelText={`วันเริ่มสัญญา`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChage(setStartDateContact, e.target.value)}
                  placeholder="ระบุวันเริ่มสัญญา"
                  type="date"
                />
              </div>
              <div>
                <InputEditProject
                  value={endDateContact || ""}
                  name="endDateContact"
                  labelText={`วันสิ้นสุดสัญญา`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChage(setEndDateContact, e.target.value)}
                  placeholder="ระบุวันสิ้นสุดสัญญา"
                  type="date"
                />
              </div>
              <div>
                <label htmlFor="" className="text-xs">
                  หนังสือค้ำประกัน
                </label>
                <select
                  title="letterGuarantee"
                  value={letterGuarantee || "none"}
                  name="letterGuarantee"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChage(setLetterGuarantee, e.target.value)}
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  <option value="none">{`- Please select -`}</option>
                  <option value="option1">หลักประกันสัญญา</option>
                  <option value="option2">ค่าที่ปรึกษาล่วงหน้า</option>
                </select>
              </div>

              
            </div>

            <div className="mt-5">
              <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
                <CiCircleAlert className="" />
                Finance
              </h3>
              <div className="mt-5">
                <div className="mt-1">
                  <FinanceProject
                    setData={setValuePeriod}
                    data={project?.valuePeriod}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
                <CiCircleAlert className="" />
                Billability
              </h3>
              <div className="mt-5">
                <div className="mt-1">
                  <InputBilabilityProject
                    setData={setBillabilityProjects}
                    data={project?.billabilityProjects}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
                <CiCircleAlert className="" />
                File from OneDrive or link file
                <a
                  href="https://support.microsoft.com/en-us/office/share-onedrive-files-and-folders-9fcc2f7d-de0c-4cec-93b0-a82024800c07"
                  target="blank"
                  className="text-xs text-orange-500"
                >
                  (How to)
                </a>
              </h3>

              {sessionRole === "Admin" ||
              sessionRole === "Co-Admin" ||
              sessionRole === "Co-Project" ? (
                <div className="mt-3">
                  <h5 className="text-sm mb-2">แนบไฟล์สัญญา</h5>
                  <FileEditProject setData={setFileChange} data={fileData} />
                </div>
              ) : (
                <div className="mt-3 bg-red-50 p-3 rounded-md min-h-52 flex items-center justify-center">
                  <div className="">
                    <p className="text-center py-3 px-3 rounded-md  bg-red-400 text-white">
                      Your access denied, Please contact admin if you want this
                      file.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-5">
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
          </div>
        </form>
      </div>
    </>
  );
};

export default FormEditProjectAdmin;
