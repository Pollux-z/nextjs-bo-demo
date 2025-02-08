import { useUpdateTimerAdmin } from "@/app/services/mutations";
import { useUser, useUsers } from "@/app/services/queries";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import InputComponents from "./InputComponents";
import { Role, Teams } from "@/app/db/option";
import SeleteComponents from "./SeleteComponents";
import Loading from "@/app/loading";

const FormEditUserAdmin = ({ id }: { id: string }) => {
  const { data: session } = useSession();

  console.log(id)

  const { data: getUser, isLoading, isValidating, error } = useUser(id);
  const userData = getUser?.user;
  const { trigger, isMutating } = useUpdateTimerAdmin(id);
  const userUpdated = session?.user?.nameEng;

  const { data: users } = useUsers();
  const usersData = users?.totalUsers;

  const [inputData, setInputData] = useState({
    nameTh: "",
    nameEng: "",
    nickNameTh: "",
    employeeProfile: "",
    employeeTitle: "",
    employeeTeams: "",
    employeeTel: "",
    employeeEmail: "",
    employeeBirthDay: "",
    startDate: "",
    endDate: "",
    teamLeader: "",
    vacationLeave: "",
    sickLeave: "",
    personalLeave: "",
    remark: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger({
      nameTh: inputData.nameTh,
      nameEng: inputData.nameEng,
      nickNameTh: inputData.nickNameTh,
      employeeProfile: inputData.employeeProfile,
      employeeTitle: inputData.employeeTitle,
      employeeTeams: inputData.employeeTeams,
      employeeTel: inputData.employeeTel,
      employeeEmail: inputData.employeeEmail,
      employeeBirthDay: inputData.employeeBirthDay,
      startDate: inputData.startDate,
      endDate: inputData.endDate,
      teamLeader: inputData.teamLeader,
      vacationLeave: inputData.vacationLeave,
      sickLeave: inputData.sickLeave,
      personalLeave: inputData.personalLeave,
      remark: inputData.remark,
      password: inputData.password,
      role: inputData.role,
    });
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (userData) {
      setInputData({
        nameTh: userData?.nameTh,
        nameEng: userData?.nameEng,
        nickNameTh: userData?.nickNameTh,
        employeeProfile: userData?.employeeProfile,
        employeeTitle: userData?.employeeTitle,
        employeeTeams: userData?.employeeTeams,
        employeeTel: userData?.employeeTel,
        employeeEmail: userData?.employeeEmail,
        employeeBirthDay: userData?.employeeBirthDay,
        startDate: userData?.startDate,
        endDate: userData?.endDate,
        teamLeader: userData?.teamLeader,
        vacationLeave: userData?.vacationLeave,
        sickLeave: userData?.sickLeave,
        personalLeave: userData?.personalLeave,
        remark: userData?.remark,
        password: "",
        role: userData?.role,
      });
    }
  }, [userData]);

  if (isLoading) return <Loading />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="" className="text-xs">
            Name th
          </label>
          <InputComponents
            type="text"
            name="nameTh"
            value={inputData?.nameTh}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-xs">
            Name Eng
          </label>
          <InputComponents
            type="text"
            name="nameEng"
            value={inputData?.nameEng}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-xs">
            Nick name (Th)
          </label>
          <InputComponents
            type="text"
            name="nickNameTh"
            value={inputData?.nickNameTh}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="employeeTitle" className="text-xs">
            Title
          </label>
          <InputComponents
            type="text"
            name="employeeTitle"
            value={inputData?.employeeTitle}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="employeeTeams" className="text-xs">
            Team / Department
          </label>
          <select
            title="employees"
            name="employeeTeams"
            value={inputData?.employeeTeams}
            onChange={handleOnChange}
            className="border py-5 px-5 w-full rounded-md  mt-1 text-xs"
          >
            <option value="">- Selete Team -</option>
            {Teams.map((val, index) => (
              <option key={index}>{val}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="employeeTel" className="text-xs">
            Telephone Number (Ex: 081-111-2233)
          </label>
          <InputComponents
            type="tel"
            value={inputData?.employeeTel}
            name="employeeTel"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="employeeEmail" className="text-xs">
            Email Address (@timeconsulting.co.th)
          </label>
          <InputComponents
            type="email"
            value={inputData?.employeeEmail}
            name="employeeEmail"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="employeeBirthDay" className="text-xs">
            Birth Day
          </label>
          <InputComponents
            type="date"
            value={inputData?.employeeBirthDay}
            name="employeeBirthDay"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="startDate" className="text-xs">
            Start Date
          </label>
          <InputComponents
            type="date"
            value={inputData?.startDate}
            name="startDate"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="text-xs">
            Resign date
          </label>
          <InputComponents
            type="date"
            value={inputData?.endDate}
            name="endDate"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="teamLeader" className="text-xs">
            Team Leader
          </label>
          <select
            title="teamLeader"
            onChange={handleOnChange}
            value={inputData?.teamLeader}
            name="teamLeader"
            className="border py-5 px-5 w-full rounded-md mt-1 text-xs"
          >
            <option value="null">- Selete option -</option>
            {usersData?.map((val: any, index: number) => (
              <option value={val._id} key={val._id}>{`TIME-${
                val.userCode < 10
                  ? `00${val.userCode}`
                  : val.userCode < 100
                  ? `0${val.userCode}`
                  : val.userCode
              } ${val.nameTh}`}</option>
            ))}
          </select>
          {/* <InputComponents
                    type="text"
                    value={userData?.teamLeader}
                    name="teamLeader"
                    onChange={handleOnChange}
                  /> */}
        </div>
        {/* <div>
          <label htmlFor="vacationLeave" className="text-xs">
            Vacation Leave (Day)
          </label>
          <InputComponents
            type="number"
            value={inputData?.vacationLeave}
            name="vacationLeave"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="sickLeave" className="text-xs">
            Sick Leave (Day)
          </label>
          <InputComponents
            type="number"
            value={inputData?.sickLeave}
            name="sickLeave"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="personalLeave" className="text-xs">
            Personal Leave (Day)
          </label>
          <InputComponents
            type="number"
            value={inputData?.personalLeave}
            name="personalLeave"
            onChange={handleOnChange}
          />
        </div> */}
        <div>
          <label htmlFor="remark" className="text-xs">
            Remark
          </label>
          <InputComponents
            type="text"
            value={inputData?.remark}
            name="remark"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="role" className="text-xs">
            Role
          </label>
          <SeleteComponents
            value={inputData?.role}
            name="role"
            onChange={handleOnChange}
            data={Role}
          />
        </div>
        <div>
          <label htmlFor="remark" className="text-xs">
            Password
          </label>
          <InputComponents
            type="text"
            value={inputData?.password}
            name="password"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="remark" className="text-xs">
            Img Link
          </label>
          <InputComponents
            type="text"
            value={inputData?.employeeProfile}
            name="employeeProfile"
            onChange={handleOnChange}
          />
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <button
            disabled={isMutating}
            type="submit"
            className={
              isMutating
                ? "bg-gray-500 w-36 text-white py-2 rounded-lg shadow-md mt-5 text-sm"
                : "bg-green-500 w-36 text-white py-2 rounded-lg shadow-md mt-5 text-sm"
            }
          >
            {isMutating ? "Creating..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormEditUserAdmin;
