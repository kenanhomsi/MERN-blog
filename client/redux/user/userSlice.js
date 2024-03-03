import { createSlice } from '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    error:null,
    loading:null
}

const UserSlice =createSlice({
    name:'User',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading =true,
            state.error = null
        },
        signInSuccess:(state,action)=>{
            state.currentUser =action.payload,
            state.loading = false,
            state.error = null 
        },signInFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        updateStart:(state)=>{
            state.loading =true,
            state.error = null
        },
        updateSuccess:(state,action)=>{
            state.currentUser =action.payload,
            state.loading = false,
            state.error = null 
        },updateFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },deleteUserStart:(state)=>{
            state.loading=true,
            state.error=null
        },deleteUserSuccess:(state)=>{
            state.currentUser=null,
            state.loading=false,
            state.error=null
        },deleteUserFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },signOutSuccess:(state)=>{
            state.currentUser=null,
            state.loading=false,
            state.error=null
        }
    }
})

export const {signInStart,signInSuccess,signInFailure
    ,updateStart,updateSuccess,updateFailure
,deleteUserStart,deleteUserSuccess,deleteUserFailure
,signOutSuccess}= UserSlice.actions;

export default UserSlice.reducer ;