import {} from "react"
import { StyleSheet, View } from "react-native"
import { Colors } from "../tools/constant"
import { Text } from "react-native-paper"

const host = [
    {
        hostDescription:"alojamiento de sofi",
        hostLocation:"Banfield",
        hostOwnerCapacity:10,
        hostPrice:2500
    }
]


export default function SearchResultScreen({navigation}){

    return <View style={myStyles.container}>
        <Text>Resultado de la busqueda</Text>
        
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:Colors.backgroundColor
    }
})