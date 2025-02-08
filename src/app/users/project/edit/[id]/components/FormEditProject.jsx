"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { CiCircleAlert } from "react-icons/ci";
import { Status } from "@/app/db/option";
import { useProjectLast, useUsers } from "@/app/services/queries";

import { CiSquareQuestion } from "react-icons/ci";
import { useCreateProject } from "@/app/services/mutations";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import AddFile from "./AddFile";
import FileProject from "./FileEditProject";
import FileEditProject from "./FileEditProject";
import FinanceProject from "./FinanceProject";


const InputFunc = ({ labelText, onChange, placeholder, type, name }) => {
  return (
    <>
      <label htmlFor="nameTh" className="text-xs">
        {labelText}
      </label>
      <input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        name={name}
        aria-label={name}
        className=" border  py-5 px-5 w-full rounded-md mt-1 text-xs"
      />
    </>
  );
};



function FormEditProject() {
  const { data: session } = useSession();

  const userCreate = session?.user?.id;
  const {
    data: lastProject,
    isLoading,
    isValidating,
    error,
  } = useProjectLast();
  const getProjectCode = lastProject?.lastProject;
  const projectCodeNumber = Number(getProjectCode?.projectCode);
  const projectCode = projectCodeNumber + 1;

  const { trigger, isMutating } = useCreateProject();
  const { data: users } = useUsers();
  const getUsers = users?.totalUsers;

  const [projectEng, setProjectEng] = useState("");
  const [projectTh, setProjectTh] = useState("");
  const [contactCode, setContactCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerTax, setCustomerTax] = useState("");
  const [value, setValue] = useState("");
  const [valuePeriod, setValuePeriod] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [startDateContact, setStartDateContact] = useState("");
  const [endDateContact, setEndDateContact] = useState("");
  const [letterGuarantee, setLetterGuarantee] = useState("");
  const [status, setStatus] = useState("");
  const [bankGuaranteeSend, setBankGuaranteeSend] = useState("");
  const [bankGuaranteeReceive, setBankGuaranteeReceive] = useState("");
  const [latterGuaranteeSend, setLatterGuaranteeSend] = useState("");
  const [letterGuaranteeReceive, setLetterGuaranteeReceive] = useState("");
  const [refund, setRefund] = useState("");
  const [pdmoBranch, setPdmoBranch] = useState("");
  const [expert, setExpert] = useState("");
  const [remark, setRemark] = useState("");
  const [projectTarget, setProjectTarget] = useState("");
  const [projectScope, setProjectScope] = useState("");
  const [fileContact1, setFileContact1] = useState([]);


  const handleSubmit = async (e) => {
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
      projectOwner,
      projectManager,
      startDateContact,
      endDateContact,
      letterGuarantee,
      status,
      bankGuaranteeSend,
      bankGuaranteeReceive,
      latterGuaranteeSend,
      letterGuaranteeReceive,
      refund,
      pdmoBranch,
      expert,
      remark,
      projectTarget,
      projectScope,
      fileContact1,
      // fileContact2,
      // fileContact3,
      // fileCertificate,
      // fileProjectWord,
      // fileProjectPowerpoint,
      userCreate,
    });
  };

  

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="bg-white py-5 px-10 w-full mt-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
              <CiCircleAlert className="" />
              Project TIME: {projectCode}
            </h3>
            <div className="grid grid-cols-2 mt-3 gap-4">
              <div>
                <InputFunc
                  labelText={`Project Name (Eng)`}
                  onChange={(e) => setProjectEng(e.target.value)}
                  placeholder="Enter project name (Eng)"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`Project Name (TH)`}
                  onChange={(e) => setProjectTh(e.target.value)}
                  placeholder="Enter project name (TH)"
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
                  labelText={`ชื่อหน่วยงานผู้ว่าจ้าง`}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="ระบุชื่อหน่วยงานผู้ว่าจ้าง"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`เลขที่สัญญา`}
                  onChange={(e) => setContactCode(e.target.value)}
                  placeholder="ระบุเลขที่สัญญา"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`ที่อยู่`}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="ระบุที่อยู่ผู้ว่าจ้าง"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`เลขที่ผู้เสียภาษี`}
                  onChange={(e) => setCustomerTax(e.target.value)}
                  placeholder="ระบุเลขที่ผู้เสียภาษีผู้ว่าจ้าง"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`มูลค่าโครงการ`}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="ระบุมูลค่าโครงการ"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`งวดเงิน`}
                  onChange={(e) => setValuePeriod(e.target.value)}
                  placeholder="ระบุงวดเงิน"
                  type="text"
                />
              </div>
              {/* <div>
                <InputFunc
                  labelText={`หน่วยงานเจ้าของโครงการ`}
                  onChange={(e) => setProjectOwner(e.target.value)}
                  placeholder="ระบุหน่วยงานเจ้าของโครงการ"
                  type="text"
                />
              </div> */}
              <div>
                <label htmlFor="" className="text-xs">
                  PM
                </label>
                <select
                  onChange={(e) => setProjectManager(e.target.value)}
                  name="pm"
                  id="pm"
                  className="py-5 px-5 w-full rounded-md mt-1 text-xs border"
                >
                  <option value="none">None</option>
                  {getUsers?.map((val, index) => (
                    <option key={index} value={val?.nameEng}>
                      {val?.nameTh}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <InputFunc
                  labelText={`วันเริ่มสัญญา`}
                  onChange={(e) => setStartDateContact(e.target.value)}
                  placeholder="ระบุวันเริ่มสัญญา"
                  type="date"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`วันสิ้นสุดสัญญา`}
                  onChange={(e) => setEndDateContact(e.target.value)}
                  placeholder="ระบุวันสิ้นสุดสัญญา"
                  type="date"
                />
              </div>
              <div>
                <label htmlFor="" className="text-xs">
                  หนังสือค้ำประกัน
                </label>
                <select
                  name="letterGuarantee"
                  onChange={(e) => setLetterGuarantee(e.target.value)}
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
                  onChange={(e) => setStatus(e.target.value)}
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
              {/* <div>
                <InputFunc
                  labelText={`Bank Guarantee ส่งออก`}
                  onChange={(e) => setBankGuaranteeSend(e.target.value)}
                  placeholder="ระบุ Bank Guarantee ส่งออก"
                  type="text"
                />
              </div> */}
              {/* <div>
                <InputFunc
                  labelText={`Bank Guarantee ได้รับ`}
                  onChange={(e) => setBankGuaranteeReceive(e.target.value)}
                  placeholder="ระบุ Bank Guarantee ได้รับ"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`หนังสือรับรองผลงาน ส่งออก`}
                  onChange={(e) => setLatterGuaranteeSend(e.target.value)}
                  placeholder="ระบุหนังสือรับรองผลงาน ส่งออก"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`หนังสือรับรองผลงาน ได้รับ`}
                  onChange={(e) => setLetterGuaranteeReceive(e.target.value)}
                  placeholder="ระบุ หนังสือรับรองผลงาน ได้รับ"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`เงินคืน`}
                  onChange={(e) => setRefund(e.target.value)}
                  placeholder="ระบุ เงินคืน"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`pdmo สาขา`}
                  onChange={(e) => setPdmoBranch(e.target.value)}
                  placeholder="ระบุ pdmo สาขา"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`ความเชี่ยวชาญ`}
                  onChange={(e) => setExpert(e.target.value)}
                  placeholder="ระบุ ความเชี่ยวชาญ"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`หมายเหตุ`}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder=""
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`วัตถุประสงค์โครงการ`}
                  onChange={(e) => setProjectTarget(e.target.value)}
                  placeholder="ระบุวัตถุประสงค์โครงการ"
                  type="text"
                />
              </div>
              <div>
                <InputFunc
                  labelText={`ขอบเขตงาน`}
                  onChange={(e) => setProjectScope(e.target.value)}
                  placeholder="ระบุขอบเขตงาน"
                  type="text"
                />
              </div> */}
            <div className="mt-5">
              <h3 className="bg-blue-50 px-4 py-3 flex items-center text-blue-600 rounded-md gap-2 font-light">
                <CiCircleAlert className="" />
                Finance
              </h3>
              <div className="mt-5">
                {/* <div>
                  <InputFunc
                    btnDisable={true}
                    labelText={`มูลค่าโครงการ`}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="ระบุมูลค่าโครงการ"
                    type="text"
                  />
                </div> */}
                <div className="mt-1">
                  <FinanceProject setData={setValuePeriod}/>
                </div>
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
              <div className="grid grid-cols-2 mt-3 gap-4">
                <div>
                <FileEditProject data={fileContact1} setData={setFileContact1}/>
            



                  {/* <InputFunc
                    placeholder="Enter link here..."
                    labelText={`สัญญา`}
                    onChange={(e) => setFileContact1(e.target.value)}
                    type="text"
                  /> */}
                </div>
                {/* <div>
                  <InputFunc
                    placeholder="Enter link here..."
                    labelText={`สัญญา 2`}
                    onChange={(e) => setFileContact2(e.target.value)}
                    type="text"
                  />
                </div>
                <div>
                  <InputFunc
                    placeholder="Enter link here..."
                    labelText={`สัญญา 3`}
                    onChange={(e) => setFileContact3(e.target.value)}
                    type="text"
                  />
                </div>
                <div>
                  <InputFunc
                    placeholder="Enter link here..."
                    labelText={`หนังสือรับรองผลงาน`}
                    onChange={(e) => setFileCertificate(e.target.value)}
                    type="text"
                  />
                </div>
                <div>
                  <InputFunc
                    placeholder="Enter link here..."
                    labelText={`Project ref (Word)`}
                    onChange={(e) => setFileProjectWord(e.target.value)}
                    type="text"
                  />
                </div>
                <div>
                  <InputFunc
                    placeholder="Enter link here..."
                    labelText={`Project ref (PowerPoint)`}
                    onChange={(e) => setFileProjectPowerpoint(e.target.value)}
                    type="text"
                  />
                </div> */}
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
