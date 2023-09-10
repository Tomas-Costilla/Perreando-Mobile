import { useEffect, useState } from "react"
import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native"
import { ActivityIndicator, Button, HelperText } from "react-native-paper"
import { server } from "../api/server"
import { useSelector } from "react-redux"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import * as ImagePicker from 'expo-image-picker'


export default function UpdatePawData({navigation,route}){

    /* const {userId} = route.params */

    const user = useSelector(state=>state.user.user)
    const [loadingServer,setLoadingServer] = useState(false)
    const [messageServer,setMessageServer] = useState("")
    const [pawData,setPawData] = useState({})
    const [newImage,setNewImage] = useState(null)

    const getUserPawInfo = async () =>{
        setLoadingServer(true)
        setMessageServer("")
        try {
            let res = await server.get(`/user/paw/${user._id}`)
            setPawData(res.data)
        } catch (error) {
            setMessageServer(error.response.data)
        }
        setLoadingServer(false)
    }

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
        }

    }

    useEffect(()=>{
        getUserPawInfo()
    },[route.params?.reloading])


    if(loadingServer) return <View style={myStyles.serverContainer}>
        <ActivityIndicator animating size={45}/>
    </View>

    if(messageServer) return <View style={myStyles.serverContainer}>
        <HelperText type="error">{messageServer}</HelperText>
    </View>

    return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={myStyles.container}>
        <View style={myStyles.imageContainer}>
            <Image source={{uri: pawData.userImageUrl}} style={myStyles.imagePaw}/>
        </View>
        <View style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",padding:5,marginBottom:20}}>
            <Button 
                mode="outlined" 
                icon="image-edit-outline"
                style={myStyles.btnEditImage}
                labelStyle={myStyles.btnFontsStyle}
                onPress={()=>navigation.navigate("UpdateImagePaw",{pawImage: pawData.userImageUrl,userImageName: pawData.userImageName })}
                >Cambiar imagen
            </Button>
        </View>
        <InputView 
            label="Nombre de tu mascota"
            editable={false}
            value={pawData.userGuestAnimalName}
            nameField="userGuestAnimalName"
            /* handleData={handlePawData} */
            /* inputStyles={myStyles.inputNameStyle} */
            /* icon="pencil" */
        />
        <InputView 
            label="Edad de tu mascota"
            editable={false}
            value={pawData.userGuestAnimalAge}
            nameField="userGuestAnimalAge"
            typeInput='numeric'
            /* handleData={handlePawData} */
            /* inputStyles={myStyles.inputNumberStyle} */
           /*  icon="pencil" */
        />
        <InputView 
            label="Peso en KG de tu mascota"
            editable={false}
            value={pawData.userGuestAnimalWeight}
            nameField="userGuestAnimalWeight"
            typeInput='numeric'
            /* handleData={handlePawData} */
/*             inputStyles={myStyles.inputNumberStyle}
 */            /* icon="pencil" */
        />

        <View style={myStyles.btnContainerUpdate}>
            <Button
                mode="contained"
                style={myStyles.btnConfirmUpdate}
                onPress={()=>navigation.navigate("ConfirmUpdatePaw",{pawData: pawData})}
            >
                Modificar datos
            </Button>
        </View>
    
    </KeyboardAvoidingView>
}

const myStyles = StyleSheet.create({
    serverContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    container:{
        flex:1,
        justifyContent:"flex-start",
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    imageContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        marginBottom:20  
    },
    imagePaw:{
        width:300,
        height:250,
        borderRadius:10
    },
    btnEditImage:{
        borderRadius:10,
        borderColor:Colors.secondary
    },
    btnFontsStyle:{
        color:Colors.secondary
    },
    inputNameStyle:{
        width:250
    },
    inputNumberStyle:{
        width:200
    },
    btnContainerUpdate:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        marginBottom:10
    },
    btnConfirmUpdate:{
        width:250,
        borderRadius:10,
        padding:3,
        backgroundColor:Colors.principal
    }
})