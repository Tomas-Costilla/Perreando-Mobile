import {} from "react"
import { Image, View } from "react-native"
import { StyleSheet } from "react-native"
import { Avatar, Button, Divider, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import {useSelector} from "react-redux"
import { Colors } from "../tools/constant"



const UserAccount = ({user}) =>{

    return <>
        <View style={myStyles.container}>
                <Image 
                    source={{uri: user.userFileUri}}
                    style={myStyles.userPhotoAvatar}
                />
        </View>
    </>
}

const myStyles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        gap:10,
        padding:5,
        marginBottom:20
    },
    userContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    userPhotoAvatar:{
      backgroundColor:"#ECECEC",
      width:200,
      height:200,
      borderRadius:100
    }
})

export default UserAccount;