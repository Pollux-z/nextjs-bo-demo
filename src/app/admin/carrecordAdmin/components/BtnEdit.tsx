import React from "react";

type BtnEditType = {
  id: string;
};

const BtnEdit: React.FC<BtnEditType> = ({ id }) => {
  return (
    <>
      <a
        href={`/admin/carrecordAdmin/edit/${id}`}
        className="bg-green-100 text-emerald-500 px-2 py-1 rounded-md shadow-sm text-xs text-center font-light"
      >
        Edit
      </a>
    </>
  );
};

export default BtnEdit;
