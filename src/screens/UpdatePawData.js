import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { ActivityIndicator, HelperText } from "react-native-paper"
import { server } from "../api/server"
import { useSelector } from "react-redux"
import { Colors } from "../tools/constant"


export default function UpdatePawData({navigation,route}){

    /* const {userId} = route.params */

    const user = useSelector(state=>state.user)
    const [loadingServer,setLoadingServer] = useState(true)
    const [messageServer,setMessageServer] = useState("")
    const [pawData,setPawData] = useState({})

    const getUserPawInfo = async () =>{
        setLoadingServer(true)
        setMessageServer("")
        try {
            let res = await server.get(`/user/paw/${user._id}`)
            setPawData(res.data)
        } catch (error) {
            setMessageServer(error.response.data)
        }
        setLoadingServer(false)
    }


    useEffect(()=>{
        /* getUserPawInfo() */
    },[])


    if(loadingServer) return <View style={myStyles.serverContainer}>
        <ActivityIndicator animating size={45}/>
    </View>

    if(messageServer) return <View style={myStyles.serverContainer}>
        <HelperText type="error">{messageServer}</HelperText>
    </View>

    return <>
    
    
    </>
}

const myStyles = StyleSheet.create({
    serverContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    container:{

    }
})