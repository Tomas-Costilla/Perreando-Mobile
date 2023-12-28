import {} from "react"
import {StyleSheet, View } from "react-native"
import {Button, IconButton, Text} from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ContactBtn from "./ContactBtn"
import { Colors } from "../tools/constant"
import { Image } from "expo-image"

export default function GuestData({data}){
    console.log(data)
    return <>
        <View style={myStyles.container}>
            <View style={myStyles.imageContainer}>
                <Image source={{uri: data.imageFileUri}} style={myStyles.userImageStyle}/>
                <View>
                    <Text style={{marginBottom:10}}>{data.bookingGuestId?.userFullName}</Text>
                    <View style={{display:"flex",justifyContent:"center",flexDirection:"row",alignItems:"center",gap:5}}>
                        <Image source={{uri: data.imageFileUri}} style={myStyles.petImageStyle}/>
                        <Text>Dobby</Text>
                    </View>
                </View>
            </View>
            <View style={{display:"flex",justifyContent:"space-evenly",flexDirection:"row",alignItems:"center"}}>
                {/* <IconButton 
                    icon=""                
                /> */}
            </View>
        </View>
    </>
}

const myStyles = StyleSheet.create({
    container:{
        borderWidth:0.6,
        borderRadius:10,
        borderColor:Colors.borderColor,
        padding:10,
        marginBottom:10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    imageContainer:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        gap:10,
        marginBottom:5
    },
    userImageStyle:{
        width:80,
        height:80,
        borderRadius:50
    },
    petImageStyle:{
        width:30,
        height:30,
        borderRadius:50
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