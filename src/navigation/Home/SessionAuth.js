import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import SessionOutScreen from "../../screens/SessionOutScreen";
import MenuProfile from "../MenuProfile";
import { PROFILE_TYPES } from "../../tools/constant";
import AccountNav from "./AccountStack/AccountNav";
import DrawerHostMenu from "../DrawerMenu/DrawerHostMenu";

const StackNavigation = createStackNavigator()
export default function SessionNav({userProfile}){

    return(
        <StackNavigation.Navigator>
            {userProfile === PROFILE_TYPES.HUESPED ? 
            <StackNavigation.Screen name="GuestMenu" component={Home} options={{headerShown:false}}/>
            : <StackNavigation.Screen name="HostMenu" component={DrawerHostMenu} options={{headerShown: false}}/>    
        }
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