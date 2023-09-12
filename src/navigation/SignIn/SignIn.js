import { createStackNavigator } from "@react-navigation/stack";
//Screens
import SignInScreen from "../../screens/SignInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import PhotoScreen from "../../screens/SignUp/PhotoScreen";
import ProfileScreen from "../../screens/SignUp/ProfileScreen";
import UbicationsScreen from "../../screens/UbicationsScreen";
import UbicationSelect from "../../screens/SignUp/UbicationSelect";

const StackNavigation = createStackNavigator();
const SingInStack = () => {
  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen 
        name=" " 
        component={SignInScreen}
        options={{
            headerShown:false
        }} 
    />
      <StackNavigation.Screen name="Profile" component={ProfileScreen} />
      <StackNavigation.Screen
        name="Photo"
        component={PhotoScreen}
        initialParams={{ displayHeader: true }}
        options={({ route }) => ({
          headerShown: route.params.displayHeader,
        })}
      />
      <StackNavigation.Screen
        name="UbicationSelect"
        component={UbicationSelect}
      />
      <StackNavigation.Screen
        name="UbicationSearch"
        component={UbicationsScreen}
      />
      <StackNavigation.Screen name="SignUp" component={SignUpScreen} />
    </StackNavigation.Navigator>
  );
};

export default SingInStack;
