import * as actionTypes from './../actionTypes';

const initialState = {
    user: null,
    err: null
}

const authreducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.LOGINSUCCESS:
            return{
                ...state,
                user: {
                    ...action.payload
                }
            }
        case actionTypes.LOGINFAILED:
            return{
                ...state,
                err: action.payload.err
            }
        default: 
            return state
    }
};

export default authreducer;
