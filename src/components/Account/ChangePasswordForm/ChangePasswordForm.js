import React, {useState} from 'react';
import { View } from 'react-native';
import {Input, Button} from "react-native-elements";
import {useFormik} from "formik";
import {getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import Toast from "react-native-toast-message";
import {initialValues, validationSchema} from "./ChangePasswordForm.data";
import {styles} from "./ChangePasswordForm.style";

export function ChangePasswordForm(props) {
    const {onClose} = props;
    const [showPassword, setShowPassword] = useState(false);

    const onShowPassword = () => setShowPassword(prevState => !prevState);

    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,
      onSubmit: async (formValue) =>{
        try {
          const currentUser = getAuth().currentUser;

          const credencials = EmailAuthProvider.credential(
            currentUser.email,
            formValue.password
          );

          reauthenticateWithCredential(currentUser, credencials);

          await updatePassword(currentUser, formValue.newPassword);
          onClose();
        } catch (error) {
          console.log(error);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Error al cambiar la contraseña",
          })
        }
      }
    })

  return (
    <View style={styles.content}>
      <Input 
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-outline" : "eye-off-outline",
            color: "#c2c2c2",
            onPress: onShowPassword
        }}
        onChangeText={(text) => formik.setFieldValue("password",text)}
        errorMessage={formik.errors.password}
      />
      <Input 
        placeholder="Nueva constraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-outline" : "eye-off-outline",
            color: "#c2c2c2",
            onPress: onShowPassword
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input 
        placeholder="Repite nueva contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-outline" : "eye-off-outline",
            color: "#c2c2c2",
            onPress: onShowPassword
        }}
        onChangeText={(text) => formik.setFieldValue("repitNewPassword",text)}
        errorMessage={formik.errors.repitNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}