import React, { useEffect, useReducer } from "react";
import AddFile from "./AddFile";
import FileList from "./FileList";

function fileReducer(files, action) {
  switch (action.type) {
    case "added": {
      return [
        ...files,
        {
          id: action.id,
          fileName: action.fileName,
        },
      ];
    }

    case "changed":
      return files.map((file) => {
        if (file.id === action.fileName.id) {
          return action.fileName;
        } else {
          return file;
        }
      });
    case "deleted":
      return files.filter((file) => file.id != action.id);
  }
}

let fileId = 0;

export default function FileEditProject({ data, setData }) {
  // const defualtData = data ? data : [];

  const [files, dispath] = useReducer(fileReducer, data);

  let lastData = files?.findLast((element) => element.id >= 0);
  let lastId = lastData ? lastData.id + 1 : 0;

  function handleAdded(file) {
    dispath({
      type: "added",
      id: lastId,
      fileName: file,
    });
  }
  const handleChangeFile = (file) => {
    dispath({
      type: "changed",
      fileName: file,
    });
  };
  const handleDeleteFile = (fileId) => {
    dispath({
      type: "deleted",
      id: fileId,
    });
  };

  useEffect(() => {
    setData(files)
  }, [files])

  return (
    <div className="">
      <AddFile onAddFile={handleAdded} />
      <FileList
        files={files}
        onChangeFile={handleChangeFile}
        onDeleteFile={handleDeleteFile}
      />
    </div>
  );
}
