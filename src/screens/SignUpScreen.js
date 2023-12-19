import { useState } from "react";
import { ScrollView, StyleSheet, View,KeyboardAvoidingView, Platform } from "react-native";
import {
  Text,
  Button,
  TextInput,
  Checkbox,
  HelperText,
} from "react-native-paper";
import { Colors, MAIL_FORMAT, PROFILE_TYPES } from "../tools/constant";
import { server } from "../api/server";
import { signIn } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import HostInputs from "../components/HostInputs";
import { ValidateUserData } from "../tools/validators";
import InputSignUp from "../components/InputSignUp";
import GuestInputs from "../components/GuestInputs";
import InputView from "../components/InputView";
import Message from "../components/Message";

const SignUpScreen = ({ route, navigation }) => {
  const { photo,countryId, profile } = route.params;
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    userFullName: "",
    userEmail: "",
    userPhone: 0,
    userPassword: "",
    userRepeatPassword:"",
    userAddress: "",
    userAddressExtraInfo: "",
    userPhoto: photo,
    userProfile: profile,
    userFirstLogin:true,
    userTermsAccept:false,
    userCountryId: countryId
  });

  const [validMessage, setValidMessage] = useState({});

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState("")
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleUserData = (camp, value) => {
    if(camp==="userAddressNumber" && !/^\d+$/.test(value)) return

    setUserData({ ...userData, [camp]: value })
  
  }
  const handleRepeatPassword = (value) => setPasswordRepeat(value);

  const signUpUser = async () => {
    setError(false);
    setServerError("")
    const { isValid, validationMessage } = ValidateUserData(
      userData,
      passwordRepeat
    );
    if(isValid === false){
        setValidMessage(validationMessage)
        /* console.log(validationMessage)
        console.log(isValid) */
        return
    }

  
    /* prepare object to send backend */
    const formData = new FormData();
    formData.append("userFullName", userData.userFullName);
    formData.append("userEmail", userData.userEmail);
    formData.append("userPhone", userData.userPhone);
    formData.append("userPassword", userData.userPassword);
    formData.append("userPhoto", {
      name: new Date() + "_userPhoto",
      uri: photo.imageUri,
      type: "image/jpg",
    });
    formData.append("userAddress",userData.userAddress)
    formData.append("userAddressExtraInfo",userData.userAddressExtraInfo)
    formData.append("userProfile",userData.userProfile)
    formData.append("userFirstLogin",userData.userFirstLogin)
    formData.append("userTermsAccept",userData.userTermsAccept)
    formData.append("userCountryId",userData.userCountryId)
    setLoading(true);
    try {
            await server.post("/user",formData,{
                headers:{
                  Accept: 'application/json',
                  'Content-Type':'multipart/form-data'
                }
              })
            let response = await server.post("/user/signin",{
                userEmail: userData.userEmail,
                userPassword: userData.userPassword
            })
           dispatch(signIn(response.data))
        } catch (error) {
            if(error.response.data?.message) setServerError(error.response.data?.message)
            else setServerError("Ocurrio un error al realizar la peticion")
        }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView >
      <View style={myStyles.container}>
        <Text style={myStyles.title} variant="headlineMedium">
          Completa tus datos para registrarte
        </Text>
        <HelperText type="error" visible>(*) campos requeridos</HelperText>

      <InputView 
        nameField="userFullName"
        label="Nombre Completo *"
        editable={true}
        handleData={handleUserData}
        validateMessage={validMessage.name}
      />


        <InputView 
          nameField="userEmail"
          label="Tu email *"
          editable={true}
          handleData={handleUserData}
          validateMessage={validMessage.email}
        />
      
        
        <InputView 
          nameField="userPhone"
          label="Tu numero de celular"
          handleData={handleUserData}
          editable={true}
          typeInput='numeric'
          placeholder="Sin +54 y 011, Ejemplo: 1150069397"
          validateMessage={validMessage.phone}
        />

        <InputView 
          nameField="userAddress"
          label="Ingresa tu direccion"
          handleData={handleUserData}
          editable={true}
          placeholder="Ejemplo: Calle 1834, Buenos Aires"
          validateMessage={validMessage.address}
        />

        
        <InputView 
          nameField="userAddressExtraInfo"
          label="Ingresa informacion extra de tu domicilio"
          editable={true}
          handleData={handleUserData}
          placeholder="Ejemplo: Entre las calles 1 y 2"
          validateMessage={validMessage.addressExtrainf}
        />

        <InputView 
          nameField="userPassword"
          label="Crear Contraseña *"
          editable={true}
          isPrivate={visible}
          handleData={handleUserData}
          validateMessage={validMessage.password}
        />


        <InputView 
          nameField="userRepeatPassword"
          label="Repite la contraseña *"
          editable={true}
          isPrivate={visible}
          handleData={handleUserData}
          validateMessage={validMessage.passwordRepeat}
        />
        <Checkbox.Item
          style={myStyles.checkContainer}
          label="Mostrar contraseñas"
          position="trailing"
          status={!visible ? "checked" : "unchecked"}
          onPress={() => setVisible(!visible)}
        />

        {serverError && <Message msg={serverError} type="error"/>}
        <View style={myStyles.btnContainer}>
          <Button
            style={myStyles.btnSignUp}
            mode="contained"
            onPress={signUpUser}
            loading={loading}
            icon="account-plus-outline"
          >
            Registrarme
          </Button>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const myStyles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    gap: 10,
    backgroundColor:Colors.backgroundColor
  },
  title: {
    textAlign: "center",
    fontSize: 15,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnSignUp: {
    width: 250,
    padding: 4,
    borderRadius:50,
    backgroundColor:Colors.principalBtn
  },
  errorText: {
    color: Colors.errorColor,
    textAlign: "left",
  },
  requiredData: {
    textAlign: "left",
    color: Colors.requiredColor,
  },
  checkContainer: {
    borderColor: "#CACACA",
    borderWidth: 1,
    borderRadius: 10,
    /*  backgroundColor:"red", */
    /* display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignSelf:"flex-start" */
  },
});

export default SignUpScreen;
