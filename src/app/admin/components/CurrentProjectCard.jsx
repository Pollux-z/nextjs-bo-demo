import React from "react";
import Card from "./Card";

import { GoArrowUpLeft } from "react-icons/go";

function CurrentProjectCard() {
  return (
    <Card>
      <h3 className="text-sm">Currnet Project</h3>
      <h3 className="text-2xl mt-5">22 Project</h3>
      <div className="flex items-center space-x-2">
        <GoArrowUpLeft
          size={15}
          className="bg-green-100 rounded-full text-green-600 h-6 w-6"
        />
        <p className="text-xs">+9% last year</p>
      </div>
      <div className="flex space-x-2 mt-3">
        <div className="mt-3 flex items-center space-x-2">
          <div className="h-3 w-3 bg-blue-300 rounded-full"></div>
          <div>
            <p className="text-xs">2023</p>
          </div>
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <div className="h-3 w-3 bg-slate-300 rounded-full"></div>
          <div>
            <p className="text-xs">2024</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CurrentProjectCard;
