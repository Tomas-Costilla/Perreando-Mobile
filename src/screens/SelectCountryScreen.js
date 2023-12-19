import {} from "react"
import { StyleSheet, View } from "react-native"
import { HelperText, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import Countries from "../components/Countries"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function SelectCountryScreen({navigation,route}){


    return<View style={myStyles.container}>
        <Text style={myStyles.title}>Selecciona tu pais de origen</Text>
        <View style={myStyles.informationContainer}>
             <Icon name="information-outline" size={30} color="#2d3f4e"/>
            <Text style={myStyles.infoTitle}>Por el momento solo estamos disponible en Argentina</Text>
        </View>
        <Countries navigation={navigation}/>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    title:{
        textAlign:"center",
        fontSize:18
    },
    informationContainer:{
        display:"flex",
        justifyContent:"center",
        flexDirection:"row",
        alignItems:"center",
        gap:5,
        padding:10,
        marginTop:20,
        backgroundColor:"#ddecf0",
        borderRadius:5
    },
    infoTitle:{
        color:"#2d3f4e",
    }
})

