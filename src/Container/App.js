import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { Route, Switch } from 'react-router';
import Chat from '../Component/Chat/Chat';
import Login from './Login/Login';
import { connect } from 'react-redux';
import Home from '../Component/Home/Home';

class App extends Component {
  componentDidUpdate(){
    if(this.props.err){
      alert(this.props.err);
      alert("Please reload if necessary");
    }
  }
  render() {
    return (
      <div className="App">
        {this.props.user
        ?
        <React.Fragment>
          <Header/>
            <div className="app_body">
              <Sidebar/>
              <Switch>
                <Route path="/rooms/:roomid">
                  <Chat />
                </Route>
                <Route path="/" exact>
                  <Home/>
                </Route>
              </Switch>
            </div>
        </React.Fragment>
        :
        <Login/>
      }        
      </div>
    );
  }
};

const mapStateToProps = (state)=>{
  return{
    user: state.auth.user,
    err: state.auth.err
  }
}

export default connect(mapStateToProps,null)(App);
