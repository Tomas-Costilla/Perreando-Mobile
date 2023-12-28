import { createStackNavigator } from "@react-navigation/stack";
import AccountDataScreen from "../../../screens/AccountDataScreen";
import { Button, IconButton } from "react-native-paper";
import LogoutBtn from "../../../components/LogoutBtn";
import AccountOptions from "../../../components/AccountOptions";
import UserAccount from "../../../components/UserAccount";
import FeedNav from "../FeedStack/FeedNav";
import CreateHostScreen from "../../../screens/CreateHostScreen";
import ViewHostScreen from "../../../screens/ViewHostScreen";
import BackButton from "../../../components/BackButton";
import UpdateHostDataScreen from "../../../screens/UpdateHostDataScreen";
import ViewGuestScreen from "../../../screens/ViewGuestScreen";
import ViewHostRatingScreen from "../../../screens/ViewHostRatingScreen";
import SearchHostScreen from "../../../screens/SearchHostScreen";
import UbicationsScreen from "../../../screens/UbicationsScreen";
import SearchResultScreen from "../../../screens/SearchResultScreen";
import UpdateAccountScreen from "../../../screens/UpdateAccountScreen";
import GuestHostScreen from "../../../screens/GuestHostScreen";
import ViewGuestHost from "../../../screens/ViewGuestHost";
import UpdatePawData from "../../../screens/UpdatePawData";
import ConfirmReserveScreen from "../../../screens/ConfirmReserveScreen";
import ConfirmUpdatePawScreen from "../../../screens/ConfirmUpdatePawScreen";
import UpdateImagePaw from "../../../screens/UpdateImagePaw";
import AddRatingScreen from "../../../screens/AddRatingScreen";
import IconApp from "../../../components/IconApp";
import MyBookingsScreen from "../../../screens/MyBookingsScreen";
import ViewCommentScreen from "../../../screens/ViewCommentScreen";
import UpdateCommentScreen from "../../../screens/UpdateCommentScreen";
import SelectImagesScreen from "../../../screens/SelectImagesScreen";
import ViewCommentsScreen from "../../../screens/ViewCommentsScreen";
import { Colors } from "../../../tools/constant";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import SelectUbication from "../../../screens/Ubication/SelectUbication";
import SelectState from "../../../screens/Ubication/SelectState";
import SelectTown from "../../../screens/Ubication/SelectTown";
import AddPetScreen from "../../../screens/Pet/AddPetScreen";
import MyPetsScreen from "../../../screens/Pet/MyPetsScreen";
import EditPetScreen from "../../../screens/Pet/EditPetScreen";
import TermAndConditionsScreen from "../../../screens/TermAndConditionsScreen";
import LikesScreen from "../../../screens/LikesScreen";
/* import SessionOutScreen from "../../../screens/SessionOutScreen";
 */
const StackNavigation = createStackNavigator();
const AccountNav = () => {
  const navigation = useNavigation();
  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen
        name="Account"
        component={AccountOptions}
        options={{
          headerRight: () => (
            <IconButton
              icon="menu"
              size={30}
              iconColor="#FFFFFF"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          ),
          headerTitle: "Mi Cuenta",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen 
        name="TermAndConditions"
        component={TermAndConditionsScreen}
        options={{
          headerTitle: "",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="AccountData"
        component={AccountDataScreen}
        options={{
          headerTitle: "Datos de la cuenta",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="UpdateAccount"
        component={UpdateAccountScreen}
        options={{
          headerTitle: "",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="UploadImages"
        component={SelectImagesScreen}
        options={{
          headerTitle: " ",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="SelectUbication"
        component={SelectUbication}
        options={{
          headerTitle: "Ubicacion",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="SelectState"
        component={SelectState}
        options={{
          headerTitle: "Provincias",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="SelectTown"
        component={SelectTown}
        options={{
          headerTitle: "Localidades",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="CreateHost"
        component={CreateHostScreen}
        options={{
          headerTitle: "Crear hospedaje",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
        /* component={} */
      />

      <StackNavigation.Screen
        name="ViewHostData"
        component={ViewHostScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <BackButton navigation={navigation} screen="Account" />
          ),
          headerTitle: "Mi hospedaje",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        })}
      />

      <StackNavigation.Screen
        name="UpdateHostData"
        component={UpdateHostDataScreen}
        options={{
          headerTitle: " ",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="ViewHostGuest"
        component={ViewGuestScreen}
        options={{
          headerTitle: "Tus huespedes",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="ViewHostRating"
        component={ViewHostRatingScreen}
        options={{
          headerTitle: "Tus calificaciones",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="SearchHost"
        component={SearchHostScreen}
        options={{
          headerTitle: "Buscar hospedaje",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="UbicationSearch"
        component={UbicationsScreen}
        options={{
          headerTitle: " ",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{
          headerTitle: "Resultados",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <BackButton navigation={navigation} screen="Account" />
          ),
          headerTitle: "Mis Reservas",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        })}
      />

      <StackNavigation.Screen
        name="GuestHost"
        component={GuestHostScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <BackButton navigation={navigation} screen="Account" />
          ),
          headerTitle: "Mi Reserva",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        })}
      />

      <StackNavigation.Screen
        name="ViewRating"
        component={ViewCommentScreen}
        options={{
          headerTitle: "Tu calificacion",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="UpdateComment"
        component={UpdateCommentScreen}
        options={{
          headerTitle: "Actualizar comentario",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="AddRating"
        component={AddRatingScreen}
        options={{
          headerTitle: "Calificar",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="ViewHost"
        component={ViewGuestHost}
        options={{
          headerTitle: " ",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="ViewComments"
        component={ViewCommentsScreen}
        options={{
          headerTitle: " ",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="UpdatePawData"
        component={UpdatePawData}
        options={{
          headerTitle: "Tu Mascota",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="ConfirmUpdatePaw"
        component={ConfirmUpdatePawScreen}
        options={{
          headerTitle: " ",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="UpdateImagePaw"
        component={UpdateImagePaw}
        options={{
          headerTitle: "Cambiar Imagen",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen
        name="ConfirmReserve"
        component={ConfirmReserveScreen}
        options={{
          headerTitle: "Confirmar reserva",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen 
        name="AddPet"
        component={AddPetScreen}
        options={{
          headerTitle: "Agregar mascota",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
          
        }}
      />

      <StackNavigation.Screen 
        name="MyPets"
        component={MyPetsScreen}
        options={{
          headerTitle: "Tus mascotas",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
          headerRight: () => (
            <IconButton
              icon="plus"
              size={30}
              iconColor="#FFFFFF"
              onPress={() => navigation.navigate("AddPet")}
            />
          )
        }}
      />

      <StackNavigation.Screen 
        name="EditPet"
        component={EditPetScreen}
        options={{
          headerTitle: "Editar mascota",
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: Colors.principal },
        }}
      />

      <StackNavigation.Screen 
        name="Likes"
        component={LikesScreen}
        options={{
          headerTitle: "Tus favoritos",
          headerTitleStyle:{color:"#FFFFFF"},
          headerTitleAlign:"left",
          headerStyle:{backgroundColor:Colors.principal}
        }}
      />


    </StackNavigation.Navigator>
  );
};

export default AccountNav;
