import React from "react";

function BtnFormCreate({ isMutating }: { isMutating: any }) {
  return (
    <>
      <button
        disabled={isMutating}
        type="submit"
        className={
          isMutating
            ? "bg-gray-500 w-36 text-white py-2 rounded-lg shadow-md mt-5 font-extralight"
            : "bg-green-500 w-36 text-white py-2 rounded-lg shadow-md mt-5 font-extralight"
        }
      >
        {isMutating ? "Creating..." : "Save"}
      </button>
    </>
  );
}

export default BtnFormCreate;
