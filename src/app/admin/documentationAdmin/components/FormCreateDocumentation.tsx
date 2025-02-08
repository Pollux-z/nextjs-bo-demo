import BtnFormCreate from "@/app/components/button/BtnFormCreate";
import React from "react";

const FormCreateDocumentation: React.FC = () => {
  return (
    <form className="">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="title" className="text-xs">
            Title
          </label>
          <input
            placeholder="Enter Title"
            type="text"
            name="title"
            aria-label="title"
            className="py-5 px-5 w-full rounded-md  mt-1 text-xs border border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="discription" className="text-xs">
            Discription
          </label>
          <input
            placeholder="Enter discription"
            type="text"
            name="discription"
            aria-label="discription"
            className="py-5 px-5 w-full rounded-md  mt-1 text-xs border border-gray-300"
          />
        </div>

        <div>
          <label htmlFor="url" className="text-xs">
            URL Link
          </label>
          <input
            placeholder="Enter URL Link"
            type="text"
            name="url"
            aria-label="url"
            className="py-5 px-5 w-full rounded-md  mt-1 text-xs border border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="remark" className="text-xs">
            Remark
          </label>
          <input
            placeholder="Enter remark"
            type="text"
            name="remark"
            aria-label="remark"
            className="py-5 px-5 w-full rounded-md  mt-1 text-xs border border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="fileTypes" className="text-xs">
            File Types
          </label>
          <select
            title="fileType"
            name="fileType"
            id="fileType"
            className="py-5 px-5 w-full rounded-md  mt-1 text-xs border border-gray-300"
          >
            <option value="pdf">PDF</option>
            <option value="doc">DOC</option>
            <option value="xls">XLS</option>
            <option value="ppt">PPT</option>
          </select>
        </div>
      </div>
      <div>
        <BtnFormCreate isMutating={""} />
      </div>
    </form>
  );
};

export default FormCreateDocumentation;
