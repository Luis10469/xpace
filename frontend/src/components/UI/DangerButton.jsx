const DangerButton = ({
  children,
  onClick,
}) => {

  return (

    <button
      onClick={onClick}
      className="
        bg-red-600
        hover:bg-red-700
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

export default DangerButton;