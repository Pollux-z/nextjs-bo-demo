import React from "react";

function BtnView({ id }) {
  return (
    <>
      <a
        href={`/admin/timerAdmin/view/${id}`}
        className="bg-green-500 text-white px-2 py-1 rounded-md shadow-md mx-1 text-xs"
      >
        View
      </a>
    </>
  );
}

export default BtnView;
