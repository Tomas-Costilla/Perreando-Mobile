import {} from "react"
import { StyleSheet, View } from "react-native"
import {} from "react-native-paper"


export default function Pagination({data,indexDot}){

    return <View style={myStyles.container}>
        {data.map((value,index)=><View key={index} style={[myStyles.dot, index === indexDot && myStyles.dotActive]}/>)}
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        marginTop:10,
        marginBottom:10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    dot:{
        backgroundColor:"#D5D5D5",
        width:10,
        height:10,
        borderRadius:10,
        marginHorizontal:5
    },
    dotActive:{
        backgroundColor:"#ADADAD"
    }
})