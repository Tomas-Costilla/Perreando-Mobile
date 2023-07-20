import {} from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Divider, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import GuestData from "../components/GuestData"


export default function ViewGuestScreen({navigation}){

    return <ScrollView style={myStyles.container}>
        <View style={{marginBottom:5}}>
            <Text style={myStyles.title}>Tus huespedes</Text>
            <Divider style={myStyles.dividerStyle} />
            <GuestData />
            <GuestData />
            <GuestData />
            <GuestData />
        </View>
    </ScrollView>
}

const myStyles = StyleSheet.create({
    container:{
        padding:10,
        flex:1,
        backgroundColor:Colors.backgroundColor
    },
    title:{
        textAlign:"center"
    },
    dividerStyle:{
        backgroundColor:"#D9D9D9",
        borderWidth:0.4,
        marginTop:10,
        marginBottom:10
    }
})