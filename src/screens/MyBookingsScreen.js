import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import { server } from "../api/server"
import Loading from "../components/Loading"
import MessageServer from "../components/MessageServer"
import { useSelector } from "react-redux"
import BookingItem from "../components/BookingItem"


export default function MyBookingsScreen({navigation,route}){

    const user = useSelector(state=>state.user.user)
    const [bookings,setBookings] = useState([])
    const [loadingServer,setLoadingServer] = useState(false)
    const [messageServer,setMessageServer] = useState("")


    const getAllMyBookings = async () =>{
        setLoadingServer(true)
        try {
            let response =  await server.get(`/booking/guest/${user._id}`)
            setBookings(response.data.result)
        } catch (error) {
            if(error.response.data?.isLogged===false) navigation.navigate("SessionOut")
            setMessageServer(error.response.data)
        }
        setLoadingServer(false)
    }

    useEffect(()=>{
        getAllMyBookings()
    },[])

    if(loadingServer) return <Loading />

    if(messageServer) return <MessageServer msg={messageServer}/>

    if(bookings.length===0) return <View style={myStyles.responseServer}>
        <Text>Aun no tienes reservas!</Text>
    </View>

    return <View style={myStyles.container}>
       {/*  <Text style={myStyles.title}>Tus reservas</Text> */}
        <FlatList 
            data={bookings}
            renderItem={({item})=><BookingItem data={item} navigation={navigation}/>}
            keyExtractor={item=>item._id}
        />
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    responseServer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    title:{
        textAlign:"center",
        marginBottom:10,
        fontSize:16
    }
})