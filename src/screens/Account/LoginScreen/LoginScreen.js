import React from 'react';
import { ScrollView, View } from 'react-native';
import {Text, Image} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {LoginForm} from "../../../components/Auth";
import {screen} from "../../../utils";
import {styles} from "./LoginScreen.styles";

export function LoginScreen() {

  const navigation = useNavigation();
   
  const goToRegister = () => {
    navigation.navigate(screen.account.register);
  }

  return (
    <ScrollView>
      <Image 
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta? {" "}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            REGISTRATE
          </Text>
        </Text>
      </View>
    </ScrollView>
  )
}