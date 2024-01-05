import { useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, HelperText, Text } from "react-native-paper";
import { Colors } from "../tools/constant";
import InputView from "../components/InputView";
import { DateTimePicker, Picker, Slider, TextField } from "react-native-ui-lib";
import UbicationSelect from "../components/UbicationSelect";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function SearchHostScreen({ route }) {
  /* console.log(route.params.ubication) */
  /* const [totalDay,setTotalDay] = useState(0) */
  const navigation = useNavigation()
  const [stateSelected, setStateSelected] = useState("");
  const [citieSelected, setCitieSelected] = useState("");
  const [dateBookingFrom, setDateBookingFrom] = useState("");
  const [dateBookingTo, setDateBookingTo] = useState("");
  const [sliderValue, setSliderValue] = useState(1);
  const [filterData, setFilterData] = useState({
    age: 0,
    weight: 0,
  });
  const [errors, setErrors] = useState({
    date: "",
    slider: "",
    ubication: "",
    ageweight: "",
  });

  const handleStateSelected = (state) => setStateSelected(state);
  const handleCitieSelected = (citie) => setCitieSelected(citie);
  const handleSliderValue = (value) => setSliderValue(value);
  const handleFilterData = (camp, value) =>
    setFilterData({ ...filterData, [camp]: value });

  const handleBookingDateFrom = (value) => {
    let dateMoment = moment(value).format("DD/MM/YYYY");
    setDateBookingFrom(dateMoment);
  };
  const handleBookingDateTo = (value) => {
    let dateMoment = moment(value).format("DD/MM/YYYY");
    setDateBookingTo(dateMoment);
  };

  const validateData = () => {
    let messages = { date: "", slider: "", ubication: "", ageweight: "" };
    let isValid = true;

    if (moment(dateBookingFrom).isBefore(dateBookingTo)) {
      messages.date = "La fecha desde no puede ser antes que la de inicio";
      isValid = false;
    }  

    if(dateBookingFrom==="" || dateBookingTo === ""){
        messages.date = "Debes seleccionar fechas estimadas de tu estadia"
        isValid = false
    }

    if (sliderValue === 1) {
      messages.slider = "Debes seleccionar un rango de importe por dia";
      isValid = false;
    }
    if (stateSelected === "" || citieSelected === "") {
      messages.ubication =
        "Debes seleccionar la ubicacion para encontrar hospedajes";
      isValid = false;
    }
    if (filterData.age === 0 || filterData.weight === 0) {
      messages.ageweight = "Debes incluir los datos de tu mascota a hospedar";
      isValid = false;
    }

    if (!isValid) {
      setErrors({
        ...errors,
        ageweight: messages.ageweight,
        date: messages.date,
        slider: messages.slider,
        ubication: messages.ubication,
      });
      return
    }
    handleSearchHost()
  };

  const handleSearchHost = () =>{
    navigation.navigate("SearchResult",{
        state: stateSelected,
        city:citieSelected,
        total:sliderValue,
        age:filterData.age,
        weight: filterData.weight,
        datefrom: dateBookingFrom,
        dateto:dateBookingTo
    })
  }

  return (
    <ScrollView style={myStyles.container}>
      <View style={myStyles.ubicationContainer}>
        <UbicationSelect
          handleState={handleStateSelected}
          handleCitie={handleCitieSelected}
        />
        {errors.ubication && <HelperText type="error">{errors.ubication}</HelperText>}
      </View>

      <View style={myStyles.totalContainer}>
        <Text style={{ marginTop: 10, marginBottom: 10 }}>
          Selecciona el rango de importe por dia
        </Text>
        <Slider
          value={1}
          minimumValue={1}
          maximumValue={100000}
          onValueChange={(value) => handleSliderValue(value)}
          step={1}
        />
        <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>
          $1 a ${sliderValue}
        </Text>
        {errors.slider && <HelperText type="error">{errors.slider}</HelperText>}
      </View>

      <View style={myStyles.dataContainer}>
        <TextField
          placeholder="Ingresa el peso de tu mascota en KG"
          floatingPlaceholder={true}
          onChangeText={(value) => handleFilterData("weight", value)}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <TextField
          placeholder="Ingresa la edad de tu mascota"
          floatingPlaceholder={true}
          onChangeText={(value) => handleFilterData("age", value)}
        />
        {errors.ageweight && <HelperText type="error">{errors.ageweight}</HelperText>}
      </View>

      <View style={myStyles.dateTimeContainer}>
        <DateTimePicker
          label="Selecciona la fecha de inicio de tu estadia"
          placeholder="no has seleccionado ningun valor"
          mode="date"
          onChange={(value) => handleBookingDateFrom(value)}
          style={myStyles.datePickerStyle}
          trailingAccessory={<Icon name="calendar" size={25} />}
          labelStyle={{ color: Colors.textColor, fontWeight: "bold" }}
        />
        <DateTimePicker
          label="Selecciona la fecha de fin de tu estadia"
          placeholder="no has seleccionado ningun valor"
          mode="date"
          onChange={(value) => handleBookingDateTo(value)}
          style={myStyles.datePickerStyle}
          trailingAccessory={<Icon name="calendar" size={25} />}
          labelStyle={{ color: Colors.textColor, fontWeight: "bold" }}
        />
        {errors.date && <HelperText type="error">{errors.date}</HelperText>}
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Button
          mode="contained"
          style={myStyles.btnStyle}
          onPress={validateData}
          icon="magnify"
        >
          Realizar busqueda
        </Button>
      </View>
    </ScrollView>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 10,
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  btnUbications: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  btnSearchContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  btnViewMap: {
    width: 200,
    padding: 2,
    backgroundColor: Colors.backgroundColor,
    borderColor: "#000000",
    borderRadius: 10,
  },
  btnSearch: {
    width: 300,
    padding: 3,
    backgroundColor: Colors.principal,
    borderRadius: 10,
  },
  datePickerStyle: {
    marginBottom: 10,
    marginTop: 10,
  },
  dateTimeContainer: {
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.borderColor,
    padding: 10,
    marginTop: 10,
  },
  dataContainer: {
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.borderColor,
    padding: 10,
    marginTop: 10,
  },
  ubicationContainer: {
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.borderColor,
    padding: 10,
    marginBottom: 10,
  },
  totalContainer: {
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.borderColor,
    padding: 10,
    marginBottom: 10,
  },
  btnStyle: {
    backgroundColor: Colors.principalBtn,
    padding: 3,
    width: 300,
  },
});
