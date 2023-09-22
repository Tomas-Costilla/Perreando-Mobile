import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import SetRating from "../components/SetRating"
import Message from "../components/Message"
import { server } from "../api/server"

export default function UpdateCommentScreen({navigation,route}){

    const {comment} = route.params
    const [updateComment,setUpdateComment] = useState(comment)
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState(false)

    const handleUpdateStar = star => setUpdateComment({...updateComment,hostGuestRating: star})
    const handleChangeComment = (field,value) => setUpdateComment({...updateComment,[field]:value})

    const validateData = () =>{
        setMessage("")
        if(updateComment.hostGuestComment === ""){
            setMessage("El comentario no puede ir vacio")
            return
        }
        updateCommentServer()
    }

    const updateCommentServer = async () =>{
        setLoading(true)
        try {
           await server.put(`/rating/update/${comment._id}`,{
            hostGuestRating: updateComment.hostGuestRating,
            hostGuestComment: updateComment.hostGuestComment
           }) 
           navigation.navigate("Account")
        } catch (error) {
            setMessage(error.response.data)
        }
        setLoading(false)
    }

    return <View style={myStyles.container}>
        <Text>Actualizar estrellas</Text>
        <SetRating defaultStar={updateComment.hostGuestRating} handleStar={handleUpdateStar}/>
        <InputView 
            editable={true}
            label="Actualizar comentario"
            value={updateComment.hostGuestComment}
            handleData={handleChangeComment}
            icon="pencil"
            multiline={true}
            nameField="hostGuestComment"
        />
        {message && <Message msg={message} type="error"/>}
        <View style={myStyles.btnContainer}>
            <Button
                mode="contained"
                icon="pencil"
                style={myStyles.btnConfirmUpdate}
                onPress={validateData}
                loading={loading}
            >
                Confirmar cambios
            </Button>
        </View>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    btnContainer:{
        display:"flex",
        justifyContent:"center",
        flexDirection:"row",
        marginTop:10,
        padding:10
    },
    btnConfirmUpdate:{
        borderRadius:10,
        backgroundColor:Colors.principal,
        width:300
    }
})