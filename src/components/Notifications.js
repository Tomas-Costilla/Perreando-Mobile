import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import {IconButton, Text } from "react-native-paper"
import {Badge} from "react-native-ui-lib"
import { Colors } from "../tools/constant"
import { server } from "../api/server"
import { useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"


export default function Notifications(){

    const [notifications,setNotifications] = useState(0)
    const user = useSelector(state=>state.user.user)
    const IsFocused = useIsFocused()

    const getTotalNotifications = async () =>{
        try {
            let response = await server.get(`/notification/${user._id}`)
            setNotifications(response.data?.notificationsTotal)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getTotalNotifications()
    },[IsFocused])

    return  <View style={myStyles.container}>
        <Text style={{color:"#FFFFFF",backgroundColor:Colors.principalBtn,padding:3,borderRadius:50,fontWeight:"bold"}}>{notifications}</Text>
        <IconButton icon="bell-outline" iconColor="#FFFFFF" size={30} onPress={()=>console.log("funciona")}/>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginRight:5,
        gap:0
    }
})