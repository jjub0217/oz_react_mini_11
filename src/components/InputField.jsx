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
    <div className="flex flex-col items-start w-full">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-black w-full"
      />
      <span className="w-full text-left">
        <Strong>{errorMessage}</Strong>
      </span>
    </div>
  );
};
