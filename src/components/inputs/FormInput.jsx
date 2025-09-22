export default function FormInput({
  label,
  id,
  type,
  name,
  min,
  value = "",
  onchange,
  placeholder,
  require = false,
  styling,
  disable = false,
}) {
  const color = value === "__EMPTY__" ? "red" : "gray";
  // const color = dispatch(inputCheck({ key: name, value: value }))
  //   ? "red"
  //   : "gray";

  return (
    <div>
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium text-${color}-900 dark:text-white ${styling}`}>
        {label} {require ? <strong className="text-rose-500">*</strong> : ""}
      </label>
      <input
        type={type}
        min={min}
        name={name}
        id={id}
        value={value !== "__EMPTY__" ? value : ""}
        onChange={onchange}
        placeholder={placeholder}
        required={require}
        disabled={disable}
        className={`bg-${color}-50 border border-${color}-400 text-${color}-900 text-sm rounded-lg focus:ring-rose-600 focus:border-rose-600 block w-full p-2.5 dark:bg-${color}-700 dark:border-${color}-600 dark:placeholder-${color}-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-500`}
      />
    </div>
  );
}
