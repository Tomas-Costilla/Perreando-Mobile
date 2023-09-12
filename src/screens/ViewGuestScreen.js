import {useState,useEffect} from "react"
import { ScrollView, StyleSheet, View, FlatList } from "react-native"
import { ActivityIndicator, Divider, HelperText, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import GuestData from "../components/GuestData"
import { server } from "../api/server"


export default function ViewGuestScreen({navigation,route}){

    const [loadingServer,setLoadingServer] = useState()
    const [messageServer,setMessageServer] = useState("")
    const [guestsData,setGuestsData] = useState([])

    const getHostGuests = async () =>{
        setLoadingServer(true)
        setMessageServer("")
        try {
            let response = await server.get(`/host/guests/${route.params.hostId}`)
            setGuestsData(response.data.result)
        } catch (error) {
            setMessageServer(error.response.data.message)
        }
        setLoadingServer(false)
    }

    useEffect(()=>{
        getHostGuests()
    },[route.params.hostId])


    if(loadingServer) return <View style={myStyles.serverContainer}>
        <ActivityIndicator size={45} animating/>
    </View>

    if(messageServer) return <View style={myStyles.serverContainer}>
        <HelperText type="error">{messageServer}</HelperText>
    </View>

    return <View style={myStyles.container}>
            {/* <Text style={myStyles.title}>Tus huespedes</Text> */}
            <FlatList 
                data={guestsData}
                renderItem={({item})=> <GuestData data={item}/>}
                keyExtractor={item=>item.id}
                initialNumToRender={10}
            />
    </View>
}

const myStyles = StyleSheet.create({
    serverContainer:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },
    container:{
        padding:10,
        flex:1,
        backgroundColor:Colors.backgroundColor
    },
    title:{
        textAlign:"center",
        marginBottom:20
    },
    dividerStyle:{
        backgroundColor:"#D9D9D9",
        borderWidth:0.4,
        marginTop:10,
        marginBottom:10
    }
})