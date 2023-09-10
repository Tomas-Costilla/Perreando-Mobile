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
        updateImageUser(state,action){
            state.user.userFileUri = action.payload
        },
        default:(state)=>{
            return state
        }
    }
})

export const {signIn,signUp,updateImageUser} = userSlice.actions
export default userSlice.reducer;