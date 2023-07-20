import {} from "react"
import {View,StyleSheet, ScrollView} from "react-native"
import {Divider, Text, Button} from "react-native-paper"
import UserAccount from "./UserAccount"
import {useSelector} from "react-redux"
import UserOptions from "./UserOptions"
import { SafeAreaView } from "react-native-safe-area-context"
import LogoutBtn from "./LogoutBtn"
import {Colors, PROFILE_TYPES} from "../tools/constant"

const AccountOptions = ({navigation}) =>{

    const user = useSelector(state=>state.user.user)

return <ScrollView style={myStyles.container}>
        <View>
            <UserAccount user={user}/>
            <UserOptions iconname="account" text="Mis datos" nav={navigation} link="AccountData"/>

            {user.userProfile === PROFILE_TYPES.HUESPED
            ? <>
                <UserOptions iconname="database" text="Mi Reserva" nav={navigation} link="nameScreen 1"/>
                <UserOptions iconname="magnify" text="Buscar hospedajes" nav={navigation} link="SearchHost"/>
            </>
            : <>
                <UserOptions iconname="home" text="Crear hospedaje" nav={navigation} link="CreateHost"/>
                <UserOptions iconname="home" text="Mi hospedaje" nav={navigation} link="ViewHostData"/>
            </>}
            <Divider style={myStyles.dividerStyle}/>
            <LogoutBtn />
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
        borderWidth:0.2
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