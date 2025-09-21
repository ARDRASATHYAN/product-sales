const Selector = ({
  label,
  options = [],
  value,
  onChange,
  optionLabelKey = "label",
  optionValueKey = "id",
  placeholder = "-- Select --",
  disabled = false,
}) => {
  return (
    <div className="mb-2">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <select
        className="border rounded p-2 w-full"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt[optionValueKey]} value={opt[optionValueKey]}>
            {opt[optionLabelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;