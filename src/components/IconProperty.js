import {} from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function IconProperty({iconName,iconSize,text,color,textStyles}){
    return <View style={myStyles.container}>
        <Icon name={iconName} size={iconSize} color={color && color}/>
        <Text style={textStyles ? textStyles : {color: color}}>{text}</Text>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        alignContent:"flex-start",
        alignItems:"center",
        gap:5
    },
    title:{

    },
    icon:{

    }
})