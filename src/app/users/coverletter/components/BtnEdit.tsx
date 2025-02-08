import React from "react";

const BtnEdit: React.FC<{ id: string; name: string }> = ({ id, name }) => {
  return (
    <>
      <a href={`/users/coverletter/edit/${id}`} className=" text-blue-500 ">
        {name}
      </a>
    </>
  );
}

export default BtnEdit;
