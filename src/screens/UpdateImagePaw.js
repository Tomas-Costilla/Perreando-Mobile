import { useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { Button, HelperText } from "react-native-paper"
import { Colors } from "../tools/constant"
import * as ImagePicker from 'expo-image-picker'
import { server } from "../api/server"
import { useSelector, useDispatch } from "react-redux"
import {updateImageUser} from "../store/slices/userSlice"

export default function UpdateImagePaw({navigation,route}){

    const user = useSelector(state=>state.user.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    const [newImage,setNewImage] = useState({
        imageFile:null,
        imageUri:null
    })
    const [disableConfirm,setDisableConfirm] = useState(true)

    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })

        if(!result.canceled){
            setNewImage({...newImage,
                imageFile: result.assets[0],
                imageUri: result.assets[0].uri})
            setDisableConfirm(false)
        }

    }

    const handleDeleteImage = () => {
        setNewImage({...newImage,imageFile:null,imageUri:null})
        setDisableConfirm(true)
    }

    const handleUpdatePawImage = async () =>{
        const formData = new FormData();
        formData.append("userPhoto", {
        name: new Date() + "_userPhoto",
        uri: newImage.imageUri,
        type: "image/jpg",
        });
        setLoading(true)
        setErrorMessage("")
        try {
            let res = await server.put(`/user/${user._id}/image/${route.params.userImageName}/update`,formData,{
                headers:{
                  Accept: 'application/json',
                  'Content-Type':'multipart/form-data'
                }
              })
              dispatch(updateImageUser(res?.data.newFileImageUri))
              navigation.navigate("UpdatePawData",{reloading: true})
        } catch (error) {
            setErrorMessage(error.response.data)
        }
        setLoading(false)
    }

    return <View style={myStyles.container}>
        <View style={myStyles.imageContainer}>
            <Image style={myStyles.imageStyle} source={{uri: newImage.imageUri ? newImage.imageUri : route.params.pawImage}}/>
        </View>

        <View style={myStyles.btnContainer}>
            {newImage.imageUri && <Button
                mode="text"
                icon="trash-can"
                labelStyle={{fontSize:30,color:Colors.errorColor}}
                onPress={handleDeleteImage}
            />}
            <Button
                mode="outlined"
                style={myStyles.btnChangeImageStyle}
                labelStyle={{color:"#000000"}}
                icon="image-edit-outline"
                onPress={pickImage}
            >
                Cambiar Imagen
            </Button>
            <Button
                mode="contained"
                style={!disableConfirm ? myStyles.btnConfirmStyle : myStyles.btnConfirmDisabled}
                disabled={disableConfirm}
                loading={loading}
                onPress={handleUpdatePawImage}
            >
                Confirmar cambio
            </Button>
            {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}
        </View>
    
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-evenly",
        alignItems:"center",
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    imageContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    imageStyle:{
        width:300,
        height:250,
        borderRadius:10
    },
    btnContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:10,
        marginTop:10,
        marginBottom:10
    },
    btnChangeImageStyle:{
        borderColor:"#000000",
        borderRadius:10,
        width:200,
        padding:1
    },
    btnConfirmStyle:{
        backgroundColor:Colors.principal,
        borderRadius:10,
        width:300,
        padding:3
    },
    btnConfirmDisabled:{
        borderRadius:10,
        width:300,
        padding:3
    }
})