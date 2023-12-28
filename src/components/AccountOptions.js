import { useEffect, useState } from "react"
import {View,StyleSheet, ScrollView} from "react-native"
import {Divider, Text, Button} from "react-native-paper"
import UserAccount from "./UserAccount"
import {useSelector} from "react-redux"
import UserOptions from "./UserOptions"
import { SafeAreaView } from "react-native-safe-area-context"
import LogoutBtn from "./LogoutBtn"
import {Colors, PROFILE_TYPES} from "../tools/constant"
import SnackMessage from "./SnackMessage"
import ActiveBooking from "./ActiveBooking"
import MyPets from "./MyPets"
import ActiveHostBooking, { ActiveHost } from "./ActiveHostBooking"
import { useNavigation, useIsFocused } from "@react-navigation/native"

const AccountOptions = ({route}) =>{
    const user = useSelector(state=>state.user.user)
    const navigation = useNavigation()
    const [refreshData,setRefreshData] = useState(false)

    useEffect(()=>{
        /* navigation.addListener('focus',()=> console.log("reload")) */
    },[/* navigation */])

return <ScrollView style={myStyles.container}>
            <UserAccount user={user}/>
            <Divider />
           {user.userProfile === PROFILE_TYPES.HUESPED
           ? <>
                 <ActiveBooking storeUser={user}/>
                 <MyPets storeUser={user}/>
           </>
           : <>
                {/* <ActiveHostBooking storeUser={user}/> */}
                <ActiveHost storeUser={user}/>
           </>}
    </ScrollView>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundGrey,
        padding:10,
        paddingBottom:200

    },
    dividerStyle:{
        borderWidth:0.2,
        borderColor:"#CACACA",
        borderWidth:1
    },
    btnCrtHost:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        padding:10
    },
    btnCrt:{
        width:200
    }
})

export default AccountOptions;