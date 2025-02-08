import React from "react";

type TaskEditProps = {
  state: any;
  onChange: (state: any) => void;
  onDelete: (id: number) => void;
};

const TaskEdit: React.FC<TaskEditProps> = ({ state, onChange, onDelete }) => {
  const [edit, setEdit] = React.useState(false);
  let textContent;

  if (edit) {
    textContent = (
      <>
        <input
          placeholder="Type here"
          type="text"
          value={state.text}
          onChange={(e) => onChange({ ...state, text: e.target.value })}
        />
        <button onClick={() => setEdit(false)}>Save</button>
      </>
    );
  } else {
    textContent = (
      <>
        {state?.text}
        <button onClick={() => setEdit(true)}>Edit</button>
      </>
    );
  }

  return (
    <>
      {textContent}
      <button onClick={() => onDelete(state.id)}>Delete</button>
    </>
  );
};

export default TaskEdit;
