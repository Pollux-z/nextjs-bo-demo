import { useCreateUser } from "@/app/services/mutations";
import { useUserLastId, useUsers } from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SeleteComponents from "./SeleteComponents";
import SeletionTeams from "./SeletionTeams";
import { Teams } from "@/app/db/option";
import { Role } from "@/app/db/option";
import InputComponent from "./InputComponent";
import SeletionRole from "./SeletionRole";

const FormCreateUserAdmin = () => {
  const { data: session } = useSession();
  const userCreate = session?.user?.id;

  const { trigger: triggerCreateUser, isMutating } = useCreateUser();
  const { data: getUsers } = useUsers();
  const users: UsersType[] = getUsers?.totalUsers;

  users?.sort((a, b) => {
    return a.userCode - b.userCode;
  });

  const { data: getUserLastId } = useUserLastId();
  const userLastId = getUserLastId?.user;
  const userCordLastId = userLastId?.userCode;
  const userCode = userCordLastId + 1;

  const [nameTh, setNameTh] = useState("");
  const [nameEng, setNameEng] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickNameTh, setNickNameTh] = useState("");
  const [employeeTitle, setEmployeeTitle] = useState("");
  const [employeeTeams, setEmployeeTeams] = useState("");
  const [employeeTel, setEmployeeTel] = useState("");
  const [employeeBirthDay, setEmployeeBirthDay] = useState("");
  const [startDate, setStartDate] = useState("");
  const [teamLeader, setTeamLeader] = useState<{ value: string, label: string | null}>();
  console.log(teamLeader?.value)
  const [remark, setRemark] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [seleteRole, setSeleteRole] = useState({
    value: "User",
    label: "User",
  });
  const [costPerManDay, setCostPerManDay] = useState<number | undefined>(1000);
  const [targetManDay, setTargetManDay] = useState<number | undefined>(
    undefined
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setError("Password not match");
      return;
    }

    if (
      !nameTh ||
      !nameEng ||
      !password ||
      !employeeEmail ||
      !confirmPassword ||
      !startDate
    ) {
      setError("Please input all data");
      return;
    }

    triggerCreateUser({
      userCode,
      nameTh,
      nameEng,
      employeeEmail,
      password,
      nickNameTh,
      employeeTitle,
      employeeTeams,
      employeeTel,
      employeeBirthDay,
      startDate,
      teamLeader: teamLeader?.value,
      role: seleteRole.value,
      costPerManDay,
      targetManDay,
      remark,
      userCreate,
    });
  };

  return (
    <>
      <div className="bg-white py-5 px-10 w-full mt-5">
        <div>
          <h3 className="font-light">
            Employee Code:{" "}
            {userCode > 10 ? `TIME-${userCode}` : `TIME-00${userCode}`}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <div className="col-span-2 mt-2">
            {error && (
              <p className="bg-red-400 text-white py-3 px-4 rounded-md  text-sm">
                {error}
              </p>
            )}
            {success && (
              <p className="bg-green-400 text-white py-3 px-4 rounded-md  text-sm">
                {success}
              </p>
            )}
          </div>
          <div>
            <InputComponent
              label="Full Name Thai ( Required )"
              value={nameTh}
              name="nameTh"
              type="text"
              placeholder="Enter full name (Thai)"
              required
              onChange={setNameTh}
            />
          </div>
          <div>
            <InputComponent
              label="Full Name Eng ( Required )"
              value={nameEng}
              name="nameEng"
              type="text"
              placeholder="Enter full name (Eng)"
              required
              onChange={setNameEng}
            />
          </div>
          <div className="col-span-2">
            <InputComponent
              label="Email ( Required )"
              value={employeeEmail}
              name="email"
              type="email"
              placeholder="Enter email @timeconsulting.co.th"
              required
              onChange={setEmployeeEmail}
            />
          </div>
          <div>
            <InputComponent
              label="Password ( Required )"
              value={password}
              name="password"
              type="password"
              placeholder="Enter password"
              required
              onChange={setPassword}
            />
          </div>
          <div>
            <InputComponent
              label="Confirm password"
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
              onChange={setConfirmPassword}
            />
          </div>
          <div>
            <InputComponent
              label="Telephone Number"
              value={employeeTel}
              name="employeeTel"
              type="tel"
              placeholder="Enter telephone number"
              onChange={setEmployeeTel}
              required={false}
            />
          </div>
          <div>
            <InputComponent
              label="Nickname (Thai)"
              value={nickNameTh}
              name="nickNameTh"
              type="text"
              placeholder="Enter nickname"
              onChange={setNickNameTh}
              required={false}
            />
          </div>
          <div>
            <InputComponent
              label="Birth Day"
              value={employeeBirthDay}
              name="employeeBirthDay"
              type="date"
              placeholder="Enter Birth day"
              onChange={setEmployeeBirthDay}
              required={false}
            />
          </div>
          <div>
            <InputComponent
              label="Title"
              value={employeeTitle}
              name="employeeTitle"
              type="text"
              placeholder="Enter title position"
              onChange={setEmployeeTitle}
              required={false}
            />
          </div>
          <div>
            <label htmlFor="team" className="text-xs">
              Department / Team
            </label>
            <SeleteComponents
              value={employeeTeams}
              data={Teams}
              onChange={(e) => setEmployeeTeams(e.target.value)}
              name="employeeTeams"
            />
          </div>
          <div>
            <InputComponent
              label="Start date"
              value={startDate}
              name="startDate"
              type="date"
              placeholder="Enter start date"
              onChange={setStartDate}
              required
            />
          </div>
          <div>
            <SeletionTeams
              label="Team Leader"
              users={users}
              name="teamLeader"
              seletedTeam={teamLeader}
              setSeletedTeam={setTeamLeader}
              placeholder="Select team leader"
              // onChange={(e) => setTeamLeader(e.target.value)}
            />
          </div>
          <div>
            <SeletionRole
              label="Role"
              role={Role}
              name="role"
              seleteRole={seleteRole}
              setSeleteRole={setSeleteRole}
              placeholder="Select role"
            />
          </div>

          <div>
            <InputComponent
              label="Cost per Man-Day (THB)"
              value={costPerManDay?.toString()}
              name="costPerManDay"
              type="number"
              placeholder="Enter cost per man-day"
              onChange={(value: string) =>
                setCostPerManDay(value ? parseInt(value) : undefined)
              }
              required={false}
            />
          </div>

          <div>
            <InputComponent
              label="Man-Day Target"
              value={targetManDay?.toString()}
              name="costPerManDay"
              type="number"
              placeholder="Enter cost per man-day"
              onChange={(value: string) =>
                setTargetManDay(value ? parseInt(value) : undefined)
              }
              required={false}
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="" className="text-xs">
              Remark
            </label>
            <textarea
              cols={5}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter remark"
              className="text-xs mt-1 w-full border border-gray-300 rounded-md p-4 resize-none"
            />
          </div>

          <div className="col-span-2 flex justify-center items-center">
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

export default FormCreateUserAdmin;
