import React from "react";

type StyleStatus = {
  data: string;
};

function StyleStatus({ data }: StyleStatus) {
  return (
    <>
      {(() => {
        switch (data) {
          case "Pending":
            return (
              <p className=" bg-orange-100 text-orange-500 text-xs text-center p-1 rounded-md font-semibold">
                Pending
              </p>
            );
          case "Reject":
            return (
              <p className=" bg-red-100 text-red-500 text-xs text-center p-1 rounded-md font-semibold">
                Reject
              </p>
            );
          case "Approve":
            return (
              <p className=" bg-blue-100 text-blue-500 text-xs text-center p-1 rounded-md font-semibold">
                Approve
              </p>
            );
          case "Complete":
            return (
              <p className=" bg-green-100 text-green-500 text-xs text-center p-1 rounded-md font-semibold">
                Complete
              </p>
            );
          case "Cancel":
            return (
              <p className=" bg-orange-100 text-orange-500 text-xs text-center p-1 rounded-md font-semibold">
                Cancel
              </p>
            );
          default:
            null;
        }
      })()}
    </>
  );
}

export default StyleStatus;
