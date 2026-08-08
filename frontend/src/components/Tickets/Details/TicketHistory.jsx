const TicketHistory = ({ historial = [] }) => (
  <section
    className="
      h-[260px]
      overflow-hidden
      rounded-2xl
      border
      border-slate-700
      bg-slate-800
      p-4
      flex
      flex-col
    "
  >

    {/* CABECERA */}
    <div className="flex items-center justify-between mb-3 shrink-0">
      <h2 className="text-lg font-bold text-white">
        Registro
      </h2>

      <span className="text-xs text-slate-500">
        {historial.length} movimientos
      </span>
    </div>


    {/* HISTORIAL */}
    <div
      className="
        flex-1
        overflow-y-auto
        pr-2
        scrollbar-thin
        scrollbar-thumb-slate-600
        scrollbar-track-transparent
      "
    >
      {historial.length ? (
        <ol className="space-y-4 border-l border-slate-700 pl-4">

          {historial.map((evento) => (
            <li
              key={evento.id}
              className="relative text-xs"
            >

              <span
                className="
                  absolute
                  -left-[21px]
                  top-1
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-blue-500
                "
              />

              <p className="font-semibold text-white">
                {evento.accion}
              </p>

              <p className="mt-1 text-slate-400">
                {evento.usuario}
                {" · "}
                {evento.fecha
                  ? new Date(evento.fecha).toLocaleString("es-CO")
                  : ""}
              </p>

            </li>
          ))}

        </ol>
      ) : (
        <p className="text-sm text-slate-400">
          Aún no hay movimientos registrados.
        </p>
      )}
    </div>

  </section>
);

export default TicketHistory;