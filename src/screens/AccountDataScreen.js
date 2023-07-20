import {} from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Text,Button } from "react-native-paper"
import {useSelector} from "react-redux"
import Icon from "react-native-vector-icons/FontAwesome"
import { Colors, PROFILE_TYPES } from "../tools/constant"
import DataView from "../components/DataView"



const AccountDataScreen = ({navigation}) =>{

    const {user} = useSelector(state=>state.user)

    console.log(user);

    return <ScrollView style={myStyles.container}>
        <DataView icon="account" data={user.userFullName}/>
        <DataView icon="email" data={user.userEmail}/>
        <DataView icon="phone" data={user.userPhone}/>
        <DataView icon="map-marker" data={user.userUbication}/>
        <DataView icon="map-marker" data={user.userAddressStreet}/>
        <DataView icon="map-marker" data={user.userAddressNumber}/>
        <DataView icon="map-marker" data={user.userAddressBetwStreet}/>
        <DataView icon="map-marker" data={user.userAddressExtraInfo}/>
        <DataView icon="text-account" data={user.userProfile}/>
        {user.userProfile === PROFILE_TYPES.ANFITRION
        && <>
            <View style={myStyles.specification}>
                <DataView icon="weight-kilogram" data={user.userHostAnimalWeightFrom}/>
                <DataView icon="weight-kilogram" data={user.userHostAnimalWeightTo}/>
            </View>
            <View style={myStyles.specification}>
                <DataView icon="counter" data={user.userHostAnimalAgeFrom}/>
                <DataView icon="counter" data={user.userHostAnimalAgeTo}/>
            </View>
        </>}

    </ScrollView>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    userContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    userImage:{
        backgroundColor:"#B2B2B2",
        width:120,
        height:120,
        borderRadius:100
    },
    userInfo:{
        gap:3
    },
    btnEditContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        padding:5
    },
    btnEdit:{
        width:150,
        borderRadius:10
    },
    btnIconEdit:{
    }
})

export default AccountDataScreen;

/* <View style={myStyles.container}>
        <View style={myStyles.userContainer}>
            <View style={myStyles.userImage}>
                
            </View>
            <View style={myStyles.userInfo}>
                <Text>{user.userFullName}</Text>
                <Text>{user.userAddress}</Text>
                <Text>{user.userEmail}</Text>
                <Text>{user.userPhone}</Text>
            </View>
        </View>
        <View style={myStyles.btnEditContainer}>
            <Button
                mode="outlined"
                icon={() => <Icon name="edit" size={16} style={myStyles.btnIconEdit}/>}
                style={myStyles.btnEdit}
            >Editar Perfil</Button>
        </View>
    </View> */