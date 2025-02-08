import React from "react";

function DocCarrecord() {
  return (
    <>
      <div className="py-3 px-2 bg-white mt-5 rounded-sm shadow-sm">
          <div id="carrecord">
            <div>
              <h3 className="font-bold  border-l-4 border-purple-400 px-3 py-2 text-xl">
                Car Record
              </h3>
              <div className="px-4 my-2">
                <p className=" underline">วิธีการจองรถบริษัท</p>
                <ul className="list-disc list-inside text-sm">
                  <li>เข้า Tab: Car Record</li>
                  <li>เลือกเมนู: Reserve</li>
                  <ul className="list-disc list-inside px-2">
                    <li>Destination: ระบุสถานที่เดินทาง</li>
                    <li>Start Data: วันที่ใช้งานรถ</li>
                    <li>Start Time: เวลาในการใช้งาน</li>
                    <li>End Time: เวลาสิ้นสุดการใช้งาน</li>
                    <li>Remark: ระบุหมายเหตุ (ถ้ามี)</li>
                  </ul>
                </ul>
              </div>
            </div>
            <div className="px-4">
              <p className=" underline">วิธีการบันทึการใช้งาน</p>
              <ul className="list-disc list-inside text-sm">
                <li>เข้า Tab: Car Record</li>
                <li>เลือกเมนู: Record (ไป)</li>
                <ul className="list-disc list-inside px-2">
                  <li>สถานที่จอดรถระบุด้านบน</li>
                  <li>ระยะทาง กม./ไมล์ ไป: ไม่ต้องระบุ</li>
                  <li>สถานที่ไป: สถานที่เดินทาง</li>
                  <li>Remark: ระบุหมายเหตุ (ถ้ามี)</li>
                </ul>
                <li>เลือกเมนู: Record (กลับ)</li>
                <ul className="list-disc list-inside px-2">
                  <li>สถานที่จอดรถระบุด้านบน</li>
                  <li>ระยะทาง กม./ไมล์ ไป: ไม่ต้องระบุ</li>
                  <li>สถานที่ไป: สถานที่เดินทาง</li>
                  <li>Remark: ระบุหมายเหตุ (ถ้ามี)</li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
    </>
  );
}

export default DocCarrecord;
