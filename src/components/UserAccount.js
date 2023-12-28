import {} from "react"
import { Image, View } from "react-native"
import { StyleSheet } from "react-native"
import { Avatar, Button, Divider, IconButton, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import {useSelector} from "react-redux"
import { Colors } from "../tools/constant"
import IconProperty from "./IconProperty"
import { useNavigation } from "@react-navigation/native"



const UserAccount = ({user}) =>{

    const navigation = useNavigation()

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
                    onPress={()=>navigation.navigate("AccountData")}
                >
                    Mi perfil
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
       gap:10,
       borderRadius:10,
       backgroundColor:Colors.backgroundColor,
       borderWidth:1,
       borderColor:Colors.borderColor,
       padding:10
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