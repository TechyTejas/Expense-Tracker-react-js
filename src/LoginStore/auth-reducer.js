import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    isAuthenticated : false,
    ispremium : false,
    isDarkToggle : false
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
        ispremium(state , action){
            if(action.payload>10000){
                state.ispremium=true
            }else{
                state.ispremium=false
            }
        },
        isDarkToggle(state,action){
            state.isDarkToggle=!state.isDarkToggle
        }
    }

})

export const authActions=authSlice.actions;
export default authSlice.reducer;

