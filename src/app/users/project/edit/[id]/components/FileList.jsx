import React, { useState } from "react";
import { FcDocument } from "react-icons/fc";

export default function FileList({ files, onChangeFile, onDeleteFile }) {
  return (
    <ul className="mt-3">
      {files?.map((file, index) => (
        <li key={index} className="flex items-center">
          <p className="text-sm">สัญญา {index + 1}</p>
          <File file={file} onChange={onChangeFile} onDelete={onDeleteFile} />
        </li>
      ))}
    </ul>
  );
}

function File({ file, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let fileContent;
  if (isEditing) {
    fileContent = (
      <>
        <input
          value={file.fileName}
          onChange={(e) => {
            onChange({
              ...file,
              fileName: e.target.value,
            });
          }}
          type="text"
          className="border py-3 px-5 w-1/2 rounded-md mt-1 text-xs"
        />
        <button
          type="button"
          onClick={() => {
            setIsEditing(false);
          }}
          className="bg-green-100 text-green-600  py-3 px-5 rounded-md mt-1 text-xs mx-2 hover:bg-green-600 hover:text-white transition"
        >
          Save
        </button>
      </>
    );
  } else {
    fileContent = (
      <>
        {file.fileName ? (
          <a 
          href={file.fileName}
          target="blank"
          >
            <FcDocument size={30} />
          </a>
        ) : (
          null
        )}
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="bg-violet-100 text-violet-600  py-3 px-5 rounded-md mt-1 text-xs mx-1 hover:bg-violet-600 hover:text-white transition"
        >
          Edit
        </button>
      </>
    );
  }
  return (
    <>
      {fileContent}
      <button
        type="button"
        onClick={() => {
          onDelete(file.id);
        }}
        className="bg-red-100 text-red-600  py-3 px-5 rounded-md mt-1 text-xs  hover:bg-red-600 hover:text-white transition"
      >
        Delete
      </button>
    </>
  );
}
