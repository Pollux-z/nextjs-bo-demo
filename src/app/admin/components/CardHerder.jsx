import React from "react";

import { 
  FcBusinessman,
  FcElectricalThreshold,
  FcContacts,
  FcNews,
 } from "react-icons/fc";

function CardHerder() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-5 *:grid *:justify-center *:items-center *:text-center *:py-8 *:rounded-md *:shadow-md">
        <div className="bg-[#ECF2FF] text-blue-500">
          <FcBusinessman size={80}/>
          <div>
            <h3>Employees</h3>
            <h5 className="text-3xl">10</h5>
          </div>
        </div>
        <div className="bg-[#FDF5E5] text-orange-500">
        <FcContacts size={80}/>
          <div>
            <h3>Clients</h3>
            <h5 className="text-3xl">14</h5>
          </div>
         
        </div>
        <div className="bg-[#E8F7FF] text-cyan-500">
        <FcElectricalThreshold size={80}/>
          <div>
            <h3>Project</h3>
            <h5 className="text-3xl">10</h5>
          </div>
         
        </div>
        <div className="bg-[#FCEDE8] text-red-500">
        <FcNews size={80}/>
          <div>
            <h3>Report</h3>
            <h5 className="text-3xl">10</h5>
          </div>
       
        </div>
      </div>
    </div>
  );
}

export default CardHerder;
