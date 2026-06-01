import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Trash, Pencil, Clock, Activity, CheckCircle } from 'lucide-react'
import { useState, useEffect } from "react"
import ApiDatos from "../../services/ApiDatos"
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import { FormPersona } from "../../components/Persona"
import { ListPersonas } from '../../components/Persona/ListaPersonas/ListPersonas'

export function Dashboard() {
  const [datos, setDatos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [open, setOpen] = useState(false);
const { usuario } = useContext(AuthContext)
  const navigate = useNavigate();
  const handleOpen = () => { setOpen(!open) };

  const datosBd = async () => {
  const datosbd = await ApiDatos.getDatos();
  // Solo trabajadores (rol tecnico) excluyendo al admin logueado
  const soloTecnicos = datosbd.data.filter(
    (p) => p.rol === "tecnico" && p._id !== usuario?.id
  );
  setDatos(soloTecnicos);
}

  // Traemos los servicios para contar los estados
  const serviciosBd = async () => {
    const respuesta = await ApiDatos.getServicios();
    setServicios(respuesta.data);
  }

  // Contamos cuántos servicios hay de cada estado
  const contar = (estado) => servicios.filter((s) => s.estado === estado).length

  const stats = [
    { id: 1, label: "Servicios pendientes", value: contar("Pendiente"), icon: <Clock />, color: "blue" },
    { id: 2, label: "Servicios en proceso", value: contar("En proceso"), icon: <Activity />, color: "amber" },
    { id: 3, label: "Servicios finalizados", value: contar("Finalizado"), icon: <CheckCircle />, color: "emerald" },
  ]

  const eliminarPerson = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este dato?",
      text: "Se borrará de la BD",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ApiDatos.deletePersona(id);
          datosBd();
          Swal.fire({
            title: "¡Eliminado!",
            text: "El registro ha sido borrado con éxito.",
            icon: "success"
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el registro.",
            icon: "error"
          });
        }
      }
    });
  }

  useEffect(() => {
    datosBd();
    serviciosBd();
  }, [])


  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Resumen de Actividad</h1>
        <p className="text-slate-500 text-sm">Monitorea los servicios registrados.</p>
      </div>

      {/* Cards de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-${item.color}-50 text-${item.color}-600`}>
              {item.icon}
            </div>
            <p className="text-sm text-slate-500 font-medium">{item.label}</p>
            <p className="text-3xl font-bold text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Tabla de personas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Personal</h2>
          <button type="button" onClick={handleOpen} className="bg-blue-700 px-4 py-2 rounded-2xl hover:bg-blue-500 text-white font-bold text-sm">
            Nuevo personal
          </button>
        </div>
        <div className="overflow-x-auto">
          <ListPersonas datos={datos} eliminarPerson={eliminarPerson} handleOpen={handleOpen} />
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        {/* El backdrop (fondo oscuro) */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Contenedor centrado */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold">Nuevo Registro</Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-600">
              Completa los datos para el desarrollo del software.
            </Dialog.Description>

            <FormPersona datos={datos} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}