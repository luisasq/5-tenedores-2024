import * as Yup from "yup";

export function initialValues(){
    return {
        password:"",
        newPassword:"",
        repitNewPassword: "",
    }
}

export function validationSchema(){
    return Yup.object({
        password: Yup.string()
        .required("La contraseña actual es requerido"),
        newPassword: Yup.string()
        .required("La contraseña nueva es obligatoria"),
        repitNewPassword: Yup.string()
        .required("Es necesario repeitir la nueva contraseña")
        .oneOf(
            [Yup.ref("newPassword")],
            "Las nuevas contraseñas tienen que ser iguales" 
        ),
    })
}
