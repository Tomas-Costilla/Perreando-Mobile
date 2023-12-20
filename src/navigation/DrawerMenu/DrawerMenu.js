import {createDrawerNavigator} from "@react-navigation/drawer"
import AccountDataScreen from "../../screens/AccountDataScreen"
import AccountOptions from "../../components/AccountOptions"
import AccountNav from "../Home/AccountStack/AccountNav"
import { Text } from "react-native-paper"
import DrawerContent from "../../components/Drawer/DrawerContent"




const Drawer = createDrawerNavigator()
export default function DrawerMenu(){
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} screenOptions={{
            headerShown:false
        }}>
            <Drawer.Screen name="AccountDrawer" component={AccountNav}/>
        </Drawer.Navigator>
    )
}