import {} from "react"
import { View , StyleSheet, Image, TouchableHighlight} from "react-native"
import { Text } from "react-native-paper"
import { Colors } from "../tools/constant"


export default function ProfileOption({type,image,title,handleProfile}){

    return <TouchableHighlight activeOpacity={0.6} underlayColor="#f1f7fa" onPress={() => handleProfile(type)} style={{borderRadius:30}}>
        <View style={myStyles.container}>
            <Image 
                source={image}
                style={myStyles.imageStyle}
            />
            <Text style={myStyles.textStyle}>{title}</Text>
    </View>
    </TouchableHighlight>
}

const myStyles = StyleSheet.create({
    container:{
        padding:18,
        borderWidth:1,
        borderRadius:30,
        borderColor:"#D6D6D6",
        display:"flex",
        alignItems:"center"
    },
    imageStyle:{
        width:130,
        height:130,
        margin:5,
        marginBottom:15
    },
    textStyle:{
        textAlign:"center",
        fontWeight:"normal",
        color:Colors.textColor,
        fontSize:15
    }
})