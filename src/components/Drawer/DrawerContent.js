import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import {} from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { server } from "../../api/server"
import { useDispatch } from "react-redux"
import { signUp } from "../../store/slices/userSlice"
import { useNavigation } from "@react-navigation/native"



export default function DrawerContent(props){
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const logoutServer = async () =>{
        try {
            await server.post("/user/signup")
            dispatch(signUp())
        } catch (error) {
            
        }
    }

    return <View style={myStyles.container}>
        <DrawerContentScrollView {...props}>
            <DrawerItem label="Datos de la cuenta" onPress={()=>navigation.navigate("AccountData")}/>
            <DrawerItem label="Opcion 2" onPress={()=>console.log("Opcion 2")}/>
            <DrawerItem label="Opcion 3" onPress={()=>console.log("Opcion 3")}/>
        </DrawerContentScrollView>
        <View style={myStyles.signoutContainer}>
            <DrawerItem label="Cerrar sesion" icon={()=><Icon name="logout" size={30}/>} onPress={logoutServer}/>
        </View>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1
    },
    signoutContainer:{
        marginBottom: 15,
        borderTopColor: '#dedede',
        borderTopWidth: 1,
        borderBottomColor: '#dedede'
    }
})