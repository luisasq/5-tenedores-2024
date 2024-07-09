import React, {useState} from 'react'
import { View } from 'react-native';
import {Input, Button} from "react-native-elements";
import {useFormik} from "formik";
import {getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import Toast from "react-native-toast-message";
import {initialValues, validationSchema} from "./ChangeEmailForm.data";
import {styles} from "./ChangeEmailForm.style";

export function ChangeEmailForm(props) {
    const {onClose, onReload} = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser;

                const credentials = EmailAuthProvider.credential(
                    currentUser.email, 
                    formValue.password
                );

                reauthenticateWithCredential(currentUser,credentials);

                await updateEmail(currentUser, formValue.email);

                onReload();
                onClose();
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar email",
                })
            }
        }
    })

    const [showPassword, setShowPassword] = useState(false);

    const showHidenPassword = ()=>setShowPassword((prevState) => !prevState);



  return (
    <View style={styles.content}>
      <Input 
        placeholder='Nuevo email'
        rightIcon={
            {
                type:"material-community",
                name:"at",
                color:"#c2c2c2"
            }
        }
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input 
        placeholder='Contrseña'
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-outline" : "eye-off-outline",
            color: "#c2c2c2",
            onPress: showHidenPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password",text)}
        errorMessage={formik.errors.password}
      />
      <Button 
        title="Modificar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}