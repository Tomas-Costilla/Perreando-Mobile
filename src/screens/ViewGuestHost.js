import { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { ActivityIndicator, Avatar, Button, HelperText, Text } from "react-native-paper"
import { server } from "../api/server"
import { Colors } from "../tools/constant"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import CreateReserve from "../components/CreateReserve"
import { useSelector } from "react-redux"
import ContactBtn from "../components/ContactBtn"

const PropertyWithIcon = ({text,icon}) => {
    return <View style={myStyles.propertyContainer}>
        <Icon name={icon} size={30}/>
        <Text>{text}</Text>
    </View>
}

export default function ViewGuestHost({navigation,route}){

    const {hostId} = route.params
    const user = useSelector(state=>state.user.user)
    const [loadingReq, setLoadingReq] = useState(false)
    const [errorServer,setErrorServer] = useState("")
    const [hostData,setHostData] = useState({})
    const [loading,setLoading] = useState(false)

    const getHostbyId = async () =>{
        setLoadingReq(true)
        setErrorServer("")
        try {
            const response = await server.get(`/host/${hostId}`)
            setHostData(response.data)
        } catch (error) {
            setErrorServer(error.response.data)
        }
        setLoadingReq(false)
    }

    

    useEffect(()=>{
        getHostbyId()
    },[hostId])

    if(loadingReq) return <View style={myStyles.serverResContainer}>
        <ActivityIndicator animating size={45}/>
    </View>

    if(errorServer) return <View style={myStyles.serverResContainer}>
        <HelperText type="error">{errorServer}</HelperText>
    </View>

    return <ScrollView style={myStyles.container}>
        <View style={myStyles.hostContainer}>
            <View style={myStyles.userContainer}>
                <Avatar.Icon icon="account" size={50}/>
                <View>
                    <Text style={myStyles.userName}>{hostData.hostOwnerId?.userFullName}</Text>
                    <Text style={myStyles.userHostDescription}>{hostData.hostDescription}</Text>
                </View>
            </View>
            <View style={myStyles.userImageContainer}>
                <Image source={{uri: hostData.ImageUri}} style={myStyles.userImage}/>
            </View>

            <View style={{display:"flex",flexDirection:"row",justifyContent:"center",padding:5}}>
                <Button
                    mode="contained-tonal"
                    icon="comment"
                >
                    Ver comentarios
                </Button>
            </View>

            <View style={myStyles.userInfoContainer}>
                    <View style={myStyles.propertyContainer}>
                        <Icon name="currency-usd" size={25}/>
                        <Text>Costo de estadia completa: ${hostData.hostPrice}</Text>
                    </View>
            </View>

            <View style={myStyles.userInfoContainer}>
                    <View style={myStyles.propertyContainer}>
                        <Icon name="email" size={25}/>
                        <Text>{hostData.hostOwnerId?.userEmail}</Text>
                        <Icon name="phone" size={25}/>
                        <Text>{hostData.hostOwnerId?.userPhone}</Text>
                    </View>
            </View>

            <View style={myStyles.userInfoContainer}>
                <View style={myStyles.hostCapacity}>
                        <View style={myStyles.propertyContainer}>
                                <Icon name="account-group" size={25}/>
                                <Text>{`Huespedes activos: ${hostData.hostGuests?.length}`}</Text>
                    </View>
                </View>
            </View>


            <View style={myStyles.userInfoContainer}>
                <View style={myStyles.hostCapacity}>
                        <View style={myStyles.propertyContainer}>
                                <Icon name="paw" size={25}/>
                                <Text>{`Capacidad de huespedes: ${hostData.hostOwnerCapacity}`}</Text>
                    </View>
                </View>
            </View>

            <View style={myStyles.userInfoContainer}>
                <View style={myStyles.propertyContainer}>
                        <Icon name="weight" size={25}/>
                        <Text>Peso admitido: {hostData.hostAnimalWeightFrom} - {hostData.hostAnimalWeightTo} KG </Text>
                        {/* <Icon name="phone" size={25}/> */}
                        <Text>Edad admitida: {hostData.hostAnimalAgeFrom} - {hostData.hostAnimalAgeTo} años</Text>
                    </View>
            </View>

            <View style={myStyles.userInfoContainer}>
                <View style={myStyles.ubicationContainer}>
                    <View style={myStyles.propertyContainer}>
                        <Icon name="map-marker-outline" size={25}/>
                        <Text>Direccion</Text>
                    </View>
                    <Text>
                        {`${hostData.hostOwnerId?.userAddressStreet} ${hostData.hostOwnerId?.userAddressNumber}, Entre ${hostData.hostOwnerId?.userAddressBetwStreet}. ${hostData.hostLocation}`}
                    </Text> 
                    <Text>{`Informacion extra: ${hostData.hostOwnerId?.userAddressExtraInfo}`}</Text>
                    {/* <View style={myStyles.propertyContainer}>
                        <Icon name="map-marker-outline" size={25}/>
                        <Text>{hostData.hostLocation}</Text>
                    </View> */}
                </View>
            </View>

            <View style={myStyles.btnContainer}>
               {/*  <Button
                    icon="whatsapp"
                    mode="outlined"
                >
                    Contactar
                </Button> */}
                <ContactBtn phone={hostData.hostOwnerId?.userPhone} message="Hola!, estoy interesado en tu alojamiento"/>

                <CreateReserve navigation={navigation} hostIdProp={hostId} guestIdProp={user._id}/>
                {/* <Button
                    mode="contained"
                >
                    Reservar
                </Button> */}
            </View>


        </View>
    </ScrollView>
}

const myStyles = StyleSheet.create({
    propertyContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:10
    },
    container:{
        flex:1,
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    serverResContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.backgroundColor
    },
    hostContainer:{
        marginTop:5,
        marginBottom:10
    },
    userContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        gap:10,
        alignItems:"center",
        borderWidth:0.5,
        borderRadius:10,
        padding:10
    },
    userName:{
        fontSize:20
    },
    userHostDescription:{
        fontSize:15
    },
    userImageContainer:{
        marginTop:10,
        marginBottom:10
    },
    userImage:{
        width:400,
        height:300,
        borderRadius:10,
        borderWidth:0.5
    },
    userInfoContainer:{
        borderWidth:0.5,
        borderRadius:10,
        padding:10,
        marginTop:5,
        marginBottom:5
    },
    ubicationContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        gap:5
    },
    btnContainer:{
        display:"flex",
        justifyContent:"space-evenly",
        flexDirection:"row",
        marginTop:10,
        marginBottom:10
    }
})