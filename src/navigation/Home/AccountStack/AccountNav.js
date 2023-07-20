import {createStackNavigator} from "@react-navigation/stack"
import AccountDataScreen from "../../../screens/AccountDataScreen"
import { Button } from "react-native-paper"
import LogoutBtn from "../../../components/LogoutBtn"
import AccountOptions from "../../../components/AccountOptions"
import UserAccount from "../../../components/UserAccount"
import FeedNav from "../FeedStack/FeedNav"
import CreateHostScreen from "../../../screens/CreateHostScreen"
import ViewHostScreen from "../../../screens/ViewHostScreen"
import BackButton from "../../../components/BackButton"
import UpdateHostDataScreen from "../../../screens/UpdateHostDataScreen"
import ViewGuestScreen from "../../../screens/ViewGuestScreen"
import ViewHostRatingScreen from "../../../screens/ViewHostRatingScreen"
import SearchHostScreen from "../../../screens/SearchHostScreen"
import UbicationsScreen from "../../../screens/UbicationsScreen"
import SearchResultScreen from "../../../screens/SearchResultScreen"

const StackNavigation = createStackNavigator()
const AccountNav = () =>{
    return(
        <StackNavigation.Navigator>
            <StackNavigation.Screen 
                name="Account" 
                component={AccountOptions}
                options={{
                    /* header:() => <UserAccount />, */
                    headerTitle:"Perreando",
                    headerTitleAlign:"left"
                }}
            />
            <StackNavigation.Screen 
                name="AccountData"
                component={AccountDataScreen}
            />
            
            <StackNavigation.Screen 
                name="CreateHost"
                component={CreateHostScreen}
                /* component={} */
            />

            <StackNavigation.Screen 
                name="ViewHostData"
                component={ViewHostScreen}
                options={({navigation})=>({
                    headerLeft:()=><BackButton navigation={navigation} screen="Account"/>
                })}
            />

            <StackNavigation.Screen 
                name="UpdateHostData"
                component={UpdateHostDataScreen}
            />

            <StackNavigation.Screen 
                name="ViewHostGuest"
                component={ViewGuestScreen}
            />

            <StackNavigation.Screen 
                name="ViewHostRating"
                component={ViewHostRatingScreen}
            />

            <StackNavigation.Screen 
                name="SearchHost"
                component={SearchHostScreen}
            />

            <StackNavigation.Screen 
                name="UbicationSearch"
                component={UbicationsScreen}
            />

            <StackNavigation.Screen 
                name="SearchResult"
                component={SearchResultScreen}
            />

        </StackNavigation.Navigator>
    )
}

export default AccountNav;