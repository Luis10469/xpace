const EmptyState = ({
  message = "No hay registros."
}) => {

  return (

    <div className="text-center py-16 text-slate-400">

      <div className="text-5xl mb-4">

        📭

      </div>

      <p className="text-lg">

        {message}

      </p>

    </div>

  );

};

export default EmptyState;