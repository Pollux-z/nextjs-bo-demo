import ProfileNameEng from "@/app/components/ProfileNameEng";
import { useUsers } from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

interface SellerType {
  sellerState: any;
  onChangeSeller: (item: any) => void;
  onDeleteSeller: (item: any) => void;
}

interface SellerStateType {
  userId: string;
  indexId: number;
  manDay: number;
  costPerManDay: number;
  totalCost: number;
}

function CalculateTotalCost(manDay: number, costPerManDay: number) {
  return manDay * costPerManDay;
}

function NumberFormat(value: number) {
  return new Intl.NumberFormat("th-TH").format(value);
}

function CalculateTotalCostInternalCharge(seller: any) {
  const totalCostInternalCharge = seller.reduce(
    (totalCost: number, seller: any) => {
      return totalCost + seller.totalCost;
    },
    0
  );

  return NumberFormat(totalCostInternalCharge);
}

export default function ListSellerInternalCharge({
  sellerState,
  onChangeSeller,
  onDeleteSeller,
}: SellerType) {
  const { data: session } = useSession();
  const sessionUserRole = session?.user.role;
  
  const [isEdit, setIsEdit] = useState(0);
  const [changeUser, setChangeUser] = useState("");

  const { data: getUsers } = useUsers();
  const users: UsersType[] = getUsers?.totalUsers;

  const findUser = users?.find((user) => user._id === changeUser);

  users?.sort((a: any, b: any) => {
    return a.userCode - b.userCode;
  });

  const handleSave = (seller: any) => {
    onChangeSeller({
      ...seller,
      costPerManDay: findUser?.costPerManDay,
      totalCost: CalculateTotalCost(
        seller?.manDay,
        findUser?.costPerManDay ?? 0
      ),
    });
    setIsEdit(0);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="w-10">No</th>
              <th className="w-3/6">User</th>
              <th className="w-1/6">Man day</th>
              <th className="w-1/6">Total costs</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellerState.map((seller: SellerStateType, index: number) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-slate-50 *:px-3 text-sm *:h-16"
              >
                <td>{seller?.indexId}</td>
                <td className="  mx-auto  min-w-full flex items-center justify-center">
                  <div className=" flex min-w-72 max-w-80">
                    <SellerUser
                      isEdit={isEdit}
                      seller={seller}
                      users={users}
                      setChangeUser={setChangeUser}
                      onChangeSeller={onChangeSeller}
                      onDeleteSeller={onDeleteSeller}
                    />
                  </div>
                </td>
                <td className="">
                  <SellerUserManDay
                    isEdit={isEdit}
                    seller={seller}
                    onChangeSeller={onChangeSeller}
                    onDeleteSeller={onDeleteSeller}
                  />
                </td>
                <td className="text-center font-semibold">
                  {NumberFormat(seller?.totalCost)} THB
                </td>
                <td className="">
                  {isEdit === seller.indexId ? (
                    <button
                      type="button"
                      onClick={() => handleSave(seller)}
                      className="bg-blue-100 text-blue-500 p-2 h-8 rounded-md text-xs mx-1 hover:bg-blue-600 hover:text-white transition w-full"
                    >
                      Save
                    </button>
                  ) : (
                    <div className="flex justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => setIsEdit(seller.indexId)}
                        className="bg-green-100 text-green-500  p-2 h-8 rounded-md text-xs  hover:bg-green-600 hover:text-white transition "
                      >
                        Edit
                      </button>
                        <button
                          type="button"
                          onClick={() => onDeleteSeller(seller.indexId)}
                          className="bg-red-100 text-red-500  p-2 h-8 rounded-md text-xs  hover:bg-red-600 hover:text-white transition"
                        >
                          Delete
                        </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            <tr className="*:h-12 bg-gray-200">
              <td className=""></td>
              <td className=""></td>
              <td className="text-center font-semibold">Total</td>
              <td className="text-center font-extrabold">
                {CalculateTotalCostInternalCharge(sellerState)} THB
              </td>
              <td className=""></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function SellerUser({
  seller,
  onChangeSeller,
  isEdit,
  setChangeUser,
  users,
}: any) {
  useEffect(() => {
    setChangeUser(seller?.userId);
  }, [seller?.userId]);

  let sellerContent;
  if (isEdit === seller.indexId) {
    sellerContent = (
      <>
        <div className="flex justify-between items-center min-w-96  ">
          <select
            title="Select user"
            value={seller?.userId}
            onChange={(e) => {
              setChangeUser(e.target.value);
              onChangeSeller({ ...seller, userId: e.target.value });
            }}
            className="border py-3 px-3 rounded-md text-xs w-full"
          >
            <option value="">Select user</option>
            {users?.map((user: UsersType) => (
              <option key={user._id} value={user._id}>
                TIME-{user.userCode} {user.nameTh}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  } else {
    sellerContent = (
      <>
        <div className="flex justify-between w-full items-center">
          <p>
            <ProfileNameEng employeeId={seller?.userId} />
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center max-w-fit-content">
        {sellerContent}
      </div>
    </>
  );
}

function SellerUserManDay({ seller, onChangeSeller, isEdit }: any) {
  let sellerManDayContent;
  if (isEdit === seller.indexId) {
    sellerManDayContent = (
      <>
        <div className="flex justify-between items-center w-full">
          <input
            placeholder="Please input man day"
            type="number"
            value={seller?.manDay}
            onChange={(e) =>
              onChangeSeller({ ...seller, manDay: e.target.value })
            }
            className="border p-3 rounded-md text-xs w-full text-center font-semibold"
          />
        </div>
      </>
    );
  } else {
    sellerManDayContent = (
      <>
        <div className="text-center b">
          <p>
            {seller?.manDay}{" "}
            {seller?.manDay > 1 ? "days" : seller?.manDay === 1 ? "day" : ""}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="">{sellerManDayContent}</div>
    </>
  );
}
