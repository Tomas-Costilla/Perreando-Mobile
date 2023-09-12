import {useEffect,useState} from "react"
import { StyleSheet, View, FlatList } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Colors } from "../tools/constant"
import { ActivityIndicator, HelperText, Text } from "react-native-paper"
import GuestRating from "../components/GuestRating"
import { server } from "../api/server"


export default function ViewHostRatingScreen({navigation,route}){

    const [loadingServer,setLoadingServer] = useState(false)
    const [messageServer,setMessageServer] = useState("") 
    const [ratings,setRatings] = useState([])

    const getAllHostRating = async () =>{
        setLoadingServer(true)
        setMessageServer("")
        try {
            let response = await server.get(`/rating/all/${route.params.hostId}`)
            setRatings(response.data)
        } catch (error) {
            setMessageServer(error.response.data)
        }
        setLoadingServer(false)
    }

    useEffect(()=>{
        getAllHostRating()
    },[])


    if(loadingServer) return <View style={myStyles.btnServerContainer}>
        <ActivityIndicator size={45} animating/>
    </View>

if(messageServer) return <View style={myStyles.btnServerContainer}>
    <HelperText type="error">{messageServer}</HelperText>
</View>

    return <View style={myStyles.container}>
            {/* <Text style={myStyles.title}>Tus calificaciones y comentarios de tus huespedes</Text> */}
            <FlatList 
                data={ratings}
                renderItem={({item})=> <GuestRating data={item}/>}
                keyExtractor={item=>item.id}
                initialNumToRender={10}
            />
            
    </View>
}

const myStyles = StyleSheet.create({
    btnServerContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    container:{
        flex:1,
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    title:{
        textAlign:"center",
        marginBottom:10
    }
})