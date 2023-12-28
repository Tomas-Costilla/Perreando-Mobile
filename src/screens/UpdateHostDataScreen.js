import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Colors } from "../tools/constant";
import InputView from "../components/InputView";
import { server } from "../api/server";
import Message from "../components/Message";

export default function UpdateHostDataScreen({ navigation, route }) {
 /*  const { hostDataId } = route.params; */
  const [newHostData, setNewHostData] = useState({...route.params.hostData});
  const [loading,setLoading] = useState(false)
  const [loadingData,setLoadingData] = useState(false)
  const [errorServer,setErrorServer] = useState("")

  /* console.log(newHostData);
 */
  const handleNewHostData = (field, value) => {
    setNewHostData({ ...newHostData, [field]: value });
  }


    const updateHostData = async () =>{
        setLoading(true)
        setErrorServer("")
        try {
            await server.put(`/host/${newHostData._id}`,newHostData)
            navigation.navigate("Account")
        } catch (error) {
          if(error.response.data?.isLogged===false) navigation.navigate("SessionOut")
            
          if(error.response.data?.message) setErrorServer(error.response.data?.message)
          else setErrorServer("Ocurrio un error en la peticion")
          
        }
        setLoading(false)
    }



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
          nameField="hostPresentation"
          label="Actualizar presentacion"
          editable={true}
          value={newHostData.hostPresentation}
          handleData={handleNewHostData}
          icon="pencil"
          multiline={true}
          maxCharacters={150}
          helperMessage={`${newHostData.hostPresentation.length}/150`}
        />

    <InputView
          nameField="hostCompleteAddress"
          label="Actualizar direccion"
          editable={true}
          value={newHostData.hostCompleteAddress}
          handleData={handleNewHostData}
          icon="pencil"
          multiline={true}
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

        {errorServer && <Message msg={errorServer} type="error"/>}

        <View style={myStyles.btnContainer}>
          <Button mode="contained" onPress={() => updateHostData()} loading={loading} style={myStyles.btnConfirmUpdate} icon="pencil">
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
    width:200,
    backgroundColor:Colors.backgroundColor
  },
  loadingContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:10,
    backgroundColor:Colors.backgroundColor
  },
  btnContainer: {
    padding: 10,
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:10,
    marginBottom:10
  },
  btnConfirmUpdate:{
    padding:3,
    backgroundColor:Colors.principalBtn,
    width:300
  }
});
