import React, {useState, useEffect} from "react";
import {View, Text} from "react-native";
import {Icon} from "react-native-elements";
// import {useNavigation} from "@react-navigation/native"; SE USA CUANDO EL NAVIGATE NO SALE DESDE PROPS
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {LoadingModal} from "../../../components/Shared";
import {ListRestaurants} from "../../../components/Restaurants";
import {screen,db } from "../../../utils";
import {styles} from "./RestaurantsScreen.style";

export function RestaurantsScreen(props){
    // const navigation = useNavigation(); SE USA CUANDO EL NAVIGATE NO SALE DESDE PROPS
    const {navigation} = props;
    const [currentUser, setCurrentUser] = useState(null);
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    }, [])

    useEffect(() => {
      const q = query(
        collection(db, "restaurants"),
        orderBy("createAt", "desc"),
       );
      onSnapshot(q, (snapshot) => {
        setRestaurants(snapshot.docs);
      })
    }, [])
    
    

    const goToAddRestaurant = () => {
        navigation.navigate(screen.restaurant.addRestaurant); //PARA NAVEGAR EN EL MISMO TAB O STACK

        // navigation.navigate(screen.account.tab, {screen: screen.account.account}); //PARA NAVEGAR CON OTRAS SCREEN FUERA DEL TAB STACK
    }
    return(
        <View style={styles.content}>
            {!restaurants ? (
                <LoadingModal show text="Cargando" />
            ) : (
                <ListRestaurants restaurants={restaurants}/>
            )}
            {currentUser && (
                <Icon 
                    reverse
                    type="material-community"
                    name="plus"
                    color="#00a680"
                    containerStyle={styles.btnContainer}
                    onPress={goToAddRestaurant}
                />
            )}
        </View>
    );
}