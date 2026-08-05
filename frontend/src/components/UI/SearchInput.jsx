const SearchInput = ({
  value,
  onChange,
  placeholder,
}) => {

  return (

    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-full
        bg-slate-800
        border
        border-slate-700
        rounded-xl
        px-5
        py-3
        text-white
        placeholder:text-slate-500
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    />

  );

};

export default SearchInput;