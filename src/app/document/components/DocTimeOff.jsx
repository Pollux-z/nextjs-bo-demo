import React from "react";

function DocTimeOff() {
  return (
    <>
      <div className="py-3 px-2 bg-white mt-5 rounded-sm shadow-sm">
        <div id="carrecord">
          <div>
            <h3 className="font-bold  border-l-4 border-purple-400 px-3 py-2 text-xl">
              Time Off
            </h3>
            <div className="px-4 my-2">
              <p className=" underline">วิธีการกดลา</p>
              <ul className="list-disc list-inside text-sm">
                <li>เข้า Tab: Time off</li>
                <li>เลือกเมนู: + Create</li>
                <ul className="list-disc list-inside px-2">
                  <li>Type of Leave: ระบุประเภทการลา</li>
                  <li>Reason for leave: ระบุหมายเหตุการลา</li>
                  <li>Issue Time: เลือกวันลา</li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="px-4">
            <p className=" underline">
              วิธีการ Approve วันลา (เฉพาะ PM, Manager)
            </p>
            <ul className="list-disc list-inside text-sm">
              <li>เข้า Tab: Time off</li>
              <li>เลือกเมนู: Approve</li>
              <ul className="list-disc list-inside px-2">
                <li>เลือกรายชื่อที่ต้องการ Approve</li>
                <li>(เฉพาะ PM, Manager): ปุ่ม Approve [สีน้ำเงิน]</li>
                <li>(เฉพาะ PM, Manager): ปุ่ม Reject [สีแดง]</li>
                <li>(เฉพาะ HR): ปุ่ม Complete [สีเขียว]</li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocTimeOff;
