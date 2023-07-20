import {} from "react"
import { StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Colors } from "../tools/constant"
import { Text } from "react-native-paper"
import GuestRating from "../components/GuestRating"


export default function ViewHostRatingScreen({navigation}){
    return <ScrollView style={myStyles.container}>
            <View>
                <Text style={myStyles.title}>Tus calificaciones y comentarios de tus huespedes</Text>
                <GuestRating />
            </View>
    </ScrollView>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    title:{
        textAlign:"center"
    }
})