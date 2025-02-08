import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

function AddFinance({ onAddFinance }) {
  const [finance, setFinance] = useState(null);

  return (
    <div className="flex items-center gap-1">
      <input
        value={finance}
        onChange={(e) => setFinance(e.target.value)}
        type="number"
        placeholder="Insert data"
        className=" w-1/3 py-2 placeholder:text-xs pl-3 rounded-md border"
      />
      <button
        onClick={() => {
          onAddFinance(finance);
          setFinance('');
        }}
        type="button"
        className="bg-green-100 text-green-600  py-2 px-3 rounded-md  text-xs  hover:bg-green-600 hover:text-white transition "
      >
        {" "}
        <CiCirclePlus size={20} />
      </button>
    </div>
  );
}

export default AddFinance;
