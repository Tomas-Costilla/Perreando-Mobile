import {} from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function DataView({icon,data}){
    return <View style={myStyles.container}>
        <Icon name={icon} style={{fontSize:20}}/>
        <Text style={myStyles.dataStyle}>{data}</Text>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        display:"flex",
        justifyContent:"flex-start",
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        margin:10
    },
    dataStyle:{
        fontSize:20
    }
})