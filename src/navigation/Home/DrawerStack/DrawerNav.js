import {createDrawerNavigator} from "@react-navigation/drawer"
import AccountOptions from "../../../components/AccountOptions";

const StackNavigation = createDrawerNavigator()
const DrawerNav = () =>{
    return (
        <StackNavigation.Navigator
            id="rightDrawer"
            drawerContent={(props)=> <AccountOptions {...props}/>}
            screenOptions={{
                drawerPosition: 'right',
                headerShown: false,
            }}
        >
            {/* <StackNavigation.Screen 
                
            /> */}
        </StackNavigation.Navigator>
    )
}

export default DrawerNav;