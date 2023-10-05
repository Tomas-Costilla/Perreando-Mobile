import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import FeedNav from "./FeedStack/FeedNav";
import AccountNav from "./AccountStack/AccountNav";
import SearchNav from "./SearchStack/SearchNav";
import Icon from "react-native-vector-icons/FontAwesome"
import { StyleSheet } from "react-native";
import { Colors } from "../../tools/constant";

const Tabs = createBottomTabNavigator();
const Home = () =>{
    return (
        <Tabs.Navigator initialRouteName="FeedStack" screenOptions={{tabBarStyle:{backgroundColor:Colors.principal}}} >
            <Tabs.Screen 
                name="FeedStack" 
                component={FeedNav}
                options={{
                   /*  tabBarLabel:"Inicio", */
                    tabBarIcon:()=> <Icon name="home" color={Colors.backgroundColor} size={26}/>,
                    tabBarShowLabel:false,
                    headerShown:false,
                }}
            />
            <Tabs.Screen 
                name="SearchStack" 
                component={SearchNav}
                options={{
                 /*    tabBarLabel:"Buscar", */
                    tabBarIcon:()=> <Icon name="search" color={Colors.backgroundColor} size={26}/>,
                    tabBarShowLabel:false,
                    headerShown:false
                }} 
            />
            <Tabs.Screen 
                name="AccountStack" 
                component={AccountNav}
                options={{
                   /*  tabBarLabel:"Buscar", */
                    tabBarIcon:()=> <Icon name="user" color={Colors.backgroundColor}  size={26}/>,
                    tabBarShowLabel:false,
                    headerShown:false
                }} 
            />
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