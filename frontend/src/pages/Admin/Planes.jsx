import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import toast from 'react-hot-toast';
import ConfirmModal from "../../components/Modals/ConfirmModal";


const formularioInicial = {
  nombre: '',
  velocidad: '',
  precio: '',
  descripcion: '',
};

const PlanesAdmin = () => {
  const [planes, setPlanes] = useState([]);
  const [form, setForm] = useState(formularioInicial);
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [planAEliminar, setPlanAEliminar] = useState(null);
  const cargarPlanes = async () => {
    try {
      setCargando(true);

      const { data } = await api.get('/planes');

      setPlanes(data);
    } catch (error) {
      console.error(error);
      toast.error('No se pudieron cargar los planes');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPlanes();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const abrirNuevo = () => {
    setForm(formularioInicial);
    setEditando(null);
    setMostrarFormulario(true);
  };

  const abrirEditar = (plan) => {
    setForm({
      nombre: plan.nombre || '',
      velocidad: plan.velocidad || '',
      precio: plan.precio || '',
      descripcion: plan.descripcion || '',
    });

    setEditando(plan.id);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setEditando(null);
    setForm(formularioInicial);
  };

  const guardarPlan = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.velocidad || !form.precio) {
      toast.error('Completa nombre, velocidad y precio');
      return;
    }

    try {
      setGuardando(true);

      const datos = {
        nombre: form.nombre.trim(),
        velocidad: form.velocidad.trim(),
        precio: Number(form.precio),
        descripcion: form.descripcion.trim(),
      };

      if (editando) {
        await api.put(`/planes/${editando}`, {
          ...datos,
          estado: 1,
        });

        toast.success('Plan actualizado');
      } else {
        await api.post('/planes', datos);

        toast.success('Plan creado');
      }

      cerrarFormulario();
      await cargarPlanes();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        'No se pudo guardar el plan'
      );
    } finally {
      setGuardando(false);
    }
  };
const abrirEliminarPlan = (plan) => {

  setPlanAEliminar(plan);

  setMostrarConfirmacion(true);

};


 const eliminarPlan = async () => {

  if (!planAEliminar) return;

  try {

    await api.delete(`/planes/${planAEliminar.id}`);

    toast.success("Plan desactivado");

    setMostrarConfirmacion(false);

    setPlanAEliminar(null);

    await cargarPlanes();

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "No se pudo desactivar el plan"
    );

  }

};

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(Number(precio));
  };

  return (
    <div className="space-y-6">

      {/* ENCABEZADO */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <p className="text-blue-400 uppercase text-sm font-semibold tracking-widest">
            Administración
          </p>

          <h1 className="text-4xl font-black text-white">
            Gestión de Planes
          </h1>

          <p className="text-slate-400 mt-2">
            Administra los planes disponibles para los clientes.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirNuevo}
          className="bg-blue-600 hover:bg-blue-700
          text-white px-5 py-3 rounded-xl
          font-bold shadow-lg transition"
        >
          + Nuevo Plan
        </button>

      </div>

      {/* FORMULARIO */}
      {mostrarFormulario && (
        
<div className="bg-slate-800 rounded-2xl p-10 text-center border border-slate-700">
          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold text-white">
              {editando ? 'Editar plan' : 'Nuevo plan'}
            </h2>

            <button
              type="button"
              onClick={cerrarFormulario}
              className="text-slate-400 hover:text-red-400 text-2xl"
            >
              ×
            </button>

          </div>

          <form onSubmit={guardarPlan}>

            <div className="grid md:grid-cols-2 gap-5">

              {/* NOMBRE */}
              <div>
                <label className="block font-semibold text-slate-300 mb-2">
                  Nombre
                </label>

               <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Plan Familiar"
                className="w-full px-4 py-3 bg-slate-900 text-white placeholder:text-slate-500 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
/>
              </div>

              {/* VELOCIDAD */}
              <div>
                <label className="block font-semibold text-slate-300 mb-2">
                  Velocidad
                </label>

                      <input
                        type="text"
                        name="velocidad"
                        value={form.velocidad}
                        onChange={handleChange}
                        placeholder="Ej: 100 MB"
                        className="w-full px-4 py-3 bg-slate-900 text-white placeholder:text-slate-500 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
              </div>

              {/* PRECIO */}
              <div>
                <label className="block font-semibold text-slate-300 mb-2">
                  Precio mensual
                </label>
                
                <input
                  type="number"
                  name="precio"
                  value={form.precio}
                  onChange={handleChange}
                  placeholder="59900"
                  min="0"
                  step="100"
                  className="w-full px-4 py-3 bg-slate-900 text-white placeholder:text-slate-500 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* DESCRIPCIÓN */}
              <div>
                <label className="block font-semibold text-slate-300 mb-2">
                  Descripción
                </label>

              <input
  type="text"
  name="descripcion"
  value={form.descripcion}
  onChange={handleChange}
  placeholder="Descripción del plan"
  className="w-full px-4 py-3 bg-slate-900 text-white placeholder:text-slate-500 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>
              </div>

            </div>

            {/* BOTONES */}
            <div className="flex gap-3 mt-6">

              <button
                type="submit"
                disabled={guardando}
                className="bg-blue-600 hover:bg-blue-700
                disabled:bg-blue-300
                text-white px-6 py-3 rounded-xl font-bold"
              >
                {guardando
                  ? 'Guardando...'
                  : editando
                    ? 'Actualizar plan'
                    : 'Crear plan'}
              </button>

                  <button
                  type="button"
                  onClick={cerrarFormulario}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  Cancelar
                </button>
            </div>

          </form>

        </div>
      )}

      {/* LISTADO */}
      <div>

        {cargando ? (
          <div className="bg-slate-800 rounded-2xl p-10 text-center shadow">
            <p className="text-slate-400">
              Cargando planes...
            </p>
          </div>
        ) : planes.length === 0 ? (
          <div className="bg-slate-800 rounded-2xl p-10 text-center shadow">
            <p className="text-slate-400">
              No hay planes activos registrados.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {planes.map((plan) => (
              <div
                key={plan.id}
               className="
              bg-slate-800
                rounded-2xl
                shadow-lg
                border
                border-slate-700
                p-6
                hover:-translate-y-1
                hover:shadow-blue-500/10
                transition-all
                duration-300
                "
              >

                <div className="flex justify-between items-start gap-3">

                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {plan.nombre}
                    </h3>

                    <p className="text-blue-600 font-bold mt-1">
                      {plan.velocidad}
                    </p>
                  </div>

                  <span className="
                    bg-green-500/20
                    text-green-400
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-bold
                  ">
                    Activo
                  </span>

                </div>

                <p className="text-3xl font-black text-blue-400 mt-6">
                  {formatearPrecio(plan.precio)}
                  <span className="text-sm text-gray-400 font-normal">
                    {' '}/ mes
                  </span>
                </p>

                <p className="text-slate-400 mt-4 min-h-[48px]">
                  {plan.descripcion || 'Sin descripción'}
                </p>

                <div className="flex justify-end gap-3 mt-8">

                  <button
                    type="button"
                    onClick={() => abrirEditar(plan)}
                    className="flex-1 bg-yellow-500
                    hover:bg-yellow-600 text-white
                    px-4 py-2.5 rounded-xl font-bold"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => abrirEliminarPlan(plan)}
                    className="flex-1 bg-red-500
                    hover:bg-red-600 text-white
                    px-4 py-2.5 rounded-xl font-bold"
                  >
                    Eliminar
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

            </div>

      <ConfirmModal
        open={mostrarConfirmacion}
        title="¿Desactivar este plan?"
        message={`¿Seguro que quieres desactivar el plan "${planAEliminar?.nombre}"?`}
        subMessage="El plan dejará de estar disponible para nuevos clientes."
        icon="warning"
        color="red"
        confirmText="Sí, desactivar"
        cancelText="Cancelar"
        onConfirm={eliminarPlan}
        onCancel={() => {
          setMostrarConfirmacion(false);
          setPlanAEliminar(null);
        }}
      />

    </div>
  );
};

export default PlanesAdmin;