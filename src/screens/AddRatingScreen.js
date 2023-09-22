import { KeyboardAvoidingView, StyleSheet, View, Image } from "react-native"
import {ActivityIndicator, Button, HelperText, Text} from "react-native-paper"
import {Colors} from "../tools/constant"
import InputView from "../components/InputView"
import SetRating from "../components/SetRating"
import { useState, useEffect } from "react"
import { server } from "../api/server"
import { useSelector } from "react-redux"
import Rating from "../../assets/rating.png"

export default function AddRatingScreen({navigation,route}){

    const user = useSelector(state=>state.user.user)
    const [defaultStar,setDefaultStar] = useState(2)
    const [loadingServer,setLoadingServer] = useState(false)
    const [errorServer,setErrorServer] = useState("")
    const [comment,setComment] = useState({
        hostOwnerId:route.params.hostId,
        hostGuestId:user._id,
        hostGuestComment:""
    })
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState(false)
    const [serverMessage,setServerMessage] = useState("")
    const [ratingGuest,setRatingGuest] = useState(null)

    const handleStar = (value) => setDefaultStar(value)

    const handleCommentData = (field,value) => setComment({...comment,[field]:value})

    const validateFields = () =>{
        setMessage("")
        if(comment.hostGuestComment === ""){
            setMessage("Debes agregar un comentario")
            return
        }
        addComment()
    }
    
    const addComment = async () =>{
        setLoading(true)
        setServerMessage("")
        try {
            await server.post(`/rating`,{
                hostOwnerId:comment.hostOwnerId,
                hostGuestId:comment.hostGuestId,
                hostGuestRating:defaultStar,
                hostGuestComment:comment.hostGuestComment
            })
            navigation.popToTop()
        } catch (error) {
            setServerMessage(error.response.data)

        }
        setLoading(false)
    }

    const checkIfRatingGuest = async () =>{
        setLoadingServer(true)
        try {
            let response = await server.get(`/rating/host/${route.params.hostId}/guest/${user._id}`)
            setRatingGuest(response.data.exists)
        } catch (error) {
            
        }
        setLoadingServer(false)
    }

    useEffect(()=>{
        /* checkIfRatingGuest() */
    },[])
    
    if(loadingServer) return <View style={myStyles.serverContainer}>
        <ActivityIndicator animating size={45}/>
    </View>

    if(ratingGuest) return <View style={myStyles.serverContainer}>
        <Text>Ya has calificado a este hospedaje!</Text>
        <Image source={Rating} style={myStyles.imageRating}/>
    </View>


    return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={myStyles.container}>
        <Text>Seleccioná la cantidad de estrellas a puntuar</Text>
        <SetRating defaultStar={defaultStar} handleStar={handleStar}/>
        <InputView 
            label="Tu comentario"
            multiline={true}
            nameField="hostGuestComment"
            placeholder="Ingresa tu comentario aqui..."
            handleData={handleCommentData}
            validateMessage={message}
        />
        <View style={myStyles.btnContainer}>
            <Button
                mode="contained"
                style={myStyles.btnComment}
                icon="comment"
                onPress={validateFields}
                loading={loading}
            >
                Calificar
            </Button>
        </View>
        {serverMessage && <HelperText type="error">{serverMessage}</HelperText>}
    </KeyboardAvoidingView>
}

const myStyles = StyleSheet.create({
    serverContainer:{
        flex:1,
        justifyContent:"center",
        padding:10,
        alignItems:"center",
        backgroundColor:Colors.backgroundColor
    },
    imageRating:{
        marginTop:10,
        width:250,
        height:250
    },
    container:{
        flex:1,
        justifyContent:"flex-start",
        padding:10,
        backgroundColor: Colors.backgroundColor
    },
    btnContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10
    },
    btnComment:{
        borderRadius:10,
        padding:3,
        width:300,
        backgroundColor:Colors.principal
    }
})