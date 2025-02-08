"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CiCircleAlert } from "react-icons/ci";
import { Status } from "@/app/db/option";
import { useProject, useUsers } from "@/app/services/queries";

import { CiFileOn } from "react-icons/ci";
import { useUpdateProject } from "@/app/services/mutations";
import FileProject from "../create/components/FileProject";
import FileEditProject from "../edit/[id]/components/FileEditProject";
import FinanceProject from "../edit/[id]/components/FinanceProject";

const InputFunc = ({ labelText, onChange, placeholder, type, name, value }) => {
  return (
    <div className="max-h-20 min-h-20">
      <label htmlFor="nameTh" className="text-xs">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        name={name}
        aria-label={name}
        className=" border py-5 px-5 w-full rounded-md mt-1 text-xs"
      />
    </div>
  );
};

function FormEditProject({ project, id }) {
  const route = useRouter();
  const { data: projectData } = useProject(id);
  const getProjects = projectData?.post;

  const { trigger: updateProject, isMutating } = useUpdateProject(id);

  // * Get file project for check have data
  const fileContact1Data = getProjects?.fileContact1;
  const fileContact2Data = getProjects?.fileContact2;
  const fileContact3Data = getProjects?.fileContact3;
  const fileCertData = getProjects?.fileCertificate;
  const fileWordData = getProjects?.fileProjectWord;
  const filePowerPointData = getProjects?.fileProjectPowerpoint;

  const { data: getUsers } = useUsers();
  const users = getUsers?.totalUsers;

  const [showFile, setShowfile] = useState({
    fileContact1: true,
    fileContact2: true,
    fileContact3: true,
    fileProjectPowerpoint: true,
    fileProjectWord: true,
    fileCertificate: true,
  });

  const [data, setData] = useState(getProjects);
  const fileData = data.fileContact1;
  const valuePeriodData = data?.valuePeriod
  const [valuePeriodChange, setValuePeriodChange] = useState();
  const [fileChange, setFileChange] = useState();

  const handleOnChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
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
                <InputFunc
                  value={data?.projectEng}
                  name="projectEng"
                  labelText={`Project Name (Eng)`}
                  onChange={handleOnChange}
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  value={data?.projectTh}
                  name="projectTh"
                  labelText={`Project Name (TH)`}
                  onChange={handleOnChange}
                  type="text"
                />
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
                <InputFunc
                  value={data?.customerName}
                  onChange={handleOnChange}
                  name="customerName"
                  labelText={`ชื่อหน่วยงานผู้ว่าจ้าง`}
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  value={data?.contactCode}
                  onChange={handleOnChange}
                  name="contactCode"
                  labelText={`เลขที่สัญญา`}
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  value={data?.customerAddress}
                  name="customerAddress"
                  labelText={`ที่อยู่`}
                  onChange={handleOnChange}
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  value={data?.customerTax}
                  name="customerTax"
                  labelText={`เลขที่ผู้เสียภาษี`}
                  onChange={handleOnChange}
                  type="text"
                />
              </div>
              
              <div>
                <label htmlFor="" className="text-xs">
                  PM
                </label>
                <select
                  value={data?.projectManager}
                  name="projectManager"
                  onChange={handleOnChange}
                  id="pm"
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  <option value="none">None</option>
                  {users?.map((user, index) => (
                    <option key={index} value={user?._id}>
                      TIME-{user.userCode} {user?.nameTh}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <InputFunc
                  value={data?.startDateContact}
                  name="startDateContact"
                  labelText={`วันเริ่มสัญญา`}
                  onChange={handleOnChange}
                  placeholder="ระบุวันเริ่มสัญญา"
                  type="date"
                />
              </div>
              <div>
                <InputFunc
                  value={data?.endDateContact}
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
              <div>
                <label htmlFor="" className="text-xs">
                  สถานะ
                </label>
                <select
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
           

            <div className="mt-5">
              <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
                <CiCircleAlert className="" />
                Finance
              </h3>
              <div className="mt-5">
            
                <div className="mt-1">
                  <FinanceProject setData={setValuePeriodChange} data={valuePeriodData}/>
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
              <div className="mt-3">
                <h5 className="text-sm mb-2">แนบไฟล์สัญญา</h5>
                <FileEditProject setData={setFileChange} data={fileData} />

              </div>
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
}

export default FormEditProject;
