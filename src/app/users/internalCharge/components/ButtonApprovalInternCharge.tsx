import React from "react";

interface IButtonApprovalInternCharge {
  onChangeStatus: (status: string) => void;
}

const ButtonApprovalInternCharge: React.FC<IButtonApprovalInternCharge> = ({
  onChangeStatus,
}) => {
  return (
    <div className="flex space-x-2">
      <button
        type="button"
        onClick={() => onChangeStatus("Approved")}
        className="bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm"
      >
        Approve
      </button>
      <button
        type="button"
        onClick={() => onChangeStatus("Rejected")}
        className="bg-red-100 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm"
      >
        Reject
      </button>
    </div>
  );
};

export default ButtonApprovalInternCharge;
