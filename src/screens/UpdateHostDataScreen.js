import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Colors } from "../tools/constant";
import InputView from "../components/InputView";
import { server } from "../api/server";

export default function UpdateHostDataScreen({ navigation, route }) {
  const { hostDataId } = route.params;
  const [newHostData, setNewHostData] = useState({});
  const [loading,setLoading] = useState(false)
  const [loadingData,setLoadingData] = useState(false)
  const [errorServer,setErrorServer] = useState("")

  /* console.log(newHostData);
 */
  const handleNewHostData = (field, value) => {
    setNewHostData({ ...newHostData, [field]: value });
  }


    const getOwnerHostbyID = async () =>{
        setLoadingData(true)
        try {
            const response = await server.get(`/host/owner/${hostDataId}`)
            setNewHostData(response.data)
        } catch (error) {
            setErrorServer(error.response.data)
        }
        setLoadingData(false)
    }

    const updateHostData = async () =>{
        setLoading(true)
        try {
            await server.put(`/host/${newHostData._id}`,newHostData)
            navigation.navigate("Account")
        } catch (error) {
            console.log(error.response.data)   
        }
        setLoading(false)
    }

    useEffect(()=>{
        getOwnerHostbyID()
    },[])


    if(loadingData) return <View style={myStyles.loadingContainer}>
        <ActivityIndicator animating size={40}/>
    </View>


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={myStyles.container}
    >
      <ScrollView /* style={myStyles.container} */>
        {/* <View style={myStyles.container}> */}
        <Text style={myStyles.title}>Modificar datos de alojamiento</Text>
        <InputView
          nameField="hostDescription"
          label="Modificar nombre descriptivo"
          editable={true}
          value={newHostData.hostDescription}
          handleData={handleNewHostData}
          icon="pencil"
        />

<InputView
          nameField="hostAnimalWeightFrom"
          label="Modificar Peso en KG desde"
          editable={true}
          value={newHostData.hostAnimalWeightFrom}
          handleData={handleNewHostData}
          typeInput="numeric"
          icon="pencil"
          inputStyles={myStyles.inputNumber}
        />

<InputView
          nameField="hostAnimalWeightTo"
          label="Modificar Peso en KG hasta"
          editable={true}
          value={newHostData.hostAnimalWeightTo}
          handleData={handleNewHostData}
          typeInput="numeric"
          icon="pencil"
          inputStyles={myStyles.inputNumber}
        />

        <InputView
          nameField="hostAnimalAgeFrom"
          label="Modificar Edad desde"
          editable={true}
          value={newHostData.hostAnimalAgeFrom}
          handleData={handleNewHostData}
          typeInput="numeric"
          icon="pencil"
          inputStyles={myStyles.inputNumber}
        />

        <InputView
          nameField="hostAnimalAgeTo"
          label="Modificar Edad hasta"
          editable={true}
          value={newHostData.hostAnimalAgeTo}
          handleData={handleNewHostData}
          typeInput="numeric"
          icon="pencil"
          inputStyles={myStyles.inputNumber}
        />

        <InputView
          nameField="hostOwnerCapacity"
          label="Modificar capacidad maxima"
          editable={true}
          value={newHostData.hostOwnerCapacity}
          handleData={handleNewHostData}
          typeInput="numeric"
          icon="pencil"
        />
        <InputView
          nameField="hostPrice"
          label="Modificar costo de estadia"
          editable={true}
          value={newHostData.hostPrice}
          handleData={handleNewHostData}
          typeInput="numeric"
          icon="pencil"
        />

        <View style={myStyles.btnContainer}>
          <Button mode="contained" onPress={() => updateHostData()} loading={loading}>
            Confirmar cambios
          </Button>
        </View>
        {/*   </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const myStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  inputNumber:{
    width:200
  },
  loadingContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:10
  },
  btnContainer: {
    padding: 10,
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:10,
    marginBottom:10
  },
});
