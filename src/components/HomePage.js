import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Card,
  Button } from 'reactstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  getUserList,
  getGroupList,
  getUserChatDetails,
  getGroupChatDetails
} from '../actions/ChatActions';


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
    return (
      <ListGroupItem style={styles.activeUserStyle}>
        {user.username}
      </ListGroupItem>
    )
  }

  renderActiveGroup(group) {
    return (
      <ListGroupItem style={styles.activeUserStyle}>
        {group.name}
      </ListGroupItem>
    )
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
    return (
      <ListGroupItem style={styles.activeUserStyle}>
        {message.message}
      </ListGroupItem>
    )
  }

  renderChat() {
    if(this.currentView === 'user'){
      return this.props.currentDMList.map((message) => {
        return (
            <Link key={message.id} style={{ textDecoration: 'none' }}>
                {this.renderMessage(message)}
            </Link>
        );
      });
    } else {
      return this.props.currentGroupList.map((message) => {
        return (
            <Link key={message.id} style={{ textDecoration: 'none' }}>
                {this.renderMessage(message)}
            </Link>
        );
      });
    }
  }

  renderChatDetails() {
    return (
      <div>
        <ListGroup>
          {this.renderChat()}
        </ListGroup>
      </div>
    )
  }

  render() {
    return(
      <div style={{ overflowX: 'hidden', overflowY: 'hidden', height: '100vh' }}>
        <div className="row">
          <div className="col-xs-4 col-md-2" style={{borderColor: 'gray', borderWidth: 5}}>
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
          <div className="col-xs-8 col-md-10">
              <div style={{ padding: 40, overflowX: 'hidden', overflowY: 'scroll', height: '100vh' }}>
                {this.renderChatDetails()}
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
  activeUserStyle: {
    color: '#000',
    margin: 10,
    padding: 10
  }
}

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userList: state.chat.userList,
        groupList: state.chat.groupList,
        currentDMList: state.chat.currentDMList,
        currentGroupList: state.chat.currentGroupList
    };
}

export default connect(mapStateToProps, {
  getUserList,
  getGroupList,
  getUserChatDetails,
  getGroupChatDetails
})(HomePage);
