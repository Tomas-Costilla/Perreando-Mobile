import { useEffect } from "react"
import {View,StyleSheet, ScrollView} from "react-native"
import {Divider, Text, Button} from "react-native-paper"
import UserAccount from "./UserAccount"
import {useSelector} from "react-redux"
import UserOptions from "./UserOptions"
import { SafeAreaView } from "react-native-safe-area-context"
import LogoutBtn from "./LogoutBtn"
import {Colors, PROFILE_TYPES} from "../tools/constant"
import SnackMessage from "./SnackMessage"

const AccountOptions = ({navigation,route}) =>{

    const user = useSelector(state=>state.user.user)

    useEffect(()=>{

    },[])

return <ScrollView style={myStyles.container}>
        <View>
            <UserAccount user={user}/>
            <UserOptions iconname="account" text="Mis datos" nav={navigation} link="AccountData"/>

            {user.userProfile === PROFILE_TYPES.HUESPED
            ? <>
                <UserOptions iconname="paw" text="Mi Mascota" nav={navigation} link="UpdatePawData"/>
                <UserOptions iconname="database" text="Mis Reservas" nav={navigation} link="MyBookings"/>
               {/*  <UserOptions iconname="magnify" text="Buscar hospedajes" nav={navigation} link="SearchHost"/> */}
            </>
            : <>
                <UserOptions iconname="home" text="Crear hospedaje" nav={navigation} link="UploadImages"/>
                <UserOptions iconname="home" text="Mi hospedaje" nav={navigation} link="ViewHostData"/>
            </>}
            <Divider style={myStyles.dividerStyle}/>
            <LogoutBtn />
            {/* {route.params?.message && <SnackMessage message={route.params?.message}/>} */}
    </View>
    </ScrollView>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        padding:10

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