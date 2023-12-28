import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Divider, IconButton, Text } from "react-native-paper"
import IconProperty from "./IconProperty"
import { Colors } from "../tools/constant"
import { server } from "../api/server"
import Message from "./Message"
import Loading from "./Loading"
import { FlatList } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import SinReservas from "../../assets/sinReservas.gif"
import { Image } from "expo-image"
import CalendarioCheck from "../../assets/calendariocheck.png"

const ActiveBookingList = ({bookings,navigation}) =>{
    return bookings.map((item,index)=>(<View key={index} style={myStyles.bookingItemContainer}>
        <Image source={CalendarioCheck} style={{width:35,height:35}} />
        <View style={{}}>
            <Text style={{fontWeight:"bold"}}>{item.bookingHostId?.hostDescription}</Text>
            <Text>{item.bookingDateFrom} / {item.bookingDateTo}</Text>
        </View>
        <IconButton icon="chevron-right" size={25} onPress={()=>navigation.navigate("GuestHost", {
                hostId: item.bookingHostId?._id,
                bookingId: item._id,
                startDate: item.bookingDateFrom,
                endDate: item.bookingDateTo,
                bookingTotal: item.bookingTotal
              })
            }/>
    </View>))
}


export default function ActiveBooking({storeUser}){

    const navigation = useNavigation()
    const [errorServer,setErrorServer] = useState("")
    const [loading,setLoading] = useState(false)
    const [bookings,setBookings] = useState([])
    const isFocused = useIsFocused()

    const getAllActiveBooking = async () =>{
        setLoading(true)
        try {
            let response = await server.get(`/booking/guest/active/${storeUser._id}`)
            setBookings(response.data)
        } catch (error) {
            console.log(error)
            if(error.response.data?.isLogged===false) navigation.navigate("SessionOut")
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en la peticion")
        }
        setLoading(false)
    }

    useEffect(()=>{
        getAllActiveBooking()
    },[isFocused])

    return <View style={myStyles.activeBookingContainer}>
        <View style={myStyles.titleContainer}>
            <IconProperty iconName="calendar-search" iconSize={30} text="Mis reservas activas"/>
            <Button
                mode="outlined"
                onPress={()=>console.log("ver todas las reservas")}
                labelStyle={{color:Colors.textColor}}
                style={myStyles.btnAllBokings}
            >Ver todas</Button>
        </View>
        {errorServer ? <Message msg={errorServer} type="error"/>
        : loading ? <View style={{padding:10}}><Loading/></View>
        : bookings.length ? <ActiveBookingList bookings={bookings} navigation={navigation}/> : <View style={myStyles.notBookingContainer}> 
            <Image source={SinReservas} style={myStyles.notBookingImage}/>
            <Text style={myStyles.notbookingTitle}>Aun no tienes reservas activas</Text>
            <Button
                mode="outlined"
                labelStyle={{color:Colors.textColor}}
                icon="magnify"
            >Buscar hospedajes</Button>    
        </View>}

    </View>
}

const myStyles = StyleSheet.create({
    titleContainer:{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        marginTop:10,
        marginBottom:10
    },
    activeBookingContainer:{
        backgroundColor:Colors.backgroundColor,
        borderRadius:10,
        borderColor:Colors.borderColor,
        padding:10,
        borderWidth:1,
        marginTop:10,
        marginBottom:10
    },
    btnAllBokings:{
        width:120
    },
    notBookingContainer:{
        padding:10,
        gap:10,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    notbookingTitle:{
        fontSize:13,
        color:"#959595"
    },
    bookingItemContainer:{
        marginTop:10,
        marginBottom:10,
        display:"flex",
        justifyContent:"space-evenly",
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        borderWidth:0.6,
        borderColor:"#E2E2E2",
        borderRadius:10
    },
    notBookingImage:{
        width:100,
        height:100
    }
})