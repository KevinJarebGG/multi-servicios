import * as YUP from "yup"

export function InitialValues(datosPerson) {
  return {
    nombre: datosPerson?.nombre || "",
    telefono: datosPerson?.telefono || "",
    correo: datosPerson?.correo || "",
    nomuser: datosPerson?.nomuser || "",
    especialidad: datosPerson?.especialidad || "",
  }
}

export function ValidationSchema() {
  return YUP.object({
    nombre: YUP.string().required("El nombre no puede ir vacío"),
    telefono: YUP.number().typeError("El teléfono debe ser un número").required("El teléfono es requerido"),
    correo: YUP.string().email("No tiene formato de correo").required("El correo es requerido"),
    nomuser: YUP.string(),
    especialidad: YUP.string().required("La especialidad es requerida"),
  })
}