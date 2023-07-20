import {createStackNavigator} from "@react-navigation/stack"
import FeedScreen from "../../../screens/FeedScreen";


const StackNavigation = createStackNavigator()
const FeedNav = () =>{
    return (
        <StackNavigation.Navigator>
            <StackNavigation.Screen name="Feed" component={FeedScreen}/>
        </StackNavigation.Navigator>
    )
}
export default FeedNav;