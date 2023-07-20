import {} from "react"
import { Image, StyleSheet, View } from "react-native"
import {Button, Text} from "react-native-paper"

export default function GuestData({guest}){
    return <>
        <View style={myStyles.container}>
            <Image 
                style={myStyles.avatarStyle}
            />
            <Text style={myStyles.guestName}>Nombre del huesped</Text>
            <Button
                mode="contained"
                onPress={()=>console.log("contactar")}
                style={myStyles.btnContact}
            >
            Contactar
            </Button>
        </View>
    </>
}

const myStyles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderRadius:10,
        borderColor:"#C6C6C6",
        padding:10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:5,
        marginBottom:5
    },
    avatarStyle:{
        width:90,
        height:90,
        backgroundColor:"grey",
        borderRadius:50
    },
    guestName:{
        fontSize:13
    },
    btnContact:{

    }
})