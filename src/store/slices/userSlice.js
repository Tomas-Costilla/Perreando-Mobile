import {createSlice} from "@reduxjs/toolkit"

const initialState = { /* Datos de ejemplo */
    user:{},
    isLogged:false
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signIn(state,action){
            state.user = action.payload.user
            state.isLogged = true
        },
        signUp(state,action){
            state.user = {}
            state.isLogged = false
        },
        default:(state)=>{
            return state
        }
    }
})

export const {signIn,signUp} = userSlice.actions
export default userSlice.reducer;