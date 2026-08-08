import TicketStatCard from "./TicketStatCard";

const TicketStats = ({ dashboard }) => {
  // ======================================
  // ESTADÍSTICAS
  // ======================================

  const estadisticas = [
    {
      titulo: "Todos",
      valor: dashboard?.total ?? 0,
      icono: "🎫",
      color: "text-blue-500",
      borde: "hover:border-blue-500",
    },
    {
      titulo: "Pendientes",
      valor: dashboard?.pendientes ?? 0,
      icono: "🟠",
      color: "text-orange-400",
      borde: "hover:border-orange-400",
    },
    {
      titulo: "En proceso",
      valor: dashboard?.proceso ?? 0,
      icono: "🟡",
      color: "text-yellow-500",
      borde: "hover:border-yellow-500",
    },
    {
      titulo: "Respondidos",
      valor: dashboard?.respondidos ?? 0,
      icono: "💬",
      color: "text-violet-400",
      borde: "hover:border-violet-400",
    },
    {
      titulo: "Resueltos",
      valor: dashboard?.resueltos ?? 0,
      icono: "✅",
      color: "text-emerald-500",
      borde: "hover:border-emerald-500",
    },
    {
      titulo: "Cerrados",
      valor: dashboard?.cerrados ?? 0,
      icono: "✅",
      color: "text-emerald-500",
      borde: "hover:border-emerald-500",
    },
    {
      titulo: "Por responder",
      valor: dashboard?.pendientesRespuesta ?? 0,
      icono: "🔔",
      color: "text-red-400",
      borde: "hover:border-red-400",
    },
  ];

  return (
    <div
      className="
        flex
        flex-nowrap
        gap-4
        w-full
        overflow-x-auto
        pb-2
        mb-6
      "
    >
      {estadisticas.map((item) => (
        <div
          key={item.titulo}
          className="flex-1 min-w-[180px]"
        >
          <TicketStatCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default TicketStats;
