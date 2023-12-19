import {} from "react"
import {createStackNavigator} from "@react-navigation/stack"
import OnboardingScreen from "../screens/OnboardingScreen"


const StackNavigation = createStackNavigator()
const OnboardingNav = () =>{
    return (
        <StackNavigation.Navigator>
            <StackNavigation.Screen 
                component={OnboardingScreen}
                name="Onboarding"
                options={{
                    headerShown:false
                }}
            />
        </StackNavigation.Navigator>
    )   
}

export default OnboardingNav;