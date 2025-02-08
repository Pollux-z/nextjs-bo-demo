import { useUser, useUsers, useUsersTeamConsultant } from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Select from "react-select";

function AddUserSeller({ handleAdd }: any) {
  const { data: session } = useSession();
  const sessionId = session?.user?.id;

  const { data: users } = useUsersTeamConsultant();
 
  users?.sort((a: any, b: any) => {
    return a.userCode - b.userCode;
  });
  
  const [selectedOptionsUser, setSelectedOptionsUser] = React.useState<any>([]);

  const [userSeller, setUserSeller] = React.useState<string>("");
  const [manDay, setManDay] = React.useState<number>(0);

  const { data: getUser } = useUser(userSeller, {
    enabled: !!userSeller
  });

  const user: UsersType | undefined = getUser?.user;

  const optionUser = users?.map((user: UsersType) => ({
    value: user.id,
    label: `TIME-${user.userCode} ${user.nameTh} (${user.nickNameTh})`,
  }));

  const handleChange = (selected: any) => {
    setSelectedOptionsUser(selected);
  };

  const handleError = () => {
    handleAdd(userSeller);
    // setUserSeller({ userId: '', manDay: 0 })
  };

  const handleAddSeller = () => {
    setUserSeller("");
    setSelectedOptionsUser([]);
    setManDay(0);
    handleAdd({
      userId: userSeller,
      manDay: manDay,
      costPerManDay: user?.costPerManDay,
      totalCost: calculateTotalCost(manDay, user?.costPerManDay || 0),
    });
  };


  const calculateTotalCost = (manDay: number, costPerManDay: number) => {
    const totalCost = manDay * costPerManDay;
    return totalCost;
  };

  useEffect(() => {
    if (selectedOptionsUser) {
      setUserSeller(selectedOptionsUser.value);
    }
  }, [selectedOptionsUser]);

  return (
    <>
      <div className="flex justify-between items-stretch">
        <div className=" grid grid-rows-2">
          <label className="text-sm">Seller user</label>
          <Select
            isClearable
            isSearchable
            placeholder="Select User"
            value={selectedOptionsUser}
            options={optionUser}
            onChange={handleChange}
            className="text-sm  w-96"
            styles={{
              control: (styles) => ({
                ...styles,
                height: "45px",
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
              }),
            }}
          />
        </div>
        <div className="grid grid-rows-2">
          <label className="text-sm">Man day</label>
          <input
            disabled={!userSeller}
            min={0}
            value={manDay === 0 ? "" : manDay}
            type="number"
            name="userId"
            placeholder="Man day"
            onChange={(e) => setManDay(Number(e.target.value))}
            className="border border-gray-300 rounded-md p-2.5  text-sm "
          />
        </div>

        <div className="grid gird-rows-2 ">
          <label className="text-sm">Cost per man day</label>
            <p className=" bg-cyan-100 text-cyan-500 rounded-md  text-sm font-semibold  min-w-20 flex justify-center items-center">
            {user?.costPerManDay || 0} THB
            </p>
        </div>

        <div className="grid gird-rows-2  max-w-28 min-w-20">
          <label className="text-sm mx-auto">Total cost</label>
          <p className="bg-blue-100 text-blue-500 rounded-md  text-sm font-semibold  min-w-32 flex justify-center items-center">
            {calculateTotalCost(manDay, user?.costPerManDay || 0)} THB
          </p>
        </div>

        <div className="self-end">
          <button
            type="button"
            onClick={handleAddSeller}
            className="bg-cyan-500 text-white rounded-md p-2 text-sm font-semibold  h-20 hover:bg-cyan-600 transition "
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default AddUserSeller;
