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


const ActiveBookingList = ({bookings}) =>{
    return bookings.map((item,index)=>(<View key={index} style={myStyles.bookingItemContainer}>
        <IconProperty iconName="calendar-check" iconSize={35} text={item.bookingHostId?.hostDescription}/>
        <IconButton icon="chevron-right" size={30}/>
    </View>))
}


export default function ActiveBooking({navigation,storeUser}){

    const [errorServer,setErrorServer] = useState("")
    const [loading,setLoading] = useState(false)
    const [bookings,setBookings] = useState([])

    const getAllActiveBooking = async () =>{
        setLoading(true)
        try {
            let response = await server.get(`/booking/guest/active/${storeUser._id}`)
            setBookings(response.data)
        } catch (error) {
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en la peticion")
        }
        setLoading(false)
    }

    useEffect(()=>{
        getAllActiveBooking()
    },[])

    return <View style={{marginTop:10}}>
        <View style={myStyles.titleContainer}>
            <IconProperty iconName="calendar-search" iconSize={30} text="Mis reservas activas"/>
            <Button
                mode="contained"
                onPress={()=>console.log("ver todas las reservas")}
                style={myStyles.btnAllBokings}
            >Ver todas</Button>
        </View>
        <Divider />
        {errorServer ? <Message msg={errorServer} type="error"/>
        : loading ? <View style={{padding:10}}><Loading/></View>
        : bookings.length ? <ActiveBookingList bookings={bookings}/> : <View style={myStyles.notBookingContainer}> 
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
    btnAllBokings:{
        backgroundColor:Colors.principalBtn
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
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        borderWidth:1,
        borderColor:"#E2E2E2",
        borderRadius:10
    }
})