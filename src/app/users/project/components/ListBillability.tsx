"use client";

import React, { useState } from "react";
import { CiCircleMinus, CiEdit, CiSaveUp2 } from "react-icons/ci";
import { IBillability } from "@/app/users/project/components/InputBilabilityProject";
import { useUsers } from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";
import ProfileNameEng from "@/app/components/ProfileNameEng";

type IListBillability = {
  billability: IBillability[];
  onChangeFinance: (billability: IBillability) => void;
  onDeleteFinance: (billabilityId: number) => void;
};

type IBillabilityList = {
  index: number;
  billability: IBillability;
  onChange: (billability: IBillability) => void;
};

export default function ListBillability({
  billability,
  onChangeFinance,
  onDeleteFinance,
}: IListBillability) {
  return (
    <>
      {billability?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full mt-5">
              <thead className="border-b">
                <tr className="*:py-3 *:px-3 *:font-normal text-sm">
                  <th className="text-left">No</th>
                  <th className="text-left font-bold">User</th>
                  <th>Man Day</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {billability?.map((items, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
                  >
                    <td>
                      <p>{items.indexId}</p>
                    </td>
                    <td>
                      <Billability
                        index={index + 1}
                        billability={items}
                        onChange={onChangeFinance}
                      />
                    </td>
                    <td className="flex justify-center">
                      <BillabilityManday
                        index={index + 1}
                        billability={items}
                        onChange={onChangeFinance}
                      />
                    </td>
                    <td className="text-center">
                      <button
                        title="Delete"
                        type="button"
                        onClick={() => {
                          onDeleteFinance(items.indexId);
                        }}
                        className="bg-red-100 text-red-600  py-1 px-2 rounded-md  text-xs  hover:bg-red-600 hover:text-white transition "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-200 flex justify-center items-center mt-5 bg-opacity-25 rounded-md min-h-36">
            <p className="font-bold">Please input some data for show !</p>
          </div>
        </>
      )}
    </>
  );
}

function Billability({ billability, onChange, index }: IBillabilityList) {
  const { data: getUsers } = useUsers();
  const users: UsersType[] = getUsers?.totalUsers;

  const [isEditing, setIsEditing] = useState(false);
  let financeContent;
  if (isEditing) {
    financeContent = (
      <>
        <select
          title="Select user"
          value={billability.userId}
          onChange={(e) => onChange({ ...billability, userId: e.target.value })}
          className="border py-2 px-3 rounded-md text-xs"
        >
          <option value="">Select user</option>
          {users?.map((user) => (
            <option key={user._id} value={user._id}>
              TIME-{user.userCode} {user.nameTh}
            </option>
          ))}
        </select>
        <button
          title="Save"
          type="button"
          onClick={() => setIsEditing(false)}
          className="bg-green-100 text-green-600  py-1 px-2 rounded-md text-xs mx-1 hover:bg-green-600 hover:text-white transition"
        >
          <CiSaveUp2 />
        </button>
      </>
    );
  } else
    financeContent = (
      <div className="flex items-center">
        {billability.userId ? (
          <>
            <ProfileNameEng employeeId={billability?.userId} />
          </>
        ) : null}
        <button
          title="Edit"
          type="button"
          onClick={() => setIsEditing(true)}
          className="bg-violet-100 text-violet-600  py-1 px-2 rounded-md text-xs mx-2 hover:bg-violet-600 hover:text-white transition"
        >
          <CiEdit />
        </button>
      </div>
    );
  return <div className="flex mt-1.5">{financeContent}</div>;
}

function BillabilityManday({ billability, onChange }: IBillabilityList) {
  const [isEditing, setIsEditing] = useState(false);
  let financeContent;
  if (isEditing) {
    financeContent = (
      <>
        <input
          placeholder="Add Man day"
          value={billability.manDay}
          type="number"
          onChange={(e) => {
            onChange({
              ...billability,
              manDay: Number(e.target.value),
            });
          }}
          className="border py-2 px-3 rounded-md  text-xs"
        />
        <button
          title="Save"
          type="button"
          onClick={() => setIsEditing(false)}
          className="bg-green-100 text-green-600  py-1 px-2 rounded-md text-xs mx-1 hover:bg-green-600 hover:text-white transition"
        >
          <CiSaveUp2 />
        </button>
      </>
    );
  } else
    financeContent = (
      <div className="flex items-center">
        {billability.manDay ? (
          <>
            <p className="text-sm min-w-14">{billability.manDay} Days</p>
          </>
        ) : null}
        <button
          title="Edit"
          type="button"
          onClick={() => setIsEditing(true)}
          className="bg-violet-100 text-violet-600  py-1 px-2 rounded-md text-xs mx-1 hover:bg-violet-600 hover:text-white transition"
        >
          <CiEdit />
        </button>
      </div>
    );
  return <div className="flex mt-1.5">{financeContent}</div>;
}
