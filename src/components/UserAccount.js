import {} from "react"
import { Image, View } from "react-native"
import { StyleSheet } from "react-native"
import { Avatar, Button, Divider, IconButton, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import {useSelector} from "react-redux"
import { Colors } from "../tools/constant"
import IconProperty from "./IconProperty"



const UserAccount = ({user}) =>{

    return <>
        <View style={myStyles.container}>
                <Image 
                    source={{uri: user.userFileUri}}
                    style={myStyles.userPhotoAvatar}
                />
                <Text style={myStyles.userName}>{user.userFullName}</Text>
                <Button
                    mode="outlined"
                    icon="account-edit"
                    labelStyle={{color:Colors.textColor}}
                    style={{width:250,marginTop:5,marginBottom:10}}
                >
                    Editar perfil
                </Button>
        </View>
    </>
}

const myStyles = StyleSheet.create({
    container:{
       display:"flex",
       justifyContent:"center",
       flexDirection:"column",
       alignItems:"center",
       gap:10
    },
    userOptionContainer:{
       marginTop:5,
       marginBottom:10,
       display:"flex",
       flexDirection:"row",
       justifyContent:"center",
       alignItems:"center"
    },
    userName:{
       fontSize:17
    },
    userPhotoAvatar:{
      backgroundColor:"#ECECEC",
      width:200,
      height:200,
      borderRadius:100
    },
    userOtherDataContainer:{
        display:"flex",
        justifyContent:"space-evenly",
        flexDirection:"row"
    }
})

export default UserAccount;