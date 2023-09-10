import { useEffect, useState } from "react"
import { StyleSheet, View, ScrollView, Image } from "react-native"
import { ActivityIndicator, Button, Text } from "react-native-paper"
import { server } from "../api/server"
import { useSelector } from "react-redux"
import ErrorMessage from "../components/ErrorMessage"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import CancelHost from "../components/CancelHost"
import ContactBtn from "../components/ContactBtn"
import SinReserva from "../../assets/sinreserva.png"


export default function GuestHostScreen({navigation}){
    const {user} = useSelector(state=>state.user)
    const [loadingRequest,setLoadingRequest] = useState(false)
    const [errorServer,setErrorServer] = useState("")
    const [guestHostData,setGuestHostData] = useState({})

    const getGuestHostInfo = async () =>{
        setLoadingRequest(true)
        try {
            const response = await server.get(`/host/guest/${user._id}`)
            setGuestHostData(response.data)
        } catch (error) {
            setErrorServer(error.response.data)
        }
        setLoadingRequest(false)
    }

    useEffect(()=>{
        getGuestHostInfo()
    },[])

    if(loadingRequest) return <View style={myStyles.responseContainer}>
        <ActivityIndicator animating size={40}/>
    </View>

    if(errorServer) return <View style={myStyles.responseContainer}>
        <ErrorMessage errorMessage={errorServer} isError={true}/>
    </View>

    if(Object.keys(guestHostData).length === 0) return <View style={myStyles.responseContainer}>
        <Text>Aun no has hecho una reserva!</Text>
        <Image source={SinReserva} style={myStyles.reserveImage}/>
    </View>

    return <ScrollView style={myStyles.container}>
        <View style={{marginBottom:10}}>
        <Text style={myStyles.title}>Datos de tu reserva</Text>
        <InputView 
            editable={false}
            label="Nombre del anfitrion"
            value={guestHostData.hostOwnerId.userFullName}
        />
        <InputView 
            editable={false}
            label="Descripcion del hospedaje"
            value={guestHostData.hostDescription}
        />
        <InputView 
            editable={false}
            label="Telefono del anfitrion"
            value={guestHostData.hostOwnerId.userPhone}
            typeInput='numeric'
        />
        <InputView 
            editable={false}
            label="Costo de la estadia"
            value={guestHostData.hostPrice}
            typeInput='numeric'
            icon="currency-usd"
        />
        <InputView 
            editable={false}
            label="Zona del anfitrion"
            value={guestHostData.hostOwnerId.userUbication}
        />
        <InputView 
            editable={false}
            label="Direccion del anfitrion"
            value={`${guestHostData.hostOwnerId.userAddressStreet} ${guestHostData.hostOwnerId.userAddressNumber}`}
        />

        <InputView 
            editable={false}
            label="Entre las Calles"
            value={guestHostData.hostOwnerId.userAddressBetwStreet}
        />

        <InputView 
            editable={false}
            label="Informacion extra del anfitrion"
            value={guestHostData.hostOwnerId.userAddressExtraInfo}
        />
        </View>

        <InputView 
            editable={false}
            label="Tu fecha de reserva"
            value={guestHostData.hostReserveDateFrom}
        />
        <InputView 
            editable={false}
            label="Hasta"
            value={guestHostData.hostReserveDateTo}
        />

        <View style={myStyles.btnContainer}>
            <Button
                mode="outlined"
                labelStyle={{color:"#000000"}}
                style={myStyles.btnRating}
                icon="account-star"
            >
                Calificar
            </Button>

            <ContactBtn phone={guestHostData.hostOwnerId.userPhone} message="Hola!, quisiera hacerte una consulta"/>

            <CancelHost navigation={navigation} hostId={guestHostData._id} userId={user._id}/>
        </View>


    </ScrollView>
}

const myStyles = StyleSheet.create({
    responseContainer:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        padding:10,
        justifyContent:"center",
        alignItems:"center"
    },
    reserveImage:{
        width:300,
        height:300,
        marginTop:10
    },
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    title:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10
    },
    btnContainer:{
        display:"flex",
        justifyContent:"space-evenly",
        flexDirection:"column",
        alignItems:"center",
        padding:10,
        marginTop:10,
        marginBottom:10
    },
    btnRating:{
        padding:3,
        borderRadius:10,
        marginBottom:10
    }
})