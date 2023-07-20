import {} from "react"
import { StyleSheet, View , Image} from "react-native"
import { Text } from "react-native-paper"


export default function GuestRating({}){

    return<View style={myStyles.container}>
        <View style={myStyles.avatarContainer}>
            <Image style={myStyles.avatarStyle}/>
        </View>
        <View style={myStyles.dataContainer}>
            <Text>Nombre del huesped</Text>
            <Text>comentarios del huesped .....</Text>
        </View>
        <View style={myStyles.ratingContainer}>
            <Text>Estrellas segun datos</Text>
        </View>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:5,
        marginBottom:5,
        borderWidth:1,
        borderRadius:10,
        padding:10,
        borderColor:"#C6C6C6"
    },
    avatarContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    },
    dataContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start"
    },
    ratingContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-end"
    },
    avatarStyle:{
        width:90,
        height:90,
        backgroundColor:"grey",
        borderRadius:50
    }
})