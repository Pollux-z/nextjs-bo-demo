import React, { useState } from "react";

function AddFile({ onAddFile }) {
  const [showError, setShowError] = useState('')
  const [file, setFile] = useState("");

  const handleError = () => {
    if(!file){
      setShowError('Pleas input data')
      return;
    }
    onAddFile(file)
    setShowError('')
  }

  return (
    <div className="">
   
      <input
        value={file}
        onChange={(e) => setFile(e.target.value)}
        type="text"
        placeholder="Add file"
        className="border py-3 px-5 w-1/2 rounded-md mt-1 text-xs"
      />
      <button
        type="button"
        onClick={() => {
          handleError();
          setFile("");
          ;
        }}
        className="bg-sky-100 text-sky-600  py-3 px-5 rounded-md mt-1 text-xs mx-2 hover:bg-sky-600 hover:text-white transition"
      >
        Add
      </button>
      <p className={showError ? "bg-red-100 text-red-600 py-1 px-2 my-1 text-sm w-1/2 font-semibold rounded-md" : null}>{showError}</p>
    </div>
  );
}

export default AddFile;
