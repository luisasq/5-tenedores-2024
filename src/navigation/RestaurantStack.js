import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RestaurantsScreen} from "../screens//Restaurants/RestaurantsScreen";
import {AddRestaurantScreen} from "../screens//Restaurants/AddRestaurantScreen";
import {RestaurantScreen} from "../screens/Restaurants/RestaurantScreen";
import {screen} from "../utils";

const Stack = createNativeStackNavigator();

export function RestaurantStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={screen.restaurant.restaurants}
                component={RestaurantsScreen}
                options={{title: "Restaurantes"}}
            />
            <Stack.Screen
                name={screen.restaurant.addRestaurant}
                component={AddRestaurantScreen}
                options={{title: "Nuevo restaurante"}}
            />
            <Stack.Screen 
                name={screen.restaurant.restaurant}
                component={RestaurantScreen}
                options={{title: "Restaurante"}}
            />
        </Stack.Navigator>
    )
}