const SecondaryButton = ({
  children,
  onClick,
}) => {

  return (

    <button
      onClick={onClick}
      className="
        bg-slate-600
        hover:bg-slate-500
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

export default SecondaryButton;