const PageHeader = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8">

      <div>

        <p className="text-blue-400 uppercase text-sm font-semibold tracking-widest">
          Administración
        </p>

        <h1 className="text-4xl font-bold text-white mt-1">
          {title}
        </h1>

        <p className="text-slate-400 mt-2">
          {subtitle}
        </p>

      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="
            bg-blue-600
            hover:bg-blue-700
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
            shadow-lg
          "
        >
          {buttonText}
        </button>
      )}

    </div>
  );
};

export default PageHeader;