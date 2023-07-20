import {} from "react"
import { StyleSheet, TouchableHighlight, View } from "react-native"
import {Divider, Text} from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


const UserOptions = ({iconname,text,link,nav}) =>{


    return <>
        <TouchableHighlight 
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => nav.navigate(link)}>
                <>
                    <View style={myStyles.optionContainer}>
                        <View style={myStyles.iconLink}>
                            <Icon name={iconname} size={30}/>
                            <Text>{text}</Text>
                        </View>
                        <Icon name="chevron-right" size={20}/>
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
    }
})

export default UserOptions;