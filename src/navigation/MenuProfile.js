import { useSelector } from "react-redux";
import { PROFILE_TYPES } from "../tools/constant";
import Home from "./Home/Home";
import AccountNav from "./Home/AccountStack/AccountNav";


export default function MenuProfile(){

    const user = useSelector(state=>state.user.user)

    return <>
        {user.userProfile === PROFILE_TYPES.HUESPED ? <Home /> : <AccountNav />}
    </>
}