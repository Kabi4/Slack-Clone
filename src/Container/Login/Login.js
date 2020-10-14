import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import logo from './../../Assets/Logo/Logo.jpg';
import './Login.css';

import * as actionCreators from '../../Store/ActionCreators/index';
import {connect} from 'react-redux';

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login__container">
                    <img src={logo} alt="loginLogo" />
                    <h1>Welcome to D3ViLKSK's Community</h1>
                    <p>github.com/Kabi4</p>
                    <Button onClick={(e)=>{e.preventDefault();this.props.logIn();}} >Sign In With Google</Button>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch)=>{
    return{
        logIn: ()=>{dispatch(actionCreators.loginWithGoogle())} 
    }
}

export default connect(null,mapDispatchToProps)(Login);
