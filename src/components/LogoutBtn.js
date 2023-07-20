import React, { useState } from "react"
import {StyleSheet, TouchableHighlight, View} from "react-native"
import { Button, Modal, Portal, Text } from "react-native-paper"
import {useDispatch} from "react-redux"
import {signUp} from "../store/slices/userSlice"
import { server } from "../api/server"
import Icon from "react-native-vector-icons/FontAwesome"


const LogoutBtn = () =>{

    const dispatch = useDispatch()
    const [visible,setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const showModal = () => setVisible(true)
    const closeModal = () => setVisible(false)

    const SignUpUser = async () =>{
        setLoading(true)
        try {
            await server.post("/user/signup")
            dispatch(signUp())
        } catch (error) {
            console.log(error.response);
        }
        setLoading(false)
    }

    return (
        <>
        <Portal>
            <Modal visible={visible} onDismiss={closeModal} style={myStyles.modalContainer}>
                <View style={myStyles.modalContent}>
                    <Text style={myStyles.title}>¿Desea cerrar la sesion?</Text>
                    <View style={myStyles.btnContainer}>
                        <Button
                            mode="contained"
                            style={myStyles.btnSignUp}
                            loading={loading}
                            onPress={()=> SignUpUser()}
                        >{!loading && "Cerrar sesion"}</Button>

                        <Button
                            mode="outlined"
                            onPress={closeModal}
                            style={myStyles.btnCloseModal}
                        >Cancelar</Button>
                    </View>
                </View>
            </Modal>
        </Portal>
        
        
        <TouchableHighlight 
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => showModal()}>
                <>
                    <View style={myStyles.optionContainer}>
                        <View style={myStyles.iconLink}>
                            <Icon name="sign-out" size={30}/>
                            <Text>Salir de la cuenta</Text>
                        </View>
                        {/* <Icon name="chevron-right" size={20}/> */}
                    </View>
                </>
        </TouchableHighlight>
       {/*  <Button
            onPress={showModal}
        >
            Boton Logout         
        </Button> */}
        </>
    )
}

const myStyles = StyleSheet.create({
    modalContainer:{
        padding:10,
        /* justifyContent:"center" */
    },
    modalContent:{
        width:"auto",
        height:200,
        padding:10,
        backgroundColor:"white",
        borderRadius:10,
        gap:10,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    },
    title:{
        textAlign:"center"
    },
    btnContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        gap:10
    },
    btnSignUp:{
        width:250,
    },
    btnCloseModal:{
        width:250
    },
    btnStyle:{

    },
    optionContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        gap:5,
        padding:10,
        margin:5
    },
    iconLink:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10
    }
})

export default LogoutBtn;