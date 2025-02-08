import React from "react";

export function ReleaseV205() {
  return (
    <div className="mt-5">
      <h3 className="text-xl font-semibold">Website Bo 2.0.5</h3>
      <p className="text-sm  font-medium mt-3">3 Sep 2024</p>
      <p className="font-semibold mt-3">{`What's new`}</p>
      <ul className="list-disc px-5 mt-3 text-sm">
        <li>TIME OFF (Admin): เพิ่ม Function export Time-Off</li>
      </ul>
      <p className="font-semibold mt-3">Bug fix</p>
      <ul className="list-disc px-5 mt-3 text-sm">
        <li>แก้ไขการแสดงผลวันลาในหน้า TIME Off</li>
      </ul>
    </div>
  );
}

export function ReleaseV204() {
    return (
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Website Bo 2.0.4</h3>
        <p className="text-sm  font-medium mt-3">22 Aug 2024</p>
        <p className="font-semibold mt-3">{`What's new`}</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>TIME OFF (Admin): เพิ่ม Function export Time-Off</li>
        </ul>
        <p className="font-semibold mt-3">Bug fix</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>แก้ไขการแสดงผลวันลาในหน้า TIME Off</li>
        </ul>
      </div>
    );
  }

  export function ReleaseV203() {
    return (
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Website Bo 2.0.3</h3>
        <p className="text-sm  font-medium mt-3">16 Aug 2024</p>
        <p className="font-semibold mt-3">{`What's new`}</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>Swap Date [Admin] : เพิ่มการดูข้อมูล สร้าง, แก้ไข,  ลบ</li>
          <li>TIMER [Admin]: เพิ่มปุ่ม Search หาข้อมูลพนักงาน</li>
          <li>TIME OFF: การแจ้งเตือนทาง Email หากมีการ Create, Approve, Reject </li>
        </ul>
        <p className="font-semibold mt-3">Bug fix</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>เพิ่มประสิทธภาพในการใช้งานและดึงข้อมูล</li>
        </ul>
      </div>
    );
  }

  export function ReleaseV202() {
    return (
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Website Bo 2.0.2</h3>
        <p className="text-sm  font-medium mt-3">13 Aug 2024</p>
        <p className="font-semibold mt-3">{`What's new`}</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>เพิ่มส่วนของการจัดการสำหรับ Admin</li>
          <li>Time-off [Admin] : สามารถลบ request และคืนวันลาได้</li>
          <li>Meeting room [Admin]: โชว์ข้อมูลการจองและสามารถแก้ไข, ลบ</li>
        </ul>
        <p className="font-semibold mt-3">Bug fix</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>ปรับสิทธิ์ในการสร้าง request Swap date ให้สร้างเฉพาะ admin</li>
        </ul>
      </div>
    );
  }

  export function ReleaseV201() {
    return (
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Website Bo 2.0.1</h3>
        <p className="text-sm  font-medium mt-3">6 Aug 2024</p>
        <p className="font-semibold mt-3">{`What's new`}</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>TIMER: เพิ่มเกี่ยวกับการดูอายุพนักงาน</li>
          <li>TIME-OFF: แสดงการลาของแต่ละคน</li>
        </ul>
        {/* <p className="font-semibold mt-3">Bug fix</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>แก้ไขเกี่ยวกับตัวเลือกให้ตรงกับขนาดหน้าจอ</li>
        </ul> */}
      </div>
    );
  }

  export function ReleaseV200() {
    return (
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Website Bo 2.0.0</h3>
        <p className="text-sm  font-medium mt-3">1 Aug 2024</p>
        <p className="font-semibold mt-3">{`What's new`}</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>TIME-Off: กดลาในระบบใหม่ได้และสามารถ Approve จาก PM, Manager </li>
          <li>Top-UP: เพิ่มวันลาต่าง ๆ</li>
          <li>Swap-date: เพิ่มวันลาหากทำงานในวันหยุด</li>
          <li>Project: ดูข้อมูลเกี่ยวกับ Project</li>
        </ul>
        <p className="font-semibold mt-3">Bug fix</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>แก้ไขเกี่ยวกับตัวเลือกให้ตรงกับขนาดหน้าจอ</li>
        </ul>
      </div>
    );
  }

  export function ReleaseV102() {
    return (
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Website Bo 1.0.2</h3>
        <p className="text-sm  font-medium mt-3">03 July 2024</p>
        <p className="font-semibold mt-3">{`What's new`}</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>MeetingRoom, ตรวจสอบเวลาของการจอง Meeting Room</li>
          <li>MeetingRoom, เพิ่มปุ่ม Delete การจอง Meeting Room  โดยสิทธิ์ในการลบนั้นเฉพาะผู้ที่สร้างและ Admin เท่านั้น</li>
          <li>ระบบขอ Cover letter</li>
          <li>ระบบข้อมูลพนักงาน</li>
        </ul>
        <p className="font-semibold mt-3">Bug fix</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>แก้ไขเกี่ยวกับตัวเลือกให้ตรงกับขนาดหน้าจอ</li>
        </ul>
      </div>
    );
  }

  export function Release101() {
    return (
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Website Bo 1.0.1</h3>
        <p className="text-sm  font-medium mt-3">01 July 2024</p>
        <p className="font-semibold mt-3">{`What's new`}</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>ระบบจองรถ</li>
          <li>ระบบจองห้องประชุม</li>
          <li>ระบบขอ Cover letter</li>
          <li>ระบบข้อมูลพนักงาน</li>
        </ul>
      </div>
    );
  }