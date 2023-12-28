import { useEffect, useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import {Image} from "expo-image"
import { ActivityIndicator, Button, Text } from "react-native-paper"
import { server } from "../api/server"
import { useSelector } from "react-redux"
import ErrorMessage from "../components/ErrorMessage"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import CancelHost from "../components/CancelHost"
import ContactBtn from "../components/ContactBtn"
import SinReserva from "../../assets/sinreserva.png"
import Loading from "../components/Loading"
import Message from "../components/Message"
import ImageCarrousel from "../components/ImageCarrousel"
import { useIsFocused } from "@react-navigation/native"


export default function GuestHostScreen({navigation,route}){
    const {user} = useSelector(state=>state.user)
    const [loadingRequest,setLoadingRequest] = useState(false)
    const [errorServer,setErrorServer] = useState("")
    const [guestHostData,setGuestHostData] = useState({})
    const [guestComment,setGuestComment] = useState({})
    const isFocused = useIsFocused()

    const getGuestHostInfo = async () =>{
        setLoadingRequest(true)
        setErrorServer("")
        try {

            let response = await server.get(`/host/${route.params.hostId}`)
            let comment = await server.get(`/rating/host/${route.params.hostId}/guest/${user._id}`)  
            setGuestHostData(response.data.result)
            setGuestComment(comment.data.result)
        } catch (error) {
            if(error.response.data?.isLogged===false) navigation.navigate("SessionOut")
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en la peticion")
        }
        setLoadingRequest(false)
    }

    useEffect(()=>{
        getGuestHostInfo()
    },[isFocused])


    if(loadingRequest) return <Loading />

    if(errorServer) return <Message type="error" msg={errorServer}/>
   
    return <ScrollView style={myStyles.container}>
        <View style={myStyles.infoContainer}>
            <View style={myStyles.hostPhotoContainer}>
                <Image source={{uri: guestHostData.ImageUri}} style={myStyles.hostImageStyle}/>
                <Text>{guestHostData.hostOwnerId?.userFullName}</Text>
            </View>
            <ImageCarrousel images={guestHostData.hostImages}/>

            <View style={myStyles.btnActionContainer}>
                <ContactBtn phone={guestHostData.hostOwnerId?.userPhone} textBtn="Enviar Mensaje" message="Hola!, quisiera hacerte una consulta" styleBtn={myStyles.btnContactStyle} icon="message-text-outline"/>
                {Object.keys(guestComment).length>0 
                    ? <Button
                        mode="outlined"
                        labelStyle={{color:Colors.textColor}}
                        style={myStyles.btnRating}
                        icon="account-star"
                        onPress={()=>navigation.navigate("ViewRating",{ratingId: guestComment._id })}
                    >
                        Ver calificacion
                    </Button> 
                    : <Button
                        mode="outlined"
                        icon="star-outline"
                        labelStyle={{color:Colors.textColor}}
                        onPress={()=>navigation.navigate("AddRating",{hostId: guestHostData._id })}
                        >
                            Calificar
                    </Button>}
            </View>

            <Text style={myStyles.title}>Datos de tu reserva</Text>

            <InputView 
                editable={false}
                label="Descripcion del hospedaje"
                value={guestHostData.hostDescription}
                inputStyles={myStyles.inputTextStyle}
            />
            <InputView 
                editable={false}
                label="Telefono del anfitrion"
                value={guestHostData.hostOwnerId?.userPhone}
                typeInput='numeric'
                inputStyles={myStyles.numInputStyle}
            />
            <InputView 
                editable={false}
                label="Costo de la estadia por dia del anfitrion"
                value={guestHostData.hostPrice}
                inputStyles={myStyles.numInputStyle}
                typeInput='numeric'
                icon="currency-usd"
            />

            <InputView 
                editable={false}
                label="Costo total de tu estadia"
                value={route.params.bookingTotal}
                inputStyles={myStyles.numInputStyle}
                typeInput='numeric'
                icon="currency-usd"
            />

            <InputView 
                editable={false}
                label="Direccion del anfitrion"
                value={`${guestHostData.hostCompleteAddress}. ${guestHostData.hostState}, ${guestHostData.hostCity}`}
                inputStyles={myStyles.inputTextStyle}
                multiline={true}
                icon="map-marker-outline"
            />

            <View style={myStyles.datesContainer}>
            <InputView 
               editable={false}
               label="Tu fecha de reserva"
               value={route.params.startDate}
               inputStyles={myStyles.dateInputStyle}
            />
            <Text>-</Text>
            <InputView 
                editable={false}
                label="Hasta"
                value={route.params.endDate}
                inputStyles={myStyles.dateInputStyle}
            />
            </View>
            <View style={myStyles.btnCancelReserveContainer}>
               <CancelHost bookingId={route.params.bookingId}/>
            </View>
        </View>

       {/*  <InputView 
            editable={false}
            label="Tu fecha de reserva"
            value={route.params.startDate}
        />
        <InputView 
            editable={false}
            label="Hasta"
            value={route.params.endDate}
        />

        <View style={myStyles.btnContainer}>
            {Object.keys(guestComment).length>0 ? <Button
                mode="outlined"
                labelStyle={{color:"#000000"}}
                style={myStyles.btnRating}
                icon="account-star"
                onPress={()=>navigation.navigate("ViewRating",{ratingId: guestComment })}
            >
                Ver calificacion
            </Button> 
            : <Button
                mode="outlined"
                labelStyle={{color:"#000000"}}
                style={myStyles.btnRating}
                icon="account-star"
                onPress={()=>navigation.navigate("AddRating",{hostId: guestHostData._id })}
            >
                Calificar
            </Button>}

            <ContactBtn phone={guestHostData.hostOwnerId?.userPhone} message="Hola!, quisiera hacerte una consulta"/>

            <CancelHost navigation={navigation} bookingId={route.params.bookingId}/>
        </View> */}


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
        backgroundColor:Colors.backgroundGrey,
        padding:10
    },
    infoContainer:{
     padding:10,
     backgroundColor:Colors.backgroundColor,
     borderRadius:10,
     marginBottom:20
    },
    hostPhotoContainer:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        gap:5
    },
    hostImageStyle:{
        width:60,
        height:60,
        borderRadius:50
    },
    btnActionContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        gap:5,
        marginBottom:20,
        marginTop:10
    },
    btnContactStyle:{
        width:'auto'
    },
    numInputStyle:{
        width:200,
        backgroundColor:Colors.backgroundColor
    },
    inputTextStyle:{
        backgroundColor:Colors.backgroundColor
    },
    datesContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:5
    },
    dateInputStyle:{
        width:180,
        backgroundColor:Colors.backgroundColor
    },
    title:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10
    },
    btnCancelReserveContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        marginBottom:10,
        marginTop:20
    },
    btnCancelStyle:{
        backgroundColor:Colors.errorColor,
        padding:5,
        width:300
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

    }
})