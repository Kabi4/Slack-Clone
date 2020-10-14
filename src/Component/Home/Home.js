import React from 'react';
import { connect } from 'react-redux';

import ReactLogo from '../../Assets/React.png';
import MyLogo from '../../Assets/My logo.jpg';

import './Home.css';
const Home = (props) => {
    return (
        <div className="home">
            <img src={MyLogo} alt="MyLogo" className="my__logo" /> 
            <h1>Hello, <strong>{props.user.name}</strong></h1>
            <p>Welcome To my community for now you can switch between channels,create new channels chat with peoples in the chat room.</p>
            <h2>Made By React</h2>
            <img src={ReactLogo} alt="react" className="react__logo" /> 
        </div>
    )
};

const mapStateToProps = (state)=>{
    return{
      user: state.auth.user
    }
}

export default connect(mapStateToProps,null)(Home);
