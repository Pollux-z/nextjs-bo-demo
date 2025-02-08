"use client";

import React, { useEffect, useReducer } from "react";
import AddBillability from "./AddBillability";
import ListBillability from "./ListBillability";

export type IBillability = {
  indexId: number;
  userId: string;
  manDay: number;
};

type IAction = {
  type: string;
  indexId?: number;
  userId?: IBillability;
  manDay?: number;
};

type IProps = {
  setData: any;
  data: any;
};

function BillabilityReducer(billabilitys: IBillability[], action: IAction) {
  switch (action.type) {
    case "added": {
      return [
        ...billabilitys,
        {
          indexId: action.indexId!,
          userId: action.userId!.userId,
          manDay: action.userId!.manDay,
        },
      ];
    }
    case "changed":
      return billabilitys.map((finance) => {
        if (action.userId && finance.indexId === action.userId.indexId) {
          return action.userId;
        } else {
          return finance;
        }
      });
    case "deleted":
      return billabilitys.filter((finance) => finance.indexId != action.indexId);
    default:
      return billabilitys;
  }
}

export default function InputBilabilityProject({ setData, data }: IProps) {
  const [billability, dispath] = useReducer<
    React.Reducer<IBillability[], IAction>
  >(BillabilityReducer, data);

  console.log("Revice Data",data)
  
  let financeLastId: number = billability?.length ? billability[billability.length - 1].indexId + 1 : 1;

  const totalManday = billability?.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.manDay),
    0
  );

  function handleAdded(billability: IBillability) {
    dispath({
      type: "added",
      indexId: financeLastId++,
      userId: billability,
      manDay: 0,
    });
  }

  function handleChange(billability: IBillability) {
    dispath({
      type: "changed",
      userId: billability,
    });
  }

  function handleDelete(billabilityId: number) {
    dispath({
      type: "deleted",
      indexId: billabilityId,
    });
  }

  useEffect(() => {
    setData(billability);
  }, [billability]);

  return (
    <>
      <div>
        <h3 className="text-sm">Total Billability</h3>
        <h3 className="text-lg bg-slate-100 md:w-1/3 py-1 px-2 rounded-md font-bold my-1">{totalManday} Days</h3>
      </div>
      <div className="mt-3">
        <div className="mt-2">
          <AddBillability onAddFinance={handleAdded} />
        </div>
        <div>
          <ListBillability
            billability={billability}
            onChangeFinance={handleChange}
            onDeleteFinance={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
