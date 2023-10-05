import { createStackNavigator } from "@react-navigation/stack";
import SearchHostScreen from "../../../screens/SearchHostScreen";
import UbicationsScreen from "../../../screens/UbicationsScreen";
import SearchResultScreen from "../../../screens/SearchResultScreen";
import ViewGuestHost from "../../../screens/ViewGuestHost";
import ViewCommentsScreen from "../../../screens/ViewCommentsScreen";
import ConfirmReserveScreen from "../../../screens/ConfirmReserveScreen";
/* import SearchScreen from "../../../screens/SearchScreen";
 */
const StackNavigation = createStackNavigator();
const SearchNav = () => {
  return (
    <StackNavigation.Navigator>
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
        name="ConfirmReserve"
        component={ConfirmReserveScreen}
        options={{
            headerTitle:'Confirmar reserva'
        }}
      />

    </StackNavigation.Navigator>
  );
};

export default SearchNav;
