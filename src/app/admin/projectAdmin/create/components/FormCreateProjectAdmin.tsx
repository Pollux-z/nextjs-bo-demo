"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CiCircleAlert } from "react-icons/ci";
import { Status } from "@/app/db/option";
import { useProjectLast, useUsers } from "@/app/services/queries";

import { CiSquareQuestion } from "react-icons/ci";
import InputCreateProject from "../../components/InputCreateProject";
import {
  useCreateProject,
  useCreateProjectAdmin,
} from "@/app/services/mutations";

import { UsersType } from "@/interfaces/User";
import FinanceProject from "@/app/users/project/edit/[id]/components/FinanceProject";
import FileProject from "@/app/users/project/create/components/FileProject";
import InputBilabilityProject from "@/app/users/project/components/InputBilabilityProject";

import ClipLoader from "react-spinners/ClipLoader";

const getIdCodeProject = (projectCode: string) => {
  const idCodeYear = projectCode?.slice(0, 4);
  const currentYear = new Date().toDateString().split(" ")[3];
  const nextYear = Number(currentYear) + 1;
  const projectCodeNumber = Number(projectCode?.slice(4));
  const formattedProjectId = String(projectCodeNumber + 1).padStart(2, "0");

  if (idCodeYear === currentYear) {
    return `${currentYear}${formattedProjectId}` || "000";
  } else {
    return `${nextYear}0000` || "000";
  }
};

const FormCreateProjectAdmin: React.FC = () => {
  const { data: session } = useSession();
  const userCreate = session?.user?.id;
  const { data: getUsers } = useUsers();
  const users = getUsers?.totalUsers;
  const { data: lastProject } = useProjectLast();
  const getProjectCode = lastProject?.lastProject;

  const idProjectCode = getIdCodeProject(getProjectCode?.projectCode);

  const { trigger, isMutating } = useCreateProjectAdmin();

  const [userData, setUserData] = useState<UsersType[]>([]);

  const [projectCode, setProjectCode] = useState(idProjectCode);

  const [projectEng, setProjectEng] = useState("");
  const [projectTh, setProjectTh] = useState("");
  const [contactCode, setContactCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerTax, setCustomerTax] = useState("");
  const [value, setValue] = useState("");
  const [valuePeriod, setValuePeriod] = useState([]);
  const [projectOwner, setProjectOwner] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [startDateContact, setStartDateContact] = useState("");
  const [endDateContact, setEndDateContact] = useState("");
  const [letterGuarantee, setLetterGuarantee] = useState("");
  const [status, setStatus] = useState("");
  // const [bankGuaranteeSend, setBankGuaranteeSend] = useState("");
  // const [bankGuaranteeReceive, setBankGuaranteeReceive] = useState("");
  // const [latterGuaranteeSend, setLatterGuaranteeSend] = useState("");
  // const [letterGuaranteeReceive, setLetterGuaranteeReceive] = useState("");
  const [refund, setRefund] = useState("");
  const [pdmoBranch, setPdmoBranch] = useState("");
  // const [expert, setExpert] = useState("");
  const [remark, setRemark] = useState("");
  // const [projectTarget, setProjectTarget] = useState("");
  // const [projectScope, setProjectScope] = useState("");
  const [fileContact1, setFileContact1] = useState([]);
  const [billabilityProjects, SetBillabilityProjecs] = useState([]);
  console.log(billabilityProjects);

  useEffect(() => {
    if (getUsers) {
      setUserData(users);
    }
  }, [getUsers]);

  //FIXME: Error when submit form : Error when create ต้องใส่ ProjectCode , projectNameEnd , projectNameTh, pm, TeamLead, สถานะ ทำไม?

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    trigger({
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
      // bankGuaranteeSend,
      // bankGuaranteeReceive,
      // latterGuaranteeSend,
      // letterGuaranteeReceive,
      refund,
      pdmoBranch,
      // expert,
      remark,
      userCreate,
    });
  };

  return (
    <>
      <div className="bg-white py-5 px-10 w-full mt-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
              <CiCircleAlert className="" />
              Project
            </h3>
            <div className="grid grid-cols-2 mt-3 gap-4">
              <div>
                <InputCreateProject
                  value={projectCode}
                  name="projectCode"
                  labelText={`Project Code (Required*)`}
                  onChange={(e: any) => setProjectCode(e.target.value)}
                  placeholder="Enter Project code"
                  type="text"
                />
              </div>
              <div>
                <InputCreateProject
                  value={projectEng}
                  name="projectEng"
                  labelText={`Project name english (Required*)`}
                  onChange={(e: any) => setProjectEng(e.target.value)}
                  placeholder="Enter project name english (required)"
                  type="text"
                />
              </div>
              <div>
                <InputCreateProject
                  value={projectTh}
                  name="projectTh"
                  labelText={`Project Name (TH)`}
                  onChange={(e: any) => setProjectTh(e.target.value)}
                  placeholder="Enter project name (TH)"
                  type="text"
                />
              </div>

              <div>
                <label htmlFor="" className="text-xs">
                  PM
                </label>
                <select
                  title="projectManager"
                  onChange={(e) => setProjectManager(e.target.value)}
                  name="pm"
                  id="pm"
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  <option value="none">None</option>
                  {userData?.map((user, index) => (
                    <option key={index} value={user?.id}>
                      TIME-{user.userCode} {user?.nameTh}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="" className="text-xs">
                  TeamLead
                </label>
                <select
                  title="projectOwner"
                  onChange={(e) => setProjectOwner(e.target.value)}
                  name="teamlead"
                  id="teamlead"
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  <option value="none">None</option>
                  {userData?.map((user, index) => (
                    <option key={index} value={user?.id}>
                      TIME-{user.userCode} {user?.nameTh}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="" className="text-xs">
                  สถานะ <span className="text-red-500">(Required*)</span>
                </label>
                <select
                  title="status"
                  onChange={(e) => setStatus(e.target.value)}
                  name="status"
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  <option value="">{`- Please selete status -`}</option>
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
                <InputCreateProject
                  value={customerName}
                  name="customerName"
                  labelText={`ชื่อหน่วยงานผู้ว่าจ้าง`}
                  onChange={(e: any) => setCustomerName(e.target.value)}
                  placeholder="ระบุชื่อหน่วยงานผู้ว่าจ้าง"
                  type="text"
                />
              </div>
              <div>
                <InputCreateProject
                  value={contactCode}
                  name="contactCode"
                  labelText={`เลขที่สัญญา`}
                  onChange={(e: any) => setContactCode(e.target.value)}
                  placeholder="ระบุเลขที่สัญญา"
                  type="text"
                />
              </div>
              <div>
                <InputCreateProject
                  value={customerAddress}
                  name="customerAddress"
                  labelText={`ที่อยู่`}
                  onChange={(e: any) => setCustomerAddress(e.target.value)}
                  placeholder="ระบุที่อยู่ผู้ว่าจ้าง"
                  type="text"
                />
              </div>
              <div>
                <InputCreateProject
                  value={customerTax}
                  name="customerTax"
                  labelText={`เลขที่ผู้เสียภาษี`}
                  onChange={(e: any) => setCustomerTax(e.target.value)}
                  placeholder="ระบุเลขที่ผู้เสียภาษีผู้ว่าจ้าง"
                  type="text"
                />
              </div>

              <div>
                <InputCreateProject
                  value={startDateContact}
                  name="startDateContact"
                  labelText={`วันเริ่มสัญญา`}
                  onChange={(e: any) => setStartDateContact(e.target.value)}
                  placeholder="ระบุวันเริ่มสัญญา"
                  type="date"
                />
              </div>
              <div>
                <InputCreateProject
                  value={endDateContact}
                  name="endDateContact"
                  labelText={`วันสิ้นสุดสัญญา`}
                  onChange={(e: any) => setEndDateContact(e.target.value)}
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
                  name="letterGuarantee"
                  onChange={(e) => setLetterGuarantee(e.target.value)}
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
                  <FinanceProject setData={setValuePeriod} data={valuePeriod} />
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
                    setData={SetBillabilityProjecs}
                    data={billabilityProjects}
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
              <div className="mt-5">
                <div>
                  <h5 className="text-sm mb-2">แนบไฟล์สัญญา</h5>
                  <FileProject data={fileContact1} setData={setFileContact1} />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <button
              disabled={isMutating}
              type="submit"
              className="bg-[#4880FF] py-2 w-52 rounded-md text-white shadow-md text-sm"
            >
              {isMutating ? (
                <ClipLoader size={20} color="#36d7b7" />
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormCreateProjectAdmin;
