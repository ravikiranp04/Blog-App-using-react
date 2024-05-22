import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";
import axios from 'axios';

export const userLoginThunk=createAsyncThunk('user-Login',async(userCred,thunkApi)=>{
    let res;
    if(userCred.userType=='user'){
        res=await axios.post(`${process.env.BASE_URL}/user-api/login`,userCred)
    }
    if(userCred.userType=='author'){
        res=await axios.post(`${process.env.BASE_URL}/author-api/login`,userCred)

    }
    if(res.data.message=='Login success'){
        // Store Jwt token in Local or Session storge
        sessionStorage.setItem('token',res.data.token)
        return res.data;
    }
    else{
        return thunkApi.rejectWithValue(res.data.message)
    }
})


export const userLoginSlice=createSlice({
    name:'user-login-slice',
    initialState:{isPending:false,currentuser:{},errorStatus:false,errorMessage:"",loginStatus:false},
    reducers:{ // deals with changes in local state
        resetState:(state,payload)=>{
            state.isPending=false;
            state.currentuser={};
            state.errorStatus=false;
            state.errorMessage="";
            state.loginStatus=false
        }
    }, 
    extraReducers:builder=>builder  //extra reducers deals with changes in external state
    .addCase(userLoginThunk.pending,(state,action)=>{
        state.isPending=true
    })
    .addCase(userLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentuser=action.payload.user;
        state.errorStatus=false;
        state.errorMessage="";
        state.loginStatus=true
    })
    .addCase(userLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentuser={};
        state.errorStatus=true;
        state.errorMessage=action.payload;
        state.loginStatus=false
    })
})


//export root reducers
export default userLoginSlice.reducer;
//export action creator functions
export const {resetState}=userLoginSlice.actions;