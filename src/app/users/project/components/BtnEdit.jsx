import React from "react";

function BtnEdit({ id }) {
  return (
    <>
      <a
        href={`/users/project/edit/${id}`}
        className="bg-green-500 text-white px-2 py-1 rounded-md shadow-md mx-1 text-xs"
      >
        Edit
      </a>
    </>
  );
}

export default BtnEdit;
