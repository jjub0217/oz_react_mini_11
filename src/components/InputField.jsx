import Strong from "./Strong";

export const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col items-start w-full ">
      <label htmlFor={name} className="blind">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-[#fff] w-full bg-[#2f2f2f] pl-[20px] 
        py-[20px] placeholder:text-[#888] outline-0
        focus:bg-[#fff]  focus:text-[#252525] rounded-[10px]
        "
        autoComplete="on"
      />
      <span className="w-full text-left min-h-[1.5rem] block">
        <Strong>{errorMessage}</Strong>
      </span>
    </div>
  );
};
