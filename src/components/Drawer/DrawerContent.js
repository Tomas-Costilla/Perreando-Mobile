import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { server } from "../../api/server";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import { PROFILE_TYPES } from "../../tools/constant";

export default function DrawerContent(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [loading,setLoading] = useState(false)

  const logoutServer = async () => {
    setLoading(true)
    try {
      await server.post("/user/signup");
      dispatch(signUp());
    } catch (error) {}
    setLoading(false)
  };

  return (
    <View style={myStyles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
        icon={()=><Icon name="account-outline" size={25}/>}
          label="Mi cuenta"
          onPress={() => navigation.navigate("AccountData")}
        />
        {user.userProfile === PROFILE_TYPES.HUESPED ? (
          <>
            <DrawerItem
              label="Mis Mascotas"
              icon={()=><Icon name="paw-outline" size={25}/>}
              onPress={() => navigation.navigate("MyPets")}
            />
            <DrawerItem
              label="Mis favoritos"
              icon={()=><Icon name="heart-outline" size={25}/>}
              onPress={() => navigation.navigate("Likes")}
            />
          </>
        ) : (
          <>
            <DrawerItem
              label="Mi Hospedaje"
              icon={()=><Icon name="home-outline" size={25}/>}
              onPress={() => navigation.navigate("ViewHostData")}
            />
          </>
        )}
       {/*  <DrawerItem label="Opcion 3" onPress={() => console.log("Opcion 3")} /> */}
      </DrawerContentScrollView>
      <DrawerItem 
        label="Terminos y condiciones"
        icon={() => <Icon name="text-box-outline" size={30} />}
        onPress={()=>navigation.navigate("TermAndConditions")}
      />
      <DrawerItem 
        label="Ayuda"
        icon={() => <Icon name="help-circle-outline" size={30} />}
      />
      <View style={myStyles.signoutContainer}>
        <DrawerItem
          label="Cerrar sesion"
          icon={() => <Icon name="logout" size={30} />}
          onPress={logoutServer}
          loading={loading}
        />
      </View>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signoutContainer: {
    marginBottom: 15,
    borderTopColor: "#dedede",
    borderTopWidth: 1,
    borderBottomColor: "#dedede",
  },
});
