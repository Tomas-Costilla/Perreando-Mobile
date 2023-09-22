import {} from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "../tools/constant"

export default function BookingState({state}){
    return <View style={[myStyles.container,state === "Reservada" ? myStyles.startBooking : state === "Finalizada" ? myStyles.endBooking : myStyles.cancelBooking]}>
        {state==="Reservada" ? <Icon size={20} name="calendar-blank" style={myStyles.iconStyle}/>
        :state ==="Finalizada" ? <Icon size={20} name="calendar-check" style={myStyles.iconStyle}/>
        : <Icon size={20} name="cancel" style={myStyles.iconStyle}/>}
        <Text style={myStyles.title}>{state}</Text>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        marginTop:10,
        display:"flex",
        justifyContent:"flex-start",
        flexDirection:"row",
        alignItems:"center",
        padding:3,
        gap:5,
        borderRadius:10,
        backgroundColor:Colors.principal,
        width:150
    },
    title:{
        color:"#FFFFFF",
        fontWeight:"bold"
    },
    iconStyle:{
        color:"#FFFFFF"
    },
    startBooking:{
        backgroundColor:"#10B300"
    },
    endBooking:{
        backgroundColor:"#006FB3"
    },
    cancelBooking:{
        backgroundColor: "#F50000"
    }
})