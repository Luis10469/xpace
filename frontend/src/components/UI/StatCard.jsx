const StatCard = ({
  title,
  value,
  color = "text-blue-500",
  icon,
}) => {

  return (

    <div
      className="
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        shadow-xl
        p-8
        flex
        flex-col
        items-center
        justify-center
        hover:border-blue-500
        transition-all
      "
    >

      <p className="text-slate-400 text-lg">

        {icon} {title}

      </p>

      <h2 className={`text-5xl font-bold mt-5 ${color}`}>

        {value}

      </h2>

    </div>

  );

};

export default StatCard;