const Badge = ({
  children,
  color = "blue",
}) => {

  const colors = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    red: "bg-red-500/20 text-red-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    purple: "bg-purple-500/20 text-purple-400",
    gray: "bg-slate-600/20 text-slate-300",
  };

  return (

    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-bold
        ${colors[color]}
      `}
    >

      {children}

    </span>

  );

};

export default Badge;