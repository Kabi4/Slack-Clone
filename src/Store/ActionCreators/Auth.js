import { auth, provider } from '../../Firebase/Firebase';
import * as actionTypes from '../actionTypes';

const loginSuccess = (name,photoUrl)=>{
    return{
        type: actionTypes.LOGINSUCCESS,
        payload: {
            name,
            photoUrl
        }
    }
};

const loginFailed = (err)=>{
    return{
        type: actionTypes.LOGINSUCCESS,
        paylaod: {
            err
        }
    }
}

export const loginWithGoogle = ()=>{
    return dispatch=>{
        auth.signInWithPopup(provider)
        .then(res=>{
            dispatch(loginSuccess(res.user.displayName,res.user.photoURL));
        })
        .catch(err=>{
            loginFailed(err.message);
        })
    }
}