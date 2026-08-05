const PageCard = ({ children, className = "" }) => {

  return (

    <div
      className={`
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        shadow-xl
        p-6
        ${className}
      `}
    >

      {children}

    </div>

  );

};

export default PageCard;