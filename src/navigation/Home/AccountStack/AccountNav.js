import { createStackNavigator } from "@react-navigation/stack";
import AccountDataScreen from "../../../screens/AccountDataScreen";
import { Button } from "react-native-paper";
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

const StackNavigation = createStackNavigator();
const AccountNav = () => {
  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen
        name="Account"
        component={AccountOptions}
        options={{
          /* header:() => <UserAccount />, */
          headerTitle:"",
          headerLeft: () => <IconApp />
        }}
      />
      <StackNavigation.Screen
        name="AccountData"
        component={AccountDataScreen}
        options={{
          headerTitle: "Datos de la cuenta",
        }}
      />

      <StackNavigation.Screen
        name="UpdateAccount"
        component={UpdateAccountScreen}
        options={{
          headerTitle: "",
        }}
      />

      <StackNavigation.Screen 
        name="UploadImages"
        component={SelectImagesScreen}
        options={{
          headerTitle:" "
        }}
      />

      <StackNavigation.Screen
        name="CreateHost"
        component={CreateHostScreen}
        options={{
          headerTitle: "Crear hospedaje",
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
        })}
      />

      <StackNavigation.Screen
        name="UpdateHostData"
        component={UpdateHostDataScreen}
        options={{
          headerTitle: " ",
        }}
      />

      <StackNavigation.Screen
        name="ViewHostGuest"
        component={ViewGuestScreen}
        options={{
          headerTitle: "Tus huespedes",
        }}
      />

      <StackNavigation.Screen
        name="ViewHostRating"
        component={ViewHostRatingScreen}
        options={{
          headerTitle: "Tus calificaciones",
        }}
      />

      <StackNavigation.Screen
        name="SearchHost"
        component={SearchHostScreen}
        options={{
          headerTitle: "Buscar hospedaje",
        }}
      />

      <StackNavigation.Screen
        name="UbicationSearch"
        component={UbicationsScreen}
        options={{
          headerTitle: " ",
        }}
      />

      <StackNavigation.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{
          headerTitle: "Resultados",
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
        })}
      />

        <StackNavigation.Screen 
          name="ViewRating"
          component={ViewCommentScreen}
          options={{
            headerTitle:"Tu calificacion"
          }}
        />

        <StackNavigation.Screen 
          name="UpdateComment"
          component={UpdateCommentScreen}
          options={{
            headerTitle: "Actualizar comentario"
          }}
        />


      <StackNavigation.Screen 
        name="AddRating"
        component={AddRatingScreen}
        options={{
          headerTitle:"Calificar"
        }}
      />

      <StackNavigation.Screen
        name="ViewHost"
        component={ViewGuestHost}
        options={{
          headerTitle: " ",
        }}
      />

      <StackNavigation.Screen 
        name="ViewComments"
        component={ViewCommentsScreen}
        options={{
          headerTitle: " "
        }}
      />

      <StackNavigation.Screen
        name="UpdatePawData"
        component={UpdatePawData}
        options={{
          headerTitle: "Tu Mascota",
        }}
      />

      <StackNavigation.Screen
        name="ConfirmUpdatePaw"
        component={ConfirmUpdatePawScreen}
        options={{
            headerTitle:' '
        }}
      />

      <StackNavigation.Screen
        name="UpdateImagePaw"
        component={UpdateImagePaw}
        options={{
            headerTitle:'Cambiar Imagen'
        }}
      />

      <StackNavigation.Screen
        name="ConfirmReserve"
        component={ConfirmReserveScreen}
        options={{
            headerTitle:'Confirmar reserva'
        }}
      />
    </StackNavigation.Navigator>
  );
};

export default AccountNav;
