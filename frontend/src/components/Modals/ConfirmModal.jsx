import { AlertTriangle, Trash2, UserRound } from "lucide-react";

const iconos = {
  warning: AlertTriangle,
  delete: Trash2,
  user: UserRound,
};

const colores = {
  blue: {
    circle: "border-blue-500",
    icon: "text-blue-400",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  red: {
    circle: "border-red-500",
    icon: "text-red-400",
    button: "bg-red-600 hover:bg-red-700",
  },
  yellow: {
    circle: "border-yellow-500",
    icon: "text-yellow-400",
    button: "bg-yellow-600 hover:bg-yellow-700",
  },
};

const ConfirmModal = ({
  open,
  title,
  message,
  subMessage,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  color = "blue",
  icon = "warning",
  onConfirm,
  onCancel,
}) => {

  if (!open) return null;

  const Icon = iconos[icon] || AlertTriangle;
  const estilo = colores[color] || colores.blue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-3xl bg-slate-800 border border-slate-700 shadow-2xl">

        <div className="px-10 pt-10 pb-8 text-center">

          <div
            className={`
              mx-auto
              mb-6
              flex
              h-28
              w-28
              items-center
              justify-center
              rounded-full
              border-4
              ${estilo.circle}
            `}
          >
            <Icon size={56} className={estilo.icon} />
          </div>

          <h2 className="text-5xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-6 text-xl text-slate-300">
            {message}
          </p>

          {subMessage && (
            <p className="mt-2 text-lg text-slate-400">
              {subMessage}
            </p>
          )}

        </div>

        <div className="border-t border-slate-700 px-8 py-7 flex gap-5">

          <button
            onClick={onCancel}
            className="flex-1 rounded-xl bg-slate-600 py-4 text-xl font-semibold text-white transition hover:bg-slate-500"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl py-4 text-xl font-semibold text-white transition ${estilo.button}`}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );

};

export default ConfirmModal;