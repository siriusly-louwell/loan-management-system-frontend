import SmallSpin from "../loading components/SmallSpin";

export default function FormInput({
  label,
  id,
  type,
  name,
  min,
  value = "",
  onchange,
  placeholder,
  loading,
  require = false,
  styling,
  disable = false,
}) {
  const color = value === "__EMPTY__" ? "red" : "gray";
  const darkRed =
    value === "__EMPTY__" ? "dark:bg-red-700/30" : `dark:bg-${color}-700`;

  return (
    <div>
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium text-${color}-900 dark:text-white ${styling}`}>
        {label} {require ? <strong className="text-rose-500">*</strong> : ""}
      </label>

      {loading ? (
        <section className="flex items-center gap-1">
          <SmallSpin size={20} />
          <span className="text-sm text-gray-300 dark:text-gray-500">Fetching location...</span>
        </section>
      ) : (
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
          className={`bg-${color}-50 border border-${color}-400 text-${color}-900 text-sm rounded-lg focus:ring-rose-600 focus:border-rose-600 block w-full p-2.5 ${darkRed}  dark:border-${color}-600 dark:placeholder-${color}-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-500`}
        />
      )}
    </div>
  );
}
