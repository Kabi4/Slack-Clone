import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar/Avatar';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import SearchIcon from '@material-ui/icons/Search';

import './Header.css';
import { connect } from 'react-redux';
class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header__left">
                    <Avatar src={this.props.user.photoUrl} alt="Avatar" >{this.props.user.name.trim()[0]}</Avatar>
                    <QueryBuilderIcon/>
                </div>
                <div className="header__center">
                    <SearchIcon/>
                    <input placeholder="Search in D3ViLKSK Community" />
                </div>
                <div className="header__right">
                    <HelpOutlineIcon/>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state)=>{
    return{
      user: state.auth.user
    }
}

export default connect(mapStateToProps,null)(Header);
