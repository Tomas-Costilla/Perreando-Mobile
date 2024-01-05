import {createStackNavigator} from "@react-navigation/stack"
import FeedScreen from "../../../screens/FeedScreen";
import IconApp from "../../../components/IconApp";
import ViewGuestHost from "../../../screens/ViewGuestHost";
import ViewCommentsScreen from "../../../screens/ViewCommentsScreen";
import ConfirmReserveScreen from "../../../screens/ConfirmReserveScreen";
import { Colors } from "../../../tools/constant";
import SelectPetScreen from "../../../screens/Pet/SelectPetScreen";
import AddPetScreen from "../../../screens/Pet/AddPetScreen"
import { IconButton } from "react-native-paper";
import { View } from "react-native";
import LikesScreen from "../../../screens/LikesScreen";
import { useNavigation } from "@react-navigation/native";


const StackNavigation = createStackNavigator()
const FeedNav = () =>{
  const navigation = useNavigation()

    return (
        <StackNavigation.Navigator>
            <StackNavigation.Screen 
                name="Feed" 
                component={FeedScreen}
                options={{
                    /* header:() => <UserAccount />, */
                    headerTitle:"Perreando Feed",
                    headerTitleAlign:"left",
                    headerTitleStyle:{color:"#FFFFFF"},
                    /* headerLeft: () => <IconApp />, */
                    headerStyle:{backgroundColor:Colors.principal},
                    headerRight: () => (<View style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
                      <IconButton icon="star-outline" size={30} iconColor="#FFFFFF"/>
                      <IconButton icon="heart-outline" size={30} iconColor="#FFFFFF" onPress={()=>navigation.navigate("Likes")}/>
                    </View>)
                  }}
            />

<StackNavigation.Screen
        name="ViewHost"
        component={ViewGuestHost}
        options={{
          headerTitle: "",
          headerTitleStyle:{color:"#FFFFFF"},
          headerTitleAlign:"left",
          headerStyle:{backgroundColor:Colors.principal}
        }}
      />

      <StackNavigation.Screen 
        component={LikesScreen}
        name="Likes"
        options={{
          headerTitle: "Tus favoritos",
          headerTitleStyle:{color:"#FFFFFF"},
          headerTitleAlign:"left",
          headerStyle:{backgroundColor:Colors.principal}
        }}
      
      />

        <StackNavigation.Screen 
          name="SelectPet"
          component={SelectPetScreen}
          options={{
            headerTitle: "Tus mascotas",
            headerTitleStyle:{color:"#FFFFFF"},
            headerTitleAlign:"center",
            headerStyle:{backgroundColor:Colors.principal}
          }}
        
        />

        <StackNavigation.Screen 
          name="AddPet"
          component={AddPetScreen}
          options={{
            headerTitle: "",
            headerTitleStyle:{color:"#FFFFFF"},
            headerTitleAlign:"center",
            headerStyle:{backgroundColor:Colors.principal}
          }}
        />

      <StackNavigation.Screen 
        name="ViewComments"
        component={ViewCommentsScreen}
        options={{
          headerTitle: " ",
          headerTitleStyle:{color:"#FFFFFF"},
          headerTitleAlign:"left",
          headerStyle:{backgroundColor:Colors.principal}
        }}
      />

    <StackNavigation.Screen
        name="ConfirmReserve"
        component={ConfirmReserveScreen}
        options={{
            headerTitle:'Solicitud de reserva',
            headerTitleStyle:{color:"#FFFFFF"},
          headerTitleAlign:"left",
          headerStyle:{backgroundColor:Colors.principal}
        }}
      />

        </StackNavigation.Navigator>
    )
}
export default FeedNav;