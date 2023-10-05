import {createStackNavigator} from "@react-navigation/stack"
import FeedScreen from "../../../screens/FeedScreen";
import IconApp from "../../../components/IconApp";
import ViewGuestHost from "../../../screens/ViewGuestHost";
import ViewCommentsScreen from "../../../screens/ViewCommentsScreen";
import ConfirmReserveScreen from "../../../screens/ConfirmReserveScreen";
import { Colors } from "../../../tools/constant";


const StackNavigation = createStackNavigator()
const FeedNav = () =>{
    return (
        <StackNavigation.Navigator>
            <StackNavigation.Screen 
                name="Feed" 
                component={FeedScreen}
                options={{
                    /* header:() => <UserAccount />, */
                    headerTitle:"",
                    headerLeft: () => <IconApp />,
                   /*  headerStyle:{backgroundColor:Colors.principal} */
                  }}
            />

<StackNavigation.Screen
        name="ViewHost"
        component={ViewGuestHost}
        options={{
          headerTitle: "Ver Publicacion",
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
    )
}
export default FeedNav;