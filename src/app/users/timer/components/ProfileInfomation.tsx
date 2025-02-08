import React from "react";
import { format } from "date-fns";
import { UsersType } from "@/interfaces/User";

const ProfileInfomation: React.FC<{ user: UsersType }> = ({ user }) => {
  const currentYear = new Date().getFullYear();
  const employeeYear = new Date(user?.employeeBirthDay).getFullYear();
  const birthDay = currentYear - employeeYear;
  const formateDate = format(new Date(user?.startDate), "MMM dd yyyy");
  return (
    <>
      <div className="bg-white rounded-md mt-5 h-full py-5">
        <div className="p-2">
          <h5 className="text-sm font-semibold border-l-4 p-2 border-purple-600 ">
            Persolnal info
          </h5>
        </div>
        <hr className="my-3" />
        <div className="grid md:grid-cols-2 gap-3 p-2">
          <div className="grid gap-1">
            <label htmlFor="nameEng" className="text-sm">
              Employee ID
            </label>
            <input
              title="Employee ID"
              disabled
              type="text"
              value={`TIME-${user?.userCode}`}
              className="border px-2 py-2 text-center rounded-md text-xs bg-white"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="nameEng" className="text-sm">
              Name Eng
            </label>
            <input
              title="Name Eng"
              disabled
              type="text"
              value={user?.nameEng}
              className="border px-2 py-2 text-center rounded-md text-xs bg-white"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="nameTh" className="text-sm">
              Name Th
            </label>
            <input
              title="Name Th"
              disabled
              type="text"
              value={user?.nameTh}
              className="border px-2 py-2 text-center rounded-md text-xs bg-white"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="nameTh" className="text-sm">
              Nick Name
            </label>
            <input
              title="Nick Name"
              disabled
              type="text"
              value={user?.nickNameTh}
              className="border px-2 py-2 text-center rounded-md text-xs bg-white"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="employeeEmail" className="text-sm">
              Email
            </label>
            <input
              title="Email"
              disabled
              type="text"
              value={user?.employeeEmail}
              className="border px-2 py-2 text-center rounded-md text-xs bg-white"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="employeeTel" className="text-sm">
              Telephone
            </label>
            <input
              title="Telephone"
              disabled
              type="text"
              value={user?.employeeTel}
              className="border px-2 py-2 text-center rounded-md text-xs bg-white"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="employeeBirthDay" className="text-sm">
              Birth Day
            </label>
            <input
              title="Birth Day"
              disabled
              type="text"
              value={user?.employeeBirthDay}
              className="border px-2 py-2 text-center rounded-md text-xs bg-white"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="employeeBirthDay" className="text-sm">
              Age
            </label>
            <input
              title="Age"
              disabled
              type="text"
              value={`${birthDay} Years`}
              className="border px-2 py-2 text-center rounded-md text-xs bg-white"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="nameEng" className="text-sm">
              Start Date
            </label>
            <input
              title="Start Date"
              disabled
              type="text"
              value={formateDate}
              className="border px-2 py-2 text-center rounded-md text-xs bg-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfomation;
