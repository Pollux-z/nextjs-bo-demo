import React, { useState } from "react";
import { CiCircleMinus, CiEdit, CiSaveUp2 } from "react-icons/ci";

export default function ListFinance({
  finances,
  onChangeFinance,
  onDeleteFinance,
}) {
  return (
    <ul>
      {finances?.map((finance, index) => (
        <li key={index}>
          <Finance
            index={index + 1}
            finance={finance}
            onChange={onChangeFinance}
            onDelete={onDeleteFinance}
          />
        </li>
      ))}
    </ul>
  );
}

function Finance({ finance, onChange, onDelete, index }) {
  const [isEditing, setIsEditing] = useState(false);
  let financeContent;
  if (isEditing) {
    financeContent = (
      <>
        <input
          value={finance.financeName}
          type="number"
          onChange={(e) => {
            onChange({
              ...finance,
              financeName: e.target.value,
            });
          }}
          className="border py-2 px-3 rounded-md  text-xs"
        />
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="bg-green-100 text-green-600  py-2 px-3 rounded-md text-xs mx-2 hover:bg-green-600 hover:text-white transition"
        >
          <CiSaveUp2 />
        </button>
      </>
    );
  } else
    financeContent = (
      <div className="flex">
        {finance.financeName ? (
          <p>
            งวดเงินที่{index}: {finance.financeName} บาท
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="bg-violet-100 text-violet-600  py-2 px-3 rounded-md text-xs mx-1 hover:bg-violet-600 hover:text-white transition"
        >
          <CiEdit />
        </button>
      </div>
    );
  return (
    <div className="flex mt-1.5">
      {financeContent}
      <button
        type="button"
        onClick={() => {
          onDelete(finance.id);
        }}
        className="bg-red-100 text-red-600  py-2 px-3 rounded-md  text-xs  hover:bg-red-600 hover:text-white transition "
      >
        <CiCircleMinus />
      </button>
    </div>
  );
}
