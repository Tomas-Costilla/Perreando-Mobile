import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import SessionOutScreen from "../../screens/SessionOutScreen";

const StackNavigation = createStackNavigator()
export default function SessionNav(){

    return(
        <StackNavigation.Navigator>
            <StackNavigation.Screen name="HomeTab" component={Home} options={{headerShown:false}}/>
            <StackNavigation.Screen 
                name="SessionOut"
                component={SessionOutScreen}
                options={{
                    headerShown:false
                }}
            />
        </StackNavigation.Navigator>
    )
}