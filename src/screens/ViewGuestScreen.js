import {useState,useEffect} from "react"
import { ScrollView, StyleSheet, View, FlatList, Image } from "react-native"
import { ActivityIndicator, Divider, HelperText, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import GuestData from "../components/GuestData"
import { server } from "../api/server"
import Usuarios from "../../assets/usuarios.png"
import Loading from "../components/Loading"
import Message from "../components/Message"

export default function ViewGuestScreen({navigation,route}){

    const [loadingServer,setLoadingServer] = useState()
    const [errorServer,setErrorServer] = useState("")
    const [guestsData,setGuestsData] = useState([])

    const getHostGuests = async () =>{
        setLoadingServer(true)
        setErrorServer("")
        try {
            let response = await server.get(`/booking/host/${route.params.hostId}`)
            setGuestsData(response.data.response)
        } catch (error) {
            if(error.response.data?.isLogged===false) navigation.navigate("SessionOut")
            
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrion un error en la peticion")
        }
        setLoadingServer(false)
    }

    useEffect(()=>{
        getHostGuests()
    },[])


    if(loadingServer) return <Loading />

    return <View style={myStyles.container}>
                
            {errorServer ? <Message msg={errorServer} type="error"/>
            : guestsData.length > 0 ?
            <FlatList 
            data={guestsData}
            renderItem={({item})=> <GuestData data={item}/>}
            keyExtractor={item=>item._id}
            />     
            : <View>
                <Text>Aun no tienes huespedes activos</Text>    
            </View>} 

            {/* <FlatList 
                data={guestsData}
                renderItem={({item})=> <GuestData data={item}/>}
                keyExtractor={item=>item._id}
                initialNumToRender={10}
            /> */}
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
    imageContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    imageStyle:{
        width:300,
        height:300
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