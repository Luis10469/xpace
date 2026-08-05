const PrimaryButton = ({
  children,
  onClick,
  type = "button",
}) => {

  return (

    <button
      type={type}
      onClick={onClick}
      className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-6
        py-3
        rounded-xl
        font-semibold
        transition
      "
    >

      {children}

    </button>

  );

};

export default PrimaryButton;