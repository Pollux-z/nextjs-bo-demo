import React from "react";

function DocMeetingRoom() {
  return (
    <>
      <div className="py-3 px-2 bg-white mt-5 rounded-sm shadow-sm">
        <div id="carrecord">
          <div>
            <h3 className="font-bold  border-l-4 border-purple-400 px-3 py-2 text-xl">
              Meeting Room
            </h3>
            <div className="px-4 my-2">
              <p className=" underline">วิธีการจองห้องประชุม</p>
              <ul className="list-disc list-inside text-sm">
                <li>เข้า Tab: Meeting Room</li>
                <li>เลือกเมนู: Reserve</li>
                <ul className="list-disc list-inside px-2">
                  <li>Subject: ระบุหัวข้อในการประชุม</li>
                  <li>Meeting Room: เลือกห้องประชุมที่ต้องการใช้่งาน</li>
                  <li>Use Date: เวลาในการใช้งาน</li>
                  <li>Start Time: เวลาการใช้งาน</li>
                  <li>End Time: เวลาสิ้นสุดการใช้งาน</li>
                  <li>Remark: ระบุหมายเหตุ (ถ้ามี)</li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocMeetingRoom;
