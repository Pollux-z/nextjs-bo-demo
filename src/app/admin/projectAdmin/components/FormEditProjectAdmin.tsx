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
import InputEditProject from "./InputEditProject";
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
  const { data: projectData, isLoading, isValidating, error } = useProject(id);
  const getProjects = projectData?.project;

  console.log(getProjects)

  const { trigger: updateProject, isMutating } = useUpdateProjectAdmin(id);

  // * Get file project for check have data
  const fileContact1Data = getProjects?.fileContact1;
  const fileContact2Data = getProjects?.fileContact2;
  const fileContact3Data = getProjects?.fileContact3;
  const fileCertData = getProjects?.fileCertificate;
  const fileWordData = getProjects?.fileProjectWord;
  const filePowerPointData = getProjects?.fileProjectPowerpoint;

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
  const [valuePeriodChange, setValuePeriodChange] = useState([]);
  const [billabilityProjectChange, SetBillabilityProjectChange] = useState([]);
  const [fileChange, setFileChange] = useState();

  useEffect(() => {
    if (projectData) {
      setData(projectData?.post || {});
    }
  }, [projectData]);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    updateProject({
      projectCode: data?.projectCode,
      projectEng: data?.projectEng,
      projectTh: data?.projectTh,
      contactCode: data?.contactCode,
      customerName: data?.customerName,
      customerAddress: data?.customerAddress,
      customerTax: data?.customerTax,
      value: data?.value,
      valuePeriod: valuePeriodChange,
      billabilityProject: billabilityProjectChange,
      projectOwner: data?.projectOwner,
      projectManager: data?.projectManager,
      startDateContact: data?.startDateContact,
      endDateContact: data?.endDateContact,
      letterGuarantee: data?.letterGuarantee,
      status: data?.status,
      bankGuaranteeSend: data?.bankGuaranteeSend,
      bankGuaranteeReceive: data?.bankGuaranteeReceive,
      latterGuaranteeSend: data?.latterGuaranteeSend,
      letterGuaranteeReceive: data?.letterGuaranteeReceive,
      refund: data?.refund,
      pdmoBranch: data?.pdmoBranch,
      expert: data?.expert,
      remark: data?.remark,
      projectTarget: data?.projectTarget,
      projectScope: data?.projectScope,
      fileContact1: fileChange,
      fileContact2: data?.fileContact2,
      fileContact3: data?.fileContact3,
      fileCertificate: data?.fileCertificate,
      fileProjectWord: data?.fileProjectWord,
      fileProjectPowerpoint: data?.fileProjectPowerpoint,
      userCreate: data?.userCreate,
    });
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  if (!valuePeriodData) return;

  return (
    <>
      <div className="bg-white py-5 px-10 w-full mt-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
              <CiCircleAlert className="" />
              Projectss
            </h3>
            <div className="grid grid-cols-2 mt-3 gap-4">
              <div>
                <InputEditProject
                  value={data?.projectCode || ""}
                  name="projectCode"
                  labelText={`Project Code`}
                  onChange={handleOnChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <InputEditProject
                  value={data?.projectEng || ""}
                  name="projectEng"
                  labelText={`Project Name (Eng)`}
                  onChange={handleOnChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <InputEditProject
                  value={data?.projectTh || ""}
                  name="projectTh"
                  labelText={`Project Name (TH)`}
                  onChange={handleOnChange}
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
                  value={data?.projectManager}
                  name="projectManager"
                  onChange={handleOnChange}
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
                  value={data?.projectOwner}
                  name="projectOwner"
                  onChange={handleOnChange}
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
                  value={data?.status}
                  onChange={handleOnChange}
                  name="status"
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  {Status.map((val, index) => (
                    <option key={index} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Session Customer Project */}
          <div className="mt-5">
            <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
              <CiCircleAlert className="" />
              Customer
            </h3>
            <div className="grid grid-cols-2 mt-3 gap-4">
              <div>
                <InputEditProject
                  value={data?.customerName || ""}
                  onChange={handleOnChange}
                  name="customerName"
                  labelText={`ชื่อหน่วยงานผู้ว่าจ้าง`}
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <InputEditProject
                  value={data?.contactCode || ""}
                  onChange={handleOnChange}
                  name="contactCode"
                  labelText={`เลขที่สัญญา`}
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <InputEditProject
                  value={data?.customerAddress || ""}
                  name="customerAddress"
                  labelText={`ที่อยู่`}
                  onChange={handleOnChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <InputEditProject
                  value={data?.customerTax || ""}
                  name="customerTax"
                  labelText={`เลขที่ผู้เสียภาษี`}
                  onChange={handleOnChange}
                  type="text"
                  placeholder=""
                />
              </div>

              <div>
                <InputEditProject
                  value={data?.startDateContact || ""}
                  name="startDateContact"
                  labelText={`วันเริ่มสัญญา`}
                  onChange={handleOnChange}
                  placeholder="ระบุวันเริ่มสัญญา"
                  type="date"
                />
              </div>
              <div>
                <InputEditProject
                  value={data?.endDateContact || ""}
                  name="endDateContact"
                  labelText={`วันสิ้นสุดสัญญา`}
                  onChange={handleOnChange}
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
                  value={data?.letterGuarantee}
                  name="letterGuarantee"
                  onChange={handleOnChange}
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  <option value="none">{`- Please selete -`}</option>
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
                    setData={setValuePeriodChange}
                    data={valuePeriodData}
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
                    setData={SetBillabilityProjectChange}
                    data={billabilityProjectData}
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
