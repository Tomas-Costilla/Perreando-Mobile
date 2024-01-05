import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import FeedNav from "./FeedStack/FeedNav";
import SearchNav from "./SearchStack/SearchNav";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { StyleSheet } from "react-native";
import { Colors } from "../../tools/constant";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import SessionOutScreen from "../../screens/SessionOutScreen";

const Tabs = createBottomTabNavigator();
const Home = () =>{
    return (
        <Tabs.Navigator initialRouteName="FeedStack" screenOptions={{tabBarStyle:{backgroundColor:Colors.principal},tabBarHideOnKeyboard:true}}  >
            <Tabs.Screen 
                name="FeedStack" 
                component={FeedNav}
                options={{
                   /*  tabBarLabel:"Inicio", */
                    tabBarIcon:({focused})=> <Icon name={focused ? "home" : "home-outline"} color={focused ? Colors.backgroundColor : "#B8B8B8"} size={26}/>,
                    tabBarShowLabel:true,
                    tabBarLabel:"Inicio",
                    headerShown:false,
                    /* tabBarLabelStyle:{color:"#FFFFFF",fontWeight:"bold"}, */
                    tabBarActiveTintColor:Colors.backgroundColor,
                    tabBarInactiveTintColor:"#B8B8B8"
                }}
            />
            <Tabs.Screen 
                name="SearchStack" 
                component={SearchNav}
                options={{
                 /*    tabBarLabel:"Buscar", */
                    tabBarIcon:({focused})=> <Icon name="magnify" color={focused ? Colors.backgroundColor : "#B8B8B8"} size={26}/>,
                    tabBarShowLabel:true,
                    tabBarLabel:"Buscar",
                    headerShown:false,
                    /* tabBarLabelStyle:{color:"#FFFFFF",fontWeight:"bold"}, */
                    tabBarActiveTintColor:Colors.backgroundColor,
                    tabBarInactiveTintColor:"#B8B8B8"
                }} 
            />
            <Tabs.Screen 
                name="AccountStack" 
                component={DrawerMenu}
                options={{
                    tabBarIcon:({focused})=> <Icon name={focused ? "account-circle" : "account-circle-outline"}  color={focused ? Colors.backgroundColor : "#B8B8B8"}  size={26}/>,
                    tabBarShowLabel:true,
                    tabBarLabel:"Cuenta",
                    headerShown:false,
                   /*  tabBarLabelStyle:{color:"#FFFFFF",fontWeight:"bold"}, */
                    tabBarActiveTintColor:Colors.backgroundColor,
                    tabBarInactiveTintColor:"#B8B8B8"
                }} 
            />
{/* 
            <Tabs.Screen 
                name="SessionOut"
                component={SessionOutScreen}
                options={{
                    headerShown:false,
                    tabBarStyle:{display:"none"},
                    tabBarLabelStyle:{display:"none"},
                    tabBarIconStyle:{display:"none"},
                    tabb
                }}
            /> */}
            
            {/* <Tabs.Screen 
                name="AccountStack" 
                component={AccountNav}
                options={{
                    tabBarIcon:()=> <Icon name="user" color={Colors.backgroundColor}  size={26}/>,
                    tabBarShowLabel:true,
                    tabBarLabel:"Cuenta",
                    headerShown:false,
                    tabBarLabelStyle:{color:"#FFFFFF",fontWeight:"bold"}
                }} 
            /> */}
        </Tabs.Navigator>
    )
}

const myStyles = StyleSheet.create({
    tab:{
        backgroundColor:Colors.principal
    },
    icons:{
       /*  backgroundColor:"white", */
       /*  color:"#000000" */
    }
})

export default Home;