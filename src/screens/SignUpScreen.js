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

const SignUpScreen = ({ route, navigation }) => {
  const { photo, profile, ubication } = route.params;
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    userFullName: "",
    userEmail: "",
    userPhone: 0,
    userPassword: "",
    userUbication: ubication,
    userAddressStreet: "",
    userAddressNumber: 0,
    userAddressBetwStreet: "",
    userAddressExtraInfo: "",
    userPhoto: photo,
    userProfile: profile,
    userGuestAnimalName:"",
    userGuestAnimalAge:0,
    userGuestAnimalWeight:0,
    userHostType: "Perros",
    userHostCapacity:0,
    userHostAnimalWeightFrom: 0,
    userHostAnimalWeightTo: 0,
    userHostAnimalAgeFrom: 0,
    userHostAnimalAgeTo: 0,
  });

  const [validMessage, setValidMessage] = useState({});

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleUserData = (camp, value) => setUserData({ ...userData, [camp]: value });
  const handleRepeatPassword = (value) => setPasswordRepeat(value);

  const signUpUser = async () => {
    setError(false);
    setServerError({ ...serverError, isError: false, errorMessage: "" });
    const { isValid, validationMessage } = ValidateUserData(
      userData,
      passwordRepeat
    );
    if(isValid === false){
        setValidMessage(validationMessage)
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
    formData.append("userUbication",userData.userUbication)
    formData.append("userAddressStreet",userData.userAddressStreet)
    formData.append("userAddressNumber",userData.userAddressNumber)
    formData.append("userAddressBetwStreet",userData.userAddressBetwStreet)
    formData.append("userAddressExtraInfo",userData.userAddressExtraInfo)
    formData.append("userProfile",userData.userProfile)
    formData.append("userGuestAnimalName",userData.userGuestAnimalName)
    formData.append("userGuestAnimalAge",userData.userGuestAnimalAge)
    formData.append("userGuestAnimalWeight",userData.userGuestAnimalWeight)
    formData.append("userHostType",userData.userHostType)
    formData.append("userHostAnimalWeightFrom",userData.userHostAnimalWeightFrom)
    formData.append("userHostAnimalWeightTo",userData.userHostAnimalWeightTo)
    formData.append("userHostAnimalAgeFrom",userData.userHostAnimalAgeFrom)
    formData.append("userHostAnimalAgeTo",userData.userHostAnimalAgeTo)
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
            setServerError({...serverError,isError: true,errorMessage: error.response.data})
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

        <InputSignUp
          textLabel="Nombre Completo"
          type="text"
          name="userFullName"
          handleData={handleUserData}
          validMessage={validMessage.name}
        />

        <InputSignUp
          textLabel="Email*"
          type="text"
          name="userEmail"
          handleData={handleUserData}
          validMessage={validMessage.email}
        />

        <InputSignUp
          textLabel="Tu celular*"
          type="numeric"
          name="userPhone"
          handleData={handleUserData}
          validMessage={validMessage.phone}
        />
        
        <InputSignUp
          textLabel="Tu Direccion*"
          type="text"
          name="userAddressStreet"
          handleData={handleUserData}
          validMessage={validMessage.address}
        />

        <InputSignUp
          textLabel="Altura"
          type="numeric"
          name="userAddressNumber"
          handleData={handleUserData}
          validMessage={validMessage.addressNumber}
        />

        <InputSignUp
          textLabel="Entre Calles"
          type="text"
          name="userAddressBetwStreet"
          handleData={handleUserData}
          validMessage={validMessage.addressBetwStreet}
        />

        <InputSignUp
          textLabel="Informacion extra, Ej: Depto 5B, etc"
          type="text"
          name="userAddressExtraInfo"
          handleData={handleUserData}
          validMessage={validMessage.addressExtrainf}
        />

        {profile === PROFILE_TYPES.ANFITRION ? (
          <HostInputs
            handleHostData={handleUserData}
            validMessage={validMessage}
          />
        ): <GuestInputs handleGuestData={handleUserData} validationMessage={validMessage}/>}

        <InputSignUp
          textLabel="Contraseña*"
          type="text"
          name="userPassword"
          handleData={handleUserData}
          validMessage={validMessage.password}
          secure={visible}
        />

        <InputSignUp
          textLabel="Repetir contraseña*"
          type="text"
          handleData={handleRepeatPassword}
          validMessage={validMessage.passwordRepeat}
          secure={visible}
          typeInput="password"
        />
        <Checkbox.Item
          style={myStyles.checkContainer}
          label="Mostrar contraseñas"
          position="trailing"
          status={!visible ? "checked" : "unchecked"}
          onPress={() => setVisible(!visible)}
        />

        <ErrorMessage
          isError={serverError.isError}
          errorMessage={serverError.errorMessage}
        />
        <View style={myStyles.btnContainer}>
          <Button
            style={myStyles.btnSignUp}
            mode="contained"
            onPress={signUpUser}
            loading={loading}
          >
            {!loading && "Crear Cuenta"}
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
    padding: 5,
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
