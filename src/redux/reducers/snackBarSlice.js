import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open:false ,
    message : "" ,
    severity : "success" ,
};

export const snackBarSlice = createSlice({
    name : "snackBar" ,
    initialState ,
    reducers : {
        opensnackBar : (state , action) => {
            state.open = true ;
            state.message = action.payload.message;
            state.severity = action.payload.serverity;
        },
        closesnackBar: (state,action) => {
            state.open = false ;
        }
    }
})


export const {opensnackBar,closesnackBar} = snackBarSlice.actions ;
export default snackBarSlice.reducer ;