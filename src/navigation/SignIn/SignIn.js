import { createStackNavigator } from "@react-navigation/stack";
//Screens
import SignInScreen from "../../screens/SignInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import PhotoScreen from "../../screens/SignUp/PhotoScreen";
import ProfileScreen from "../../screens/SignUp/ProfileScreen";
import UbicationsScreen from "../../screens/UbicationsScreen";
import UbicationSelect from "../../screens/SignUp/UbicationSelect";
import ResetPassword from "../../screens/ResetPassword";
import ValidateCodeScreen from "../../screens/ValidateCodeScreen";
import ChangePasswordScreen from "../../screens/ChangePasswordScreen";

const StackNavigation = createStackNavigator();
const SingInStack = () => {
  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen 
        name="SignIn" 
        component={SignInScreen}
        options={{
            headerShown:false,
            
        }} 
    />
      <StackNavigation.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          headerTitle:"Seleccionar perfil"
        }} 
      />
      <StackNavigation.Screen
        name="Photo"
        component={PhotoScreen}
        initialParams={{ displayHeader: true }}
        options={({ route }) => ({
          headerShown: route.params.displayHeader,
          headerTitle:"Imagen del perfil"
        })}
      />
      <StackNavigation.Screen
        name="UbicationSelect"
        component={UbicationSelect}
        options={{
          headerTitle:"Tu ubicacion"
        }}
      />
      <StackNavigation.Screen
        name="UbicationSearch"
        component={UbicationsScreen}
        options={{
          headerTitle:""
        }}
      />
      <StackNavigation.Screen name="SignUp" component={SignUpScreen} options={{headerTitle:"Completar registro"}} />
     
      <StackNavigation.Screen 
        name="ResetPassword" 
        component={ResetPassword}
        options={{
          headerShown:true,
          headerTitle:"Recuperar contraseña"
        }}
      />

      <StackNavigation.Screen 
        name="ValidateCode"
        component={ValidateCodeScreen}
        options={{
          headerShown:true,
          headerTitle: ""
        }}
      />

      <StackNavigation.Screen 
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown:false
        }}
      />

    </StackNavigation.Navigator>

  );
};

export default SingInStack;
