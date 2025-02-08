import React, { useState } from "react";
import { IBillability } from "@/app/users/project/components/InputBilabilityProject";
import { useUsers } from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";

type IAddBillability = {
  onAddFinance: (billability: IBillability) => void;
};

function AddBillability({ onAddFinance }: IAddBillability) {
  const { data: getUsers } = useUsers();
  const users: UsersType[] = getUsers?.totalUsers;

  users?.sort((a, b) => {
    return a.userCode - b.userCode;
  });

  const [showError, setShowError] = useState("");
  const [billability, setBillability] = useState<IBillability>({
    indexId: 0,
    userId: "",
    manDay: 0,
  });

  const handleError = () => {
    if (!billability.userId || !billability.manDay) {
      setShowError("Please input data");
      return;
    }
    onAddFinance(billability);
    setBillability({ indexId: 0, userId: "", manDay: 0 });
    setShowError("");
  };

  React.useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <div className="">
      <p
        className={
          showError
            ? "bg-red-100 text-red-600 py-1 px-2 my-1 text-sm w-1/2 font-semibold rounded-md"
            : undefined
        }
      >
        {showError}
      </p>
      <div className="flex flex-col md:flex-row md:w-3/4  gap-3 items-end">
        <div className="grid w-full">
          <label className="text-sm">User</label>
          <select
            title="Select user"
            value={billability.userId}
            onChange={(e) =>
              setBillability({ ...billability, userId: e.target.value })
            }
            className="border py-3 px-5 rounded-md  text-xs mt-1"
          >
            <option value="">Select user</option>
            {users?.map((user) => (
              <option key={user._id} value={user._id}>
                 TIME-{user.userCode} {user?.nameTh} ({user?.nickNameTh})
              </option>
            ))}
          </select>
        </div>

        <div className="grid w-full">
          <label className="text-sm">Man day</label>
          <input
            value={billability.manDay}
            onChange={(e) =>
              setBillability({ ...billability, manDay: e.target.value === "" ? 0 : Number(e.target.value) })
            }
            type="number"
            placeholder="Insert man days"
            className="border py-3 px-5 rounded-md text-xs mt-1"
          />
        </div>

        <button
          disabled={!billability.userId || !billability.manDay}
          type="button"
          onClick={() => {
            handleError();
            // setBillability({ id: 0, userId: "", manDay: 0 });
          }}
          className="w-1/4 h-10  bg-sky-100 text-sky-600  rounded-md mt-1 text-xs  hover:bg-sky-600 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddBillability;
