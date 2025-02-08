import React from 'react'

function DocCoverletter() {
  return (
    <>
    <div className="py-3 px-2 bg-white mt-5 rounded-sm shadow-sm">
          <div id="carrecord">
            <div>
              <h3 className="font-bold  border-l-4 border-purple-400 px-3 py-2 text-xl">
                Cover letter
              </h3>
              <div className="px-4 my-2">
                <p className=" underline">วิธีการขอเลข Cover letter</p>
                <ul className="list-disc list-inside text-sm">
                  <li>เข้า Tab: Cover letter</li>
                  <li>เลือกเมนู: Create post</li>
                  <ul className="list-disc list-inside px-2">
                    <li>Subject: ระบุหัวข้อความต้องการ</li>
                    <li>
                      Project: เลือกโปรเจค หากเป็น Project ใหม่ให้เลือก New
                      Project
                    </li>
                    <li>Date Issue: เวลาในการใช้งาน</li>
                    <li>Remark: ระบุหมายเหตุ (ถ้ามี)</li>
                  </ul>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default DocCoverletter