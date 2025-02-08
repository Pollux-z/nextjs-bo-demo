type InputProjectType = {
  labelText: string;
  onChange: any;
  placeholder: string | undefined;
  type: string;
  name: string;
  value: string | string[] | undefined;
};

const InputCreateProject: React.FC<InputProjectType> = ({
  labelText,
  onChange,
  placeholder,
  type,
  name,
  value,
}) => {
  return (
    <div className="max-h-20 min-h-20">
      <label htmlFor="nameTh" className="text-xs">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        name={name}
        aria-label={name}
        className=" border py-5 px-5 w-full rounded-md mt-1 text-xs"
      />
    </div>
  );
};

export default InputCreateProject;
