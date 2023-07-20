import {} from "react"
import { PROFILE_TYPES } from "../tools/constant"
import AccountNav from "./Home/AccountStack/AccountNav"
import HomeNav from "./Home/Home"

export default function ProfileNav({userProfile}){
    return <>
        {userProfile === PROFILE_TYPES.HUESPED
        ? <HomeNav />
        : <AccountNav />
        }
    </>
}