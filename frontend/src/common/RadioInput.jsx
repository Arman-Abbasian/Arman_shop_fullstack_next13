function RadioInput({ id, name, value, onChange, checked, label }) {
  return (
    <div className="flex items-center gap-x-2 text-secondary-600">
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        value={value}
        onChange={onChange}
        className="cursor-pointer rounded-full border-none bg-secondary-100/80 w-4 h-4 checked:text-primary-900"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}
export default RadioInput;
