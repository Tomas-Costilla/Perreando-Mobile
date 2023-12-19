import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import Message from "./Message";
import Loading from "./Loading";
import { server } from "../api/server";

export default function Countries({navigation}) {
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState("");
  const [countries, setCountries] = useState([]);

  const loadAllActiveCountries = async () => {
    setLoading(true);
    setErrorServer("");
    try {
      let response = await server.get("/country");
      setCountries(response.data.countries);
    } catch (error) {
      if (error.response.data?.message)
        setErrorServer(error.response.data?.message);
      else setErrorServer("Ocurrio un error al mostrar los paises habilitados");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAllActiveCountries();
  }, []);

  if (loading) return <Loading />;

  return (
    <View style={{marginTop:10}}>
      {errorServer ? (
        <Message msg={errorServer} type="error" />
      ) : (
        <FlatList
          data={countries}
          renderItem={({ item }) => (
            <List.Item
              title={item.countryName}
              left={(props) => <List.Icon icon="flag" />}
              onPress={()=>navigation.navigate("Profile",{countryId: item._id})}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  countriesContainer: {
    display: "flex",
  },
});
