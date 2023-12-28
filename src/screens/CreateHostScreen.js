import React, { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Button,
  HelperText,
  RadioButton,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import { Colors } from "../tools/constant";
import { useSelector } from "react-redux";
import { server } from "../api/server";
import ErrorMessage from "../components/ErrorMessage";
import InputView from "../components/InputView";
import Message from "../components/Message";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function CreateHostScreen({ navigation, route }) {
  const { images, state, town } = route.params;
  const user = useSelector((state) => state.user.user);
  const [typeAnimal, setTypeAnimal] = useState("Perros");
  const [loading, setLoading] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [errorServer, setErrorServer] = useState("");
  const [openDateFrom, setOpenDateFrom] = useState(false);
  const [openDateTo, setOpenDateTo] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [maxCharacters,setMaxCharacters] = useState(0)
  const [datesSelected, setDateSelected] = useState({
    datesSelectedFrom: "",
    dateSelectedTo: "",
  });
  const [validateMsg, setValidateMsg] = useState({
    description: "",
    capacity: "",
    price: "",
    location: "",
    weight: "",
    age: "",
    completeAddress: "",
    dates:"",
    presentation:""
  });
  const [hostData, setHostData] = useState({
    hostCountryId: user.userCountryId,
    hostOwnerId: user._id,
    hostDescription: "",
    hostPresentation:"",
    hostOwnerCapacity: 0,
    hostPrice: 0,
    hostTypeAnimals: typeAnimal,
    hostAnimalWeightFrom: 0,
    hostAnimalWeightTo: 0,
    hostAnimalAgeFrom: 0,
    hostAnimalAgeTo: 0,
    hostState: state,
    hostCity: town,
    hostCompleteAddress: "",
    hostAvailableStartDate: "",
    hostAvailableStartEnd: "",
  });

  const handleHostData = (camp, value) =>{
    if(camp==="hostPresentation" && value !== "") setMaxCharacters(maxCharacters+1)
    else setMaxCharacters(maxCharacters-1)
    setHostData({ ...hostData, [camp]: value });
  }

  const handleDateFrom = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpenDateFrom(false);
    setDateFrom(currentDate);
    setHostData({
      ...hostData,
      hostAvailableStartDate: moment(currentDate).format("YYYY-MM-DD"),
    });
  };

  const handleDateEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpenDateTo(false);
    setDateTo(currentDate);
    setHostData({
      ...hostData,
      hostAvailableStartEnd: moment(currentDate).format("YYYY-MM-DD"),
    });
  };

  const validateDataHost = () => {
    const messages = {
      description: "",
      location: "",
      capacity: "",
      price: "",
      weight: "",
      age: "",
      completeAddress: "",
      dates:"",
      presentation:""
    };
    let isValid = true;
    let isBefore = moment(hostData.hostAvailableStartEnd).isBefore(hostData.hostAvailableStartDate)
    let isSame = moment(hostData.hostAvailableStartDate).isSame(hostData.hostAvailableStartEnd)

    if (hostData.hostDescription === "") {
      messages.description = "Debes ingresar una descripcion";
      isValid = false;
    }

    if (hostData.hostOwnerCapacity === 0) {
      messages.capacity = "Debes ingresar tu capacidad maxima de alojamiento";
      isValid = false;
    }

    if (hostData.hostPrice === 0) {
      messages.price = "Debes ingresar el costo de estadia";
      isValid = false;
    }

    if (
      hostData.hostAnimalWeightTo == 0 ||
      hostData.hostAnimalWeightFrom == 0
    ) {
      messages.weight = "Debes ingresar el peso en KG que permites";
      isValid = false;
    }

    if (hostData.hostAnimalAgeFrom == 0 || hostData.hostAnimalWeightTo == 0) {
      messages.age = "Debes ingresar el rango de edades que permites";
    }

    if (hostData.hostCompleteAddress === "") {
      messages.completeAddress =
        "Debes ingresar la direccion completa del lugar";
      isValid = false;
    }

    if(hostData.hostAvailableStartDate === "" || hostData.hostAvailableStartEnd === ""){
        messages.dates = "Debes elegir la fecha de tu disponibilidad"
        isValid = false
    }

    if(isBefore){
        messages.dates = "La fecha de fin no puede ser menor que la de inicio"
        isValid = false
    }

    if(isSame){
        messages.dates = "Las fechas no pueden ser iguales"
        isValid=false
    }
    if(hostData.hostPresentation === ""){
        messages.presentation = "Debes colocar una presentacion"
        isValid = false
    }

    

    if (!isValid) {
      setValidateMsg({
        ...validateMsg,
        capacity: messages.capacity,
        description: messages.description,
        price: messages.price,
        weight: messages.weight,
        age: messages.age,
        completeAddress: messages.completeAddress,
        dates:messages.dates,
        presentation:messages.presentation
      });
    }
    return isValid;
  };

  const createHost = async () => {
    setLoading(true);
    setErrorServer("");
    let validateData = validateDataHost();
    if (!validateData) {
      setLoading(false);
      return;
    } else
      setValidateMsg({
        ...validateMsg,
        description: "",
        capacity: "",
        price: "",
        age: "",
        completeAddress: "",
        weight: "",
      });
    const formData = new FormData();
    formData.append("hostCountryId", hostData.hostCountryId);
    formData.append("hostOwnerId", hostData.hostOwnerId);
    formData.append("hostDescription", hostData.hostDescription);
    formData.append("hostPresentation",hostData.hostPresentation)
    formData.append("hostOwnerCapacity", hostData.hostOwnerCapacity);
    formData.append("hostPrice", hostData.hostPrice);
    formData.append("hostTypeAnimals", hostData.hostTypeAnimals);
    formData.append("hostAnimalWeightFrom", hostData.hostAnimalWeightFrom);
    formData.append("hostAnimalWeightTo", hostData.hostAnimalWeightTo);
    formData.append("hostAnimalAgeFrom", hostData.hostAnimalAgeFrom);
    formData.append("hostAnimalAgeTo", hostData.hostAnimalAgeTo);
    formData.append("hostState", hostData.hostState);
    formData.append("hostCity", hostData.hostCity);
    formData.append("hostCompleteAddress", hostData.hostCompleteAddress);
    formData.append("hostAvailableStartDate",hostData.hostAvailableStartDate)
    formData.append("hostAvailableStartEnd",hostData.hostAvailableStartEnd)
    images.forEach((value, index) => {
      formData.append("hostPhotos", {
        name: new Date() + "_hostPhotos",
        uri: value.uri,
        type: "image/jpg",
      });
    });
    /* console.log(formData) */
    try {
      await server.post("/host", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      navigation.navigate("Account");
    } catch (error) {
      if (error.response.data?.isLogged === false)
        navigation.navigate("SessionOut");

      if (error.response.data?.message)
        setErrorServer(error.response.data?.message);
      else setErrorServer("Ocurrio un error en la peticion");
    }
    setLoading(false);
  };

  useEffect(() => {
    /* checkIfAnyHostCreated() */
  }, []);

  if (loadingResponse)
    return (
      <View style={myStyles.responseContainer}>
        <ActivityIndicator animating size={40} />
      </View>
    );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={myStyles.container}
    >
      <ScrollView>
        <Text style={myStyles.title}>
          Completa los datos para crear el hospedaje
        </Text>
        <HelperText type="error">(*) Campos requeridos</HelperText>
        <InputView
          nameField="hostDescription"
          label="Ingresa un nombre descriptivo *"
          editable={true}
          handleData={handleHostData}
          validateMessage={validateMsg.description}
          placeholder="Ejemplo: Hospedaje de xxxxx"
        />
        <InputView
          nameField="hostPresentation"
          label="Ingresa una presentacion *"
          editable={true}
          handleData={handleHostData}
          validateMessage={validateMsg.presentation}
          placeholder="Ejemplo: Hola mi nombre es Tomas y tengo mi hospedaje..."
          multiline={true}
          maxCharacters={150}
          helperMessage={`${hostData.hostPresentation.length}/150`}
        />
        {/*  {validateMsg.description && <HelperText type="error" visible>{validateMsg.description}</HelperText>} */}

        <InputView
          nameField="hostOwnerCapacity"
          label="Ingresa tu capacidad maxima de huespedes *"
          editable={true}
          handleData={handleHostData}
          typeInput="numeric"
          inputStyles={myStyles.numberInput}
          validateMessage={validateMsg.capacity}
        />
        {/* {validateMsg.capacity && <HelperText type="error" visible>{validateMsg.capacity}</HelperText>} */}

        <InputView
          nameField="hostPrice"
          label="Ingresa el costo por dia de la estadia *"
          editable={true}
          handleData={handleHostData}
          typeInput="numeric"
          inputStyles={myStyles.numberInput}
          icon="currency-usd"
          validateMessage={validateMsg.price}
        />

        <InputView
          nameField="hostCompleteAddress"
          label="Ingresa la direccion completa del lugar *"
          placeholder="Ejemplo: Calle 123 entre Calle 4 y Calle 5"
          editable={true}
          handleData={handleHostData}
          validateMessage={validateMsg.completeAddress}
        />
        {/* {validateMsg.price && <HelperText type="error" visible>{validateMsg.price}</HelperText>} */}

        <View style={myStyles.specification}>
          <InputView
            nameField="hostAnimalWeightFrom"
            label="Peso en KG desde *"
            editable={true}
            handleData={handleHostData}
            typeInput="numeric"
          />
          <InputView
            nameField="hostAnimalWeightTo"
            label="Peso en KG hasta *"
            editable={true}
            handleData={handleHostData}
            typeInput="numeric"
          />
        </View>
        {validateMsg.weight && (
          <HelperText type="error" visible>
            {validateMsg.weight}
          </HelperText>
        )}

        <View style={myStyles.specification}>
          <InputView
            nameField="hostAnimalAgeFrom"
            label="Edad desde *"
            editable={true}
            handleData={handleHostData}
            typeInput="numeric"
          />
          <InputView
            nameField="hostAnimalAgeTo"
            label="Edad hasta *"
            editable={true}
            handleData={handleHostData}
            typeInput="numeric"
          />
        </View>
              {validateMsg.age && (
                <HelperText type="error" visible>
                  {validateMsg.age}
                </HelperText>
              )}

        <View>
          <Text style={myStyles.dateTitle}>Fecha de disponibilidad</Text>
          <View style={myStyles.datesContainer}>
            <Button
              mode="text"
              icon="calendar"
              onPress={() => setOpenDateFrom(!openDateFrom)}
              labelStyle={{color:Colors.textColor}}
            >
              Desde
            </Button>

            <Button
              mode="text"
              icon="calendar"
              onPress={() => setOpenDateTo(!openDateTo)}
              labelStyle={{color:Colors.textColor}}
            >
              hasta
            </Button>
          </View>
        </View>

        <View style={myStyles.datesHostContainer}>
            {hostData.hostAvailableStartDate && <Text>{hostData.hostAvailableStartDate} inclusive</Text>}
            <Text>-</Text>
            {hostData.hostAvailableStartEnd && <Text>{hostData.hostAvailableStartEnd} inclusive</Text>}
        </View>
        {validateMsg.dates && <HelperText type="error">{validateMsg.dates}</HelperText>}

        {openDateFrom && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateFrom}
            mode="date"
            onChange={handleDateFrom}
            display="default"
          />
        )}

        {openDateTo && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTo}
            mode="date"
            onChange={handleDateEnd}
            display="default"
          />
        )}


        {errorServer && <Message msg={errorServer} type="error" />}

        <View style={myStyles.btnContainer}>
          <Button
            mode="contained"
            style={myStyles.btnStyles}
            onPress={() => createHost()}
            loading={loading}
          >
            Crear Hospedaje
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    flex: 1,
    /* display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        gap:10 */
  },
  responseContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  messageResponse: {
    textAlign: "justify",
    fontSize: 15,
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  specification: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radioContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  btnStyles: {
    backgroundColor: Colors.principalBtn,
    padding: 3,
    width: 300,
  },
  numberInput: {
    width: 150,
  },
  datesContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center"
  },
  dateTitle:{
    marginBottom:20,
    marginTop:10
  },
  datesHostContainer:{
    display:"flex",
    justifyContent:"space-evenly",
    flexDirection:"row",
    alignItems:"center",
    marginTop:10,
    marginBottom:10
  }
});
