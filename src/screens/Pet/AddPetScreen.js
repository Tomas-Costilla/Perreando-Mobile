import { useState } from "react"
import { ScrollView, View } from "react-native"
import { StyleSheet } from "react-native"
import {} from "react-native"
import { Button, HelperText, IconButton, Text } from "react-native-paper"
import { Colors } from "../../tools/constant"
import { useSelector } from "react-redux"
import InputView from "../../components/InputView"
import PickImage from "../../components/PickImage"
import { useNavigation } from "@react-navigation/native"
import { server } from "../../api/server"
import Message from "../../components/Message"



export default function AddPetScreen(){

    const navigation = useNavigation()
    const user = useSelector(state=>state.user.user)
    const [loading,setLoading] = useState(false)
    const [errorServer,setErrorServer] = useState("")
    const [fieldsMessage,setFieldsMessage] = useState({
        namefield:"",
        agefield:"",
        weightfield:"",
        imagefield:""
    })
    const [image,setImage] = useState({
        imageFile:null,
        imageUri:null
    })
    const [petData,setPetData] = useState({
        petOwnerId:user._id,
        petName:"",
        petAge:0,
        petWeight:0,
        petType:"Perro"
    })

    const handleImageData = (imageResult) => {
        setImage({...image,
            imageFile: imageResult.assets[0],
            imageUri: imageResult.assets[0].uri
        })
    }

    const deleteImageData = () => setImage({...image,imageFile:null,imageUri:null})

    const handlePetData = (camp,value) => setPetData({...petData,[camp]:value})

    const validateFields = () =>{
        setFieldsMessage({...fieldsMessage,
            agefield: "",
            namefield: "",
            weightfield: "",
            imagefield: ""
        })
        let messages = {namefield:"",agefield:"",weightfield:"",imagefield:""}
        let isValid = true

        if(petData.petName === ""){
            messages.namefield = "Debes ingresar el nombre de tu mascota"
            isValid = false
        }

        if(petData.petAge === 0){
            messages.agefield = "Debes ingresar la edad de tu mascota"
            isValid = false
        }

        if(petData.petWeight === 0){
            messages.weightfield = "Debes ingresar el peso en KG de tu mascota"
            isValid = false
        }

        if(!image.imageUri){
            messages.imagefield = "Debes ingresar la imagen de tu mascota"
            isValid = false
        }

        if(!isValid){
            setFieldsMessage({...fieldsMessage,
                agefield: messages.agefield,
                namefield: messages.namefield,
                weightfield: messages.weightfield,
                imagefield: messages.imagefield
            })
            return
        }

        createPet()
    }

    const createPet = async () =>{
        setLoading(true)
        setErrorServer("")
        const formData = new FormData()
        formData.append("petOwnerId", petData.petOwnerId);
        formData.append("petName", petData.petName);
        formData.append("petAge", petData.petAge);
        formData.append("petWeight", petData.petWeight);
        formData.append("petType", petData.petType);
        formData.append("petPhoto", {
        name: new Date() + "_petPhoto",
        uri: image.imageUri,
        type: "image/jpg",
        });

        try {
            await server.post("/pet",formData,{
                headers:{
                  Accept: 'application/json',
                  'Content-Type':'multipart/form-data'
                }
              })
              navigation.goBack()
        } catch (error) {
            if(error.response.data?.isLogged===false){
                navigation.navigate("SessionOut")
                return
            }
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en la peticion")
        }
        setLoading(false)
    }

    return <ScrollView style={myStyles.container}>
        <View style={myStyles.addPetContainer}>
            <PickImage 
                btnMode="outlined"
                imageStyle={myStyles.petImageStyle}
                handlePickImage={handleImageData}
                imageData={image}
                deleteImage={deleteImageData}
                labelBtnStyle={myStyles.labelBtnStyle}
                btnStyle={myStyles.btnSelectStyle}
            />
            {fieldsMessage.imagefield && <HelperText style={{textAlign:"center"}} type="error">{fieldsMessage.imagefield}</HelperText>}

            <Text style={myStyles.title}>Ingresa tu mascota</Text>

            <InputView 
                editable={true}
                nameField="petName"
                handleData={handlePetData}
                label="Nombre de tu mascota"
                placeholder="Ejemplo: Dobby"
                icon="paw"
                validateMessage={fieldsMessage.namefield} 
            />
            <InputView 
                editable={true}
                nameField="petAge"
                handleData={handlePetData}
                label="Edad de tu mascota"
                placeholder="Ejemplo: 2"
                icon="paw" 
                typeInput="numeric"
                helperMessage="El valor tiene que ser en años, en caso de ser menor colocar el valor 1"
                validateMessage={fieldsMessage.agefield}
            />
            <InputView 
                editable={true}
                nameField="petWeight"
                handleData={handlePetData}
                label="Peso de tu mascota"
                placeholder="Ejemplo: 10"
                icon="paw" 
                typeInput="numeric"
                helperMessage="El valor es en cantidad de kilos"
                validateMessage={fieldsMessage.weightfield}
            />
            <InputView 
                editable={false}
                disabled={true}
                nameField="petType"
            /*     handleData={handlePetData} */
                label="Tipo de animal"
                value="Perro"
                icon="paw" 
                helperMessage="Por el momento solo se admiten Perros"
            />

            {errorServer && <Message msg={errorServer} type="error"/>}

            <View style={myStyles.btnAddPetContainer}>
                <Button
                    icon="paw"
                    mode="contained"
                    style={myStyles.btnAddStyle}
                    onPress={validateFields}
                    loading={loading}
                >
                    Agregar Mascota
                </Button>
            </View>
        </View>
    </ScrollView>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundGrey,
        padding:10
    },
    addPetContainer:{
        padding:10,
        backgroundColor:Colors.backgroundColor,
        borderWidth:1,
        borderColor:Colors.borderColor,
        borderRadius:10,
        marginBottom:20
    },
    title:{
        textAlign:"center",
        fontSize:16,
        marginBottom:20
    },
    petImageStyle:{
        width:250,
        height:250,
        borderRadius:10
    },
    labelBtnStyle:{
        color:Colors.textColor
    },
    btnSelectStyle:{
        marginTop:10,
        marginBottom:20
    },
    btnAddPetContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        marginBottom:20
    },
    btnAddStyle:{
        backgroundColor:Colors.principalBtn,
        width:300,
        padding:3
    }

})
