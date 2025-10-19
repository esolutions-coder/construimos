type InputBox = {
  onChange: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  labelTag: string;
  inputName: string;
  isEmpty: boolean
  value: string | undefined
  type: "text" | "number" | "password" | "email"
  className?: string
  disabled?: boolean
};
export default function InputBox({ onChange, labelTag, inputName, isEmpty, value, type, className, disabled }: InputBox) {
  return (
    <div className= {`input_container gap_12 ${isEmpty ? 'error' : ''} ${className || 
      ""
    }`}>
      <label htmlFor={inputName}>{labelTag}</label>
      <input
        type={type}
        className={`editable_input width_100`}
        name={inputName}
        id={inputName}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}
