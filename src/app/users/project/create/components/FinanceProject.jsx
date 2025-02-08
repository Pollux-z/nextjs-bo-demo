import React, { useEffect, useReducer } from "react";
import AddFinance from "./AddFinance";
import ListFinance from "./ListFinance";

function financeReducer(finances, action) {
  switch (action.type) {
    case "added": {
      return [
        ...finances,
        {
          id: action.id,
          financeName: action.financeName,
        },
      ];
    }
    case "changed":
      return finances.map((finance) => {
        if (finance.id === action.financeName.id) {
          return action.financeName;
        } else {
          return finance;
        }
      });
    case "deleted":
      return finances.filter((finance) => finance.id != action.id);
  }
}

let financeId = 0;

export default function FinanceProject({ setData }) {
  const [finance, dispath] = useReducer(financeReducer, []);
  console.log("🚀 ~ FinanceProject ~ finance:", finance)
  let financeLastId = finance.length;

  const totalFinance = finance?.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.financeName),
    0
  );

  function handleAdded(finance) {
    dispath({
      type: "added",
      id: financeLastId++,
      financeName: finance,
    });
  }

  function handleChange(finance) {
    dispath({
      type: "changed",
      financeName: finance,
    });
  }

  function handleDelete(financeId) {
    dispath({
      type: "deleted",
      id: financeId,
    });
  }

  useEffect(() => {
    setData(finance)
  }, [finance]);

  return (
    <>
      <div>
        <p className="text-sm">มูลค่าโครงการ</p>
        <p className="bg-slate-50 text-slate-700 w-1/3 py-2 px-3 rounded-md mt-1">
          {totalFinance} บาท
        </p>
      </div>
      <div className="mt-3">
        <div>
          <ListFinance
            finances={finance}
            onChangeFinance={handleChange}
            onDeleteFinance={handleDelete}
          />
        </div>
        <div className="mt-2">
          <AddFinance onAddFinance={handleAdded} />
        </div>
      </div>
    </>
  );
}
