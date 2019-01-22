import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Button} from 'reactstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
import Moment from 'react-moment';
import {
  getUserList,
  getGroupList,
  getUserChatDetails,
  getGroupChatDetails
} from '../actions/ChatActions';

const ROOT_CSS =  css({
    height: '85vh'
});

class HomePage extends Component {

  constructor(props) {
        super(props);
        this.state = {
            currentView: '',
        };
    }

  componentWillMount() {
        this.props.getUserList(this.props.token)
        this.props.getGroupList(this.props.token)
  }

  onClickUser(user) {
    this.setState({currentView: 'user'})
    this.props.getUserChatDetails(user, this.props.token);
  }

  onClickGroup(group) {
    this.setState({currentView: 'group'})
    this.props.getGroupChatDetails(group, this.props.token);
  }

  renderActiveUser(user) {
    if(this.props.selectedUser.id === user.id) {
      return (
        <ListGroupItem style={styles.activeUserStyle}>
          {user.username}
        </ListGroupItem>
      )
    } else {
      return (
        <ListGroupItem style={styles.inActiveUserStyle}>
          {user.username}
        </ListGroupItem>
      )
    }
  }

  renderActiveGroup(group) {
    if(this.props.selectedGroup.id === group.id) {
      return (
        <ListGroupItem style={styles.activeUserStyle}>
          {group.name}
        </ListGroupItem>
      )
    } else {
      return (
        <ListGroupItem style={styles.inActiveUserStyle}>
          {group.name}
        </ListGroupItem>
      )
    }
  }

  renderUser() {
    return this.props.userList.map((user) => {
      return (
          <Link to="/Chat" onClick={this.onClickUser.bind(this, user)} key={user.id} style={{ textDecoration: 'none' }}>
              {this.renderActiveUser(user)}
          </Link>
      );
    });
  }

  renderGroup() {
    return this.props.groupList.map((group) => {
      return (
          <Link to="/Chat" onClick={this.onClickGroup.bind(this, group)} key={group.id} style={{ textDecoration: 'none' }}>
              {this.renderActiveGroup(group)}
          </Link>
      );
    });
  }

  renderUserList() {
    return (
      <div>
        <ListGroup>
          {this.renderUser()}
        </ListGroup>
      </div>
    )
  }

  renderGroupList() {
    return (
      <div>
        <ListGroup>
          {this.renderGroup()}
        </ListGroup>
      </div>
    )
  }

  renderMessage(message) {
    if(this.state.currentView === 'group'){
      return (
        <ListGroupItem style={styles.inActiveUserStyle}>
          {message.message}
          <span style={{float: 'right', fontSize: 10, paddingLeft: 10}}>
              {message.user.username}
          </span>
          <span style={{float: 'right', fontSize: 10}}>
              <Moment fromNow>
                {message.added_on}
              </Moment>
          </span>
        </ListGroupItem>
      )
    } else {
      return (
        <ListGroupItem style={styles.inActiveUserStyle}>
          {message.message}
          <span style={{float: 'right', fontSize: 10}}>
              <Moment fromNow>
                {message.added_on}
              </Moment>
          </span>
        </ListGroupItem>
      )
    }
  }

  renderChat() {
    if(this.state.currentView === 'user'){
      return this.props.currentDMList.map((message) => {
        if(this.props.user.user_id === message.from_user.id){
          return (
            <div className='row'>
              <div className="col-md-6" />
              <div className="col-md-6">
                <Link key={message.id} style={{ textDecoration: 'none' }}>
                    {this.renderMessage(message)}
                </Link>
              </div>
            </div>
          );
        } else {
          return (
            <div className='row'>
              <div className="col-md-5">
                <Link key={message.id} style={{ textDecoration: 'none' }}>
                    {this.renderMessage(message)}
                </Link>
              </div>
            </div>
          );
        }
      });
    } else {
      return this.props.currentGroupList.map((message) => {
        if(this.props.user.user_id === message.user.id){
          return (
            <div className='row'>
              <div className="col-md-6" />
              <div className="col-md-6">
                <Link key={message.id} style={{ textDecoration: 'none' }}>
                    {this.renderMessage(message)}
                </Link>
              </div>
            </div>
          );
        } else {
          return (
            <div className='row'>
              <div className="col-md-5">
                <Link key={message.id} style={{ textDecoration: 'none' }}>
                    {this.renderMessage(message)}
                </Link>
              </div>
            </div>
          );
        }
      });
    }
  }

  renderChatDetails() {
    return (
      <ListGroup>
        {this.renderChat()}
      </ListGroup>
    )
  }

  render() {
    return(
      <div style={{ overflowX: 'hidden', overflowY: 'hidden', height: '100vh' }}>
        <div className="row">
          <div className="col-md-2" style={{borderColor: 'gray', borderWidth: 5}}>
            <div style={{ overflowX: 'hidden', overflowY: 'scroll', height: '100vh', paddingTop: 5}}>
              <div>
                <div style={{ overflowX: 'hidden', overflowY: 'hidden', height: '50vh'}}>
                  <h1 style={styles.channelHeadStyle}>Channels</h1>
                  {this.renderGroupList()}
                </div>
                <div style={{ overflowX: 'hidden', overflowY: 'hidden', height: '50vh'}}>
                  <h1 style={styles.channelHeadStyle}>Direct Messages</h1>
                  {this.renderUserList()}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-10" style={{ overflowX: 'hidden', overflowY: 'hidden', height: '100vh', paddingTop: 30}}>
            <ScrollToBottom className={ROOT_CSS}>
              {this.renderChatDetails()}
            </ScrollToBottom>
            <div>
              <input
                type="text"
                placeholder="Type here..."
                style={styles.inputStyle}
                value={this.props.text}
                onChange={event => this.onInputChange(event.target.value)}
              />
              <Button style={styles.buttonStyle}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const styles = {
  channelHeadStyle: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 15
  },
  inActiveUserStyle: {
    color: '#000',
    margin: 10,
    padding: 10
  },
  activeUserStyle: {
    color: '#EB5323',
    margin: 10,
    padding: 10
  },
  inputStyle: {
        width: '90%',
        height: 40,
        paddingLeft: 20,
        borderRadius: 5,
        border: '1px solid gray'
    },
    buttonStyle: {
      marginLeft: 5,
      backgroundColor: '#EB5323',
      borderColor: '#EB5323'
    }
}

function mapStateToProps(state) {
    console.log('From Homepage map');
    console.log(state.auth.user);
    return {
        user: state.auth.user,
        token: state.auth.token,
        userList: state.chat.userList,
        groupList: state.chat.groupList,
        currentDMList: state.chat.currentDMList,
        currentGroupList: state.chat.currentGroupList,
        selectedUser: state.chat.selectedUser,
        selectedGroup: state.chat.selectedGroup
    };
}

export default connect(mapStateToProps, {
  getUserList,
  getGroupList,
  getUserChatDetails,
  getGroupChatDetails
})(HomePage);
