import React, { Component } from 'react';
import './Sidebar.css';

import FiberManulRecord from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';

import InsertCommnetIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import SidebarOption from '../../Component/SidebarOption/SidebarOption';
import db from '../../Firebase/Firebase';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

class Sidebar extends Component {
    state = {
        channels: []
    }

    componentDidMount(){
        db.collection("rooms").onSnapshot(snapshot=>{
            this.setState({channels: snapshot.docs.map(ele=> ({id: ele.id,channelName: ele.data().name}))})
        })
    }

    onClickhandler=()=>{
        const name = prompt("Enter Channel Name");
        if(name){
            db.collection("rooms").add({
                name
            })
        }
    };

    onChannelClickHandler = (id) =>{
        this.props.history.push(`/rooms/${id}`);
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar__header">
                    <div className="sidebar__info">
                        <h2>D3ViLKSK Community</h2>
                        <h3>
                            <FiberManulRecord fontSize="large" />
                            {this.props.user.name}
                        </h3>
                    </div>
                    <CreateIcon/>
                </div>
                <SidebarOption Icon={InsertCommnetIcon} title="Threads" />
                <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
                <SidebarOption Icon={DraftsIcon} title="Saved Items" />
                <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
                <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
                <SidebarOption Icon={AppsIcon} title="Apps" />
                <SidebarOption Icon={FileCopyIcon} title="File browser" />
                <SidebarOption Icon={ExpandLessIcon} title="Show less" />
                <br/>
                <hr/>
                <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
                <hr/>
                <SidebarOption Icon={AddIcon} onClick={this.onClickhandler} title="Add Channel" />
                {this.state.channels.map(ele=><SidebarOption onClick={()=>{this.onChannelClickHandler(ele.id)}}  key={ele.id} title={ele.channelName} />)}
            </div>
        )
    }
};

const mapStateToProps = (state)=>{
    return{
      user: state.auth.user
    }
}

export default withRouter(connect(mapStateToProps,null)(Sidebar));