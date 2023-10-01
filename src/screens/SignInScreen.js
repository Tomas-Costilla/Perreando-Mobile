import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import {
  Text,
  Button,
  TextInput,
  IconButton,
  HelperText,
} from "react-native-paper";
import { server } from "../api/server";
import { useDispatch } from "react-redux";
import { signIn } from "../store/slices/userSlice";
import axios from "axios";
import { Colors } from "../tools/constant";
import AppImage from "../../assets/logo-sin-fondo.png";
import InputView from "../components/InputView";
import Instagram from "../../assets/instagram.png"

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    typeErrorEmail: "",
    typeErrorPass: "",
  });
  const [errorServer, setErrorServer] = useState({
    isError: false,
    errorMessage: "",
  });
  const [inputValue, setInputValue] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [viewPassword, setViewPassword] = useState(false);

  const handleViewInstagram = () =>{
    Linking.openURL(`https://instagram.com/perreando.app?igshid=OGQ5ZDc2ODk2ZA==`)
}

  const handleInputData = (camp, value) =>
    setInputValue({ ...inputValue, [camp]: value });
  const handleViewPassword = () => setViewPassword(!viewPassword);

  const validateInputData = () => {
    setError({ ...error, typeErrorEmail: "", typeErrorPass: "" });
    let mailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (inputValue.userEmail === "") {
      setError({ ...error, typeErrorEmail: "El email esta vacio" });
      return;
    }
    if (!inputValue.userEmail.match(mailFormat)) {
      setError({
        ...error,
        typeErrorEmail: "El email tiene un formato incorrecto",
      });
      return;
    }
    if (inputValue.userPassword === "") {
      setError({ ...error, typeErrorPass: "La contraseña esta vacia" });
      return;
    }

    signInUser();
  };

  const signInUser = async () => {
    setLoading(true);
    setErrorServer({ ...errorServer, isError: false, errorMessage: "" });
    try {
      let response = await server.post("/user/signin", inputValue);
      dispatch(signIn(response.data));
    } catch (error) {
      setErrorServer({
        ...errorServer,
        isError: true,
        errorMessage: error.response.data,
      });
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={myStyles.loginContainer}
    >
      <ScrollView>
        <View style={myStyles.imageContainer}>
          <Image source={AppImage} style={myStyles.logoImage} />
        </View>
        <Text style={myStyles.title} variant="headlineMedium">
          Iniciar sesion
        </Text>
        <InputView
          label="Email"
          editable={true}
          icon="email"
          nameField="userEmail"
          handleData={handleInputData}
          placeholder="Escribe tu email..."
          value={inputValue.userEmail}
          validateMessage={error.typeErrorEmail}
        />
        <InputView
          label="Contraseña"
          editable={true}
          icon={viewPassword ? "eye" : "eye-off"}
          nameField="userPassword"
          handleData={handleInputData}
          isPrivate={viewPassword ? false : true}
          placeholder="Escribe tu contraseña..."
          iconFunction={handleViewPassword}
          value={inputValue.userPassword}
          validateMessage={error.typeErrorPass}
        />
        {errorServer.isError && (
          <HelperText type="error">{errorServer.errorMessage}</HelperText>
        )}
        
          <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",marginTop:10,marginBottom:5}}>
            <Button
            mode="text"
            labelStyle={{color:"#000000"}}
            onPress={()=>navigation.navigate("ResetPassword")}
          >¿Has olvidado tu contraseña? Presiona aqui</Button>
          </View>


        <View style={myStyles.btnContainer}>
          <Button
            style={myStyles.btnLogin}
            mode="contained"
            onPress={() => validateInputData()}
            disabled={error.isErrorEmail || error.isErrorPass ? true : false}
            loading={loading}
            labelStyle={{ textAlign: "center", color: "#FFFFFF" }}
            icon="login"
          >
            Ingresar
          </Button>
        <Button
          mode="outlined"
          style={myStyles.btnSignUp}
          labelStyle={{color:"#000000"}}
          onPress={() => navigation.navigate("Profile")}
        >
          Registrarme
        </Button>
        </View>
        <View style={myStyles.socialNetwork}>
           <TouchableHighlight
             activeOpacity={1}
             underlayColor="#DDDDDD"
             style={{padding:3,borderRadius:5}}
             onPress={()=>handleViewInstagram()}
           >
            <Image source={Instagram} style={{width:35,height:35,marginTop:10}}/>
           </TouchableHighlight>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const myStyles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  logoImage: {
    width: 450,
    height: 300,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    gap: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    marginTop: 10,
    marginBottom: 10,
  },
  btnLogin: {
    width: 300,
    justifyContent: "flex-end",
    backgroundColor: Colors.principal,
    borderRadius: 10,
    padding: 5,
    marginBottom:10,
    marginTop:10
  },
  errorStyle: {
    color: "#FF0000",
  },
  btnSignUp: {
    backgroundColor:"#FFFFFF",
    width:300,
    borderColor:Colors.principal,
    padding:5,
    borderRadius:10

  },
  socialNetwork:{
    padding:10,
    display:"flex",
    alignItems:"center",
    marginTop:10,
    justifyContent:"center"
  }
});

export default SignInScreen;
