import {createStackNavigator} from "@react-navigation/stack"
import SearchScreen from "../../../screens/SearchScreen";

const StackNavigation = createStackNavigator()
const SearchNav = () =>{
    return(
        <StackNavigation.Navigator>
            <StackNavigation.Screen name="Search" component={SearchScreen}/>
        </StackNavigation.Navigator>
    )
}

export default SearchNav;