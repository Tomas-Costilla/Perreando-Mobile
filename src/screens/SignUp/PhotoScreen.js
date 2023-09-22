import { useEffect, useState } from "react";
import { StyleSheet, Image,View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker'
import NoPhoto from "../../../assets/nophoto.png"
import {Camera,CameraType} from "expo-camera"
import CameraOptions from "../../components/CameraOptions";
import { Colors, PROFILE_TYPES } from "../../tools/constant";


const PhotoScreen = ({route,navigation}) =>{

    const {profile} = route.params;

    const [image,setImage] = useState({
        imageFile:null,
        imageUri:null
    })
    const [camPermissions,setCamPermission] = useState(null)
    const [camera,setCamera] = useState(null)
    const [startCamera,setStartCamera] = useState(false)
    const [flipCamera,setflipCamera] = useState(false)

    const handleUserPermission = async()=>{
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setCamPermission(cameraStatus.status === 'granted')
    }

    const handleCamera = () => setStartCamera(!startCamera)
    
    const handleFlipCamera = () => setflipCamera(!flipCamera)

    const handlePicture = async () =>{
        const photo = await camera.takePictureAsync()
        setImage({...image,imageFile: photo,imageUri: photo.uri})
        handleCamera()
        navigation.setParams({displayHeader: true})
    }

    const takePhoto = async () =>{
        const {status} =  await Camera.requestCameraPermissionsAsync()
        if(status === 'granted'){
            setStartCamera(true)
            navigation.setParams({displayHeader: false})
        }
        else console.log("permisos denegados");
    }

    const pickImage = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })

        if(!result.canceled){
            setImage({...image,
                imageFile: result.assets[0],
                imageUri: result.assets[0].uri
            })
        }
    }

    const deletePickImage = () => setImage({...image,imageFile:null,imageUri:null})


    useEffect(()=>{
        handleUserPermission()
    },[])

    return <>
        {image.imageUri === null && !startCamera
        ? <View style={myStyles.container}>
            <Text style={myStyles.title}>
                {profile === PROFILE_TYPES.ANFITRION
                    ? "Sube una foto tuya" 
                    : "Sube una foto tuya o de tu mascota"}
            </Text>
            <Button
                icon="image-album"
                mode="contained"
                labelStyle={{fontSize:18}}
                onPress={()=>pickImage()}
                style={myStyles.btnSelectImage}
            >Selecciona una imagen</Button>
            <Button 
                mode = "outlined" 
                icon="camera"
                labelStyle={{fontSize:18,borderColor:"#000000",color:"#000000"}}
                onPress={()=>takePhoto()}
                style={myStyles.btnTakePicture}
            >Toma una foto</Button>
        </View> 
        : <>
            {startCamera 
            && <Camera
                style={myStyles.cameraStyle} 
                ref={(r)=> setCamera(r)}
                type={flipCamera ? CameraType.front : CameraType.back}
            >
                    <CameraOptions navigation={navigation} handleCamera={handleCamera} flipCamera={handleFlipCamera} takePicture={handlePicture}/>
            </Camera>}
        
            {image.imageUri != null && <View style={myStyles.imageContainer}>
                <View style={myStyles.userPhotoContainer}>
                    <Image source={{uri: image.imageUri}} style={myStyles.userPhoto}/>
                </View>
                <IconButton
                    /* icon="delete"
                    mode="outlined" */
                    onPress={()=>deletePickImage()}
                    icon="delete"
                    iconColor={Colors.errorColor}
                    size={30}
                    /* labelStyle={myStyles.dltImage}
                    style={myStyles.btnDlt} */
                />
                <Button
                    icon="chevron-right"
                    mode="contained"
                    onPress={()=>navigation.navigate("UbicationSelect",{photo: image,profile: profile })}
                    labelStyle={{fontSize:20}}
                    contentStyle={{flexDirection:"row-reverse"}}
                    style={myStyles.btnNext}
                >Siguiente</Button>
             </View> } 
             
        </>}
    </>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        alignItems:"center",
        gap:10,
        backgroundColor:Colors.backgroundColor
    },
    userPhotoContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    title:{
        fontSize:20
    },
    imageContainer:{
        flex:1,
        display:"flex",
        justifyContent:"space-evenly",
        flexDirection:"column",
        alignItems:"center",
        backgroundColor:Colors.backgroundColor
    },
    userPhoto:{
        width:300,
        height:300,
        backgroundColor:"grey",
        borderRadius:150
    },
    noPhoto:{
        width:200,
        height:200
    },
    cameraStyle:{
        flex: 1,
        width: '100%'
    },
    dltImage:{
        fontSize:20,
        color: Colors.errorColor,
        textAlign:"center"
    },
    btnSelectImage:{
        borderRadius:10,
        backgroundColor:Colors.principal,
        padding:4,
        width:300
    },
    btnTakePicture:{
        borderRadius:10,
        width:250,
        padding:4
    },
    btnDlt:{
        borderRadius:10,
        padding:3
    },
    btnNext:{
        borderRadius:10,
        backgroundColor:Colors.principal,
        padding:3,
        width:250
    }
})

export default PhotoScreen;