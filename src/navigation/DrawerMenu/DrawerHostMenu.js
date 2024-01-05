import { createDrawerNavigator } from "@react-navigation/drawer";
import AccountNav from "../Home/AccountStack/AccountNav";
import DrawerContent from "../../components/Drawer/DrawerContent";

const DrawerHost = createDrawerNavigator()
export default function DrawerHostMenu(){
    return <DrawerHost.Navigator drawerContent={props => <DrawerContent {...props}/>} screenOptions={{
        headerShown:false
    }}>
        <DrawerHost.Screen component={AccountNav} name="AccountDrawer"/>
    </DrawerHost.Navigator>
}