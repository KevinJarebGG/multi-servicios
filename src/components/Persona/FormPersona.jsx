import {useFormik} from "formik";
import {InitialValues, ValidationSchema} from "./FormPersona.form";
import ApiDatos from "../../services/ApiDatos";
import Swal from "sweetalert2";

export  function FormPersona({datosPerson}) {
  
const formik=useFormik({
  initialValues: InitialValues(datosPerson),
  validationSchema: ValidationSchema(),
  enableReinitialize: true,
  validateOnChange:false,
  onSubmit: async(formValue)=>{
    if(!datosPerson){
await ApiDatos.postDatos(formValue);
 Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Datos guardados correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

    console.log("Datos",formValue)
    formik.resetForm()
  }else{
    await ApiDatos.updatePersona(datosPerson._id,formValue)
  }
    }
    
})
  return (
    <div>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit} noValidate>
          <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="nombre" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" "
        onChange={formik.handleChange}
        value={formik.values.nombre}
        
         required />
         <span className='text-red-600'>{formik.errors.nombre}</span>
        <label htmlFor="floating_last_name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Nombre</label>
    </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="telefono" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" "
        onChange={formik.handleChange}
        value={formik.values.telefono}
         required />
           <span className='text-red-600'>{formik.errors.telefono}</span>
        <label htmlFor="floating_last_name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Telefono</label>
    </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="email" name="correo" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " 
        onChange={formik.handleChange}
        value={formik.values.correo}
        required />
          <span className='text-red-600'>{formik.errors.correo}</span>
        <label htmlFor="floating_last_name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Correo</label>
    </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="nomuser" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " 
        onChange={formik.handleChange}
        value={formik.values.nomuser}
        required />
        <label htmlFor="floating_last_name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Nombre usuario</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="especialidad" id="floating_especialidad" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" "
        onChange={formik.handleChange}
        value={formik.values.especialidad}
        required />
        <span className='text-red-600'>{formik.errors.especialidad}</span>
        <label htmlFor="floating_especialidad" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Especialidad</label>
    </div>
     <button type="submit" className="text-white bg-blue-600 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none rounded-2xl">{!datosPerson?"Guardar":"Editar"}</button>
      </form>
    </div>
  )
}