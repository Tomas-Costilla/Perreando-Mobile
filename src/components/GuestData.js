import {} from "react"
import { Image, StyleSheet, View } from "react-native"
import {Button, Text} from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ContactBtn from "./ContactBtn"
import { Colors } from "../tools/constant"

export default function GuestData({data}){
    return <>
        <View style={myStyles.container}>
            {/* <Image 
                style={myStyles.avatarStyle}
                source={{uri: data.userImageUri}}
            />
            <View style={myStyles.infoContainer}>
                <Text style={myStyles.guestName}>{data.userFullName}</Text>
                <Text>Fecha de reserva:</Text>
                <Text>{`${data.hostReserveDateFrom} - ${data.hostReserveDateTo}`}</Text>
            </View>
            <View style={myStyles.btnContactContainer}>
                <ContactBtn message="Hola!" phone={data.userPhone} textBtn=" " styleBtn={myStyles.btnContact} styleLabel={myStyles.labelButton}/>
            </View> */}
            <View style={myStyles.imageContainer}>
                <Image style={myStyles.avatarStyle} source={{uri: data.userImageUri}}/>
            </View>
            <View style={myStyles.textIcon}>
                <Icon name="account" size={25}/>
                <Text style={{fontSize:13,textAlign:"center"}}>{data.userFullName}</Text>
            </View>
            <View style={myStyles.textIcon}>
                <Icon name="calendar-account" size={30}/>
                <Text style={{fontSize:13,textAlign:"center"}}>{`${data.hostReserveDateFrom} - ${data.hostReserveDateTo}`}</Text>
            </View>
            <View style={myStyles.btnContactContainer}>
                <ContactBtn message="Hola!" phone={data.userPhone} styleBtn={myStyles.btnContact}/>
            </View>
        </View>
    </>
}

const myStyles = StyleSheet.create({
    container:{
        borderWidth:0.5,
        borderRadius:10,
        borderColor:"#C1C1C1",
        padding:10,
        marginBottom:10
    },
    imageContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:5
    },
    avatarStyle:{
        width:100,
        height:100,
        backgroundColor:"grey",
        borderRadius:50
    },
    infoContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"flex-start"

    },
    textIcon:{
        display:"flex",
        justifyContent:"center",
        flexDirection:"row",
        gap:5,
        alignItems:"center",
        marginTop:10,
        marginBottom:10
    },
    userName:{
        fontSize:15,
        textAlign:"center"
    },
    btnContactContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },
    btnContact:{
        backgroundColor:Colors.principal,
        borderRadius:10,
        padding:5,
        width:250
    }
})