import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    isAuthenticated : false,
    darkToggle : false,
}

const authSlice= createSlice({
    name:"authentication",
    initialState:initialAuthState,
    reducers : {
        isLogin(state,action){
            state.isAuthenticated=true;
            localStorage.setItem('token',action.payload)
        },
        isLogout(state,action){
            state.isAuthenticated=false;
            localStorage.removeItem("token")
            localStorage.removeItem("email")
        },
        isToggle(state){
            state.darkToggle=true
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;

