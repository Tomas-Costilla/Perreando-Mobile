import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "react-native-ui-lib";
import { server } from "../api/server";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../tools/constant";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function UbicationSelect({ handleState,handleCitie }) {
  const navigation = useNavigation();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateSelected, setStateSelected] = useState({
    stateName: "",
    stateId: "",
  });
  const [citieSelected, setCitieSelected] = useState({
    citieName: "",
    citieId: "",
  });

  const handleStateSelected = (value) => {
    setStateSelected({
      ...stateSelected,
      stateId: value.id,
      stateName: value.nombre,
    });
  };

  const handleCitieSelected = (value) =>
    setCitieSelected({
      ...citieSelected,
      citieName: value.nombre,
      citieId: value.id,
    });

  const getAllStates = async () => {
    try {
      let response = await server.get("/user/states");
      setStates(response.data);
    } catch (error) {
      if (error.response.data?.isLogged) {
        navigation.navigate("SessionOut");
        return;
      }
    }
  };

  const getAllCities = async (stateId) => {
    setCities([])
    try {
      let response = await server.get(`/user/ubications/${stateId}`);
      setCities(response.data.resultado);
    } catch (error) {
        if (error.response.data?.isLogged) {
            navigation.navigate("SessionOut");
            return;
          }
    }
  };

  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <>
      <Picker
        label="Selecciona tu provincia"
        placeholder={stateSelected.stateName ? stateSelected.stateName : "No has seleccionado ningun valor"}
        searchPlaceholder="Ingresa un valor..."
        onChange={(value) => {
          /*    console.log(value) */
          handleState(value);
          /*  setStateSelected({...stateSelected,stateName: value})
            getAllCities() */
        }}
        mode={Picker.modes.SINGLE}
        value={stateSelected.stateName}
        showSearch
        style={myStyles.pickerStyle}
        placeholderTextColor={Colors.textColor}
        labelStyle={{marginBottom:10,fontWeight:"bold"}}
        trailingAccessory={<Icon name="chevron-down" size={25}/>}
      >
        {states.map((value, index) => (
          <Picker.Item
            key={index}
            value={value.nombre}
            label={value.nombre}
            onPress={() => {
              handleStateSelected(value);
              getAllCities(value.id);
            }}
          />
        ))}
      </Picker>

      {cities.length>0 && (
        <Picker
          label="Selecciona tu localidad"
          showSearch
          placeholder={citieSelected.citieName ? citieSelected.citieName : "No ha seleccionado ningun valor"}
          searchPlaceholder="Ingresa un valor..."
          value={citieSelected.citieName}
          mode={Picker.modes.SINGLE}
          onChange={value=>handleCitie(value)}
          style={myStyles.pickerStyle}
          placeholderTextColor={Colors.textColor}
          labelStyle={{marginBottom:10,fontWeight:"bold"}}
          trailingAccessory={<Icon name="chevron-down" size={25}/>}
        >
          {cities.map((value, index) => (
            <Picker.Item
              key={index}
              value={value.nombre}
              label={value.nombre}
              onPress={() => handleCitieSelected(value)}
            />
          ))}
        </Picker>
      )}
    </>
  );
}

const myStyles = StyleSheet.create({
    pickerStyle:{
        marginBottom:10
    }
});
