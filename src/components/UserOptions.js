import {} from "react"
import { StyleSheet, TouchableHighlight, View } from "react-native"
import {Divider, Text} from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "../tools/constant"


const UserOptions = ({iconname,text,link,nav}) =>{


    return <>
        <TouchableHighlight 
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            style={{borderRadius:10}}
            onPress={() => nav.navigate(link)}>
                <>
                    <View style={myStyles.optionContainer}>
                        <View style={myStyles.iconLink}>
                            <Icon name={iconname} size={40} style={{color:Colors.secondary}}/>
                            <Text style={myStyles.title}>{text}</Text>
                        </View>
                        <Icon name="chevron-right" size={40} style={{color:Colors.secondary}}/>
                    </View>
                </>
        </TouchableHighlight>
    </>
}

const myStyles = StyleSheet.create({
    optionContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        gap:5,
        padding:10,
        margin:5
    },
    iconLink:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10
    },
    title:{
        fontSize:15
    }
})

export default UserOptions;