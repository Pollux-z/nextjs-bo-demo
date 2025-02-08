import { UsersType } from "@/interfaces/User";
import React from "react";

import { FcLandscape, FcInvite, FcHome } from "react-icons/fc";
import { TZDate } from "@date-fns/tz";
import { setDate, setHours } from "date-fns";

import CalculateSickLeave from "../../timeoff/components/CalculateSickLeave";
import CalculatePersonalLeave from "../../timeoff/components/CalculatePersonalLeave";
import CalculateVacationLeave, { CalculateCarryOver } from "../../timeoff/components/CalculateVacationLeave";

const ProfileLeave: React.FC<{ user: UsersType }> = ({ user }) => {
  console.log(user);

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3  gap-3">
        <div className="ring-1 ring-white rounded-md shadow-md flex items-center justify-center gap-3 min-h-28 bg-white">
          <FcLandscape
            size={50}
            className="p-2 rounded-lg shadow-lg bg-green-300 text-white"
          />
          <div>
            <p className="text-xs text-gray-500">Vacation Leave</p>
            <p className="font-semibold">
              <CalculateVacationLeave
                sortType="Vacation"
                user={user}
                seletedYear={2025}
              />{" "}
              Days
            </p>
            <p className="text-xs text-gray-500">
              Carry-Over:{" "}
              <CalculateCarryOver
                sortType="Vacation"
                user={user}
                seletedYear={2025}
              />{" "}
            </p>
            <p className="text-xs text-red-700 font-semibold">
              Expire: 30 Sep 2025
            </p>
          </div>
        </div>

        <div className="ring-1 ring-white rounded-md shadow-md flex items-center justify-center gap-3 min-h-28 bg-white">
          <FcHome
            size={50}
            className="bg-orange-300 shadow-lg rounded-lg p-2"
          />
          <div>
            <p className="text-xs text-gray-500">Personal Leave</p>
            <p className="font-semibold">
              <CalculatePersonalLeave
                sortType="Personal Leave"
                user={user}
                seletedYear={2025}
              />{" "}
              Days
            </p>
          </div>
        </div>

        <div className="ring-1 ring-white rounded-md shadow-md flex items-center justify-center gap-3 min-h-28 bg-white">
          <FcInvite
            size={50}
            className="bg-blue-300  p-2 rounded-lg shadow-lg"
          />
          <div>
            <p className="text-xs text-gray-500">Sick Leave</p>
            <p className="font-semibold">
              <CalculateSickLeave
                sortType="Sick Leave"
                user={user}
                seletedYear={2025}
              />{" "}
              Days
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLeave;
