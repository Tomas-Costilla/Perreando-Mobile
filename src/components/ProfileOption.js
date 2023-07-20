import {} from "react"
import { View , StyleSheet, Image, TouchableHighlight} from "react-native"
import { Text } from "react-native-paper"


export default function ProfileOption({type,image,title,handleProfile}){

    return <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => handleProfile(type)} style={{borderRadius:30}}>
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
        padding:15,
        borderWidth:1,
        borderRadius:30,
        borderColor:"#D6D6D6"
    },
    imageStyle:{
        width:150,
        height:150,
        margin:5
    },
    textStyle:{
        textAlign:"center"
    }
})