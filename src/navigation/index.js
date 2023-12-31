import {} from "react"
import {Text} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import {useSelector} from "react-redux"
//navigation stack
import SingInStack from "./SignIn/SignIn"
import HomeStack from "./Home/Home"
import { SafeAreaView } from "react-native-safe-area-context"
import ProfileNav from "./ProfileNav"
import AccountNav from "./Home/AccountStack/AccountNav"

const Navigation = () =>{

    const {user,isLogged} = useSelector(state=> state.user)

    return (
        <NavigationContainer>
                {isLogged ? <HomeStack /> : <SingInStack/>}
        </NavigationContainer>
    )
}

export default Navigation;