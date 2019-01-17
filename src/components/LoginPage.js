import React, { Component } from "react";
import { connect } from 'react-redux';
import '../App.css';
import { Button, Card } from 'reactstrap';
import { onUsernameChange, onPasswordChange, userLogin } from '../actions/AuthActions';
import "./Login.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  onUnameChange(value) {
        this.props.onUsernameChange(value);
    }

  onPassChange(value) {
      this.props.onPasswordChange(value);
  }

  loginButtonPress() {
      const { username, password } = this.props;
      this.props.userLogin(username, password);
  }

  // validateForm() {
  //   return this.state.email.length > 0 && this.state.password.length > 0;
  // }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }
  //
  // handleSubmit = event => {
  //   event.preventDefault();
  // }

  render() {
    return (
      <div className="App" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', margin: 10 }}>
          <h1 style={{color: '#EB5323', fontFamily: 'Source Sans Pro'}}>
            MadChat
          </h1>
        </div>
        <div className="row" style={{ height: 400, width: '100%' }}>
          <Card style={styles.cardStyle}>
            <div style={{ paddingTop: 30 }}>
                <input
                    type="text"
                    placeholder="Username"
                    style={styles.inputStyle}
                    value={this.props.email}
                    onChange={event => this.onUnameChange(event.target.value)}
                />
            </div>
            <div style={{ paddingTop: 30 }}>
                <input
                    type="password"
                    placeholder="Password"
                    style={styles.inputStyle}
                    value={this.props.password}
                    onKeyDown={this.keyPress}
                    onChange={event => this.onPassChange(event.target.value)}
                />
            </div>
            <div style={{ paddingTop: 30 }}>
              <Button style={styles.loginButtonStyle} onClick={() => { this.loginButtonPress(); }}>
                  Login
              </Button>
              <Button style={styles.loginButtonStyle} onClick={() => { this.loginButtonPress(); }}>
                  Register
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

const styles = {
    inputStyle: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        width: 280,
        height: 40,
        paddingLeft: 20,
        paddingRight: 5,
    },
    cardStyle: {
        alignItems: 'center',
        padding: 30,
        width: '30%',
        margin: 'auto',
        boxShadow: `0px 1px 15px 5px rgba(0,0,0,0.05)`,
        borderRadius: 10
    },
    loginButtonStyle: {
        backgroundColor: '#EB5323',
        borderRadius: 2,
        borderColor: '#EB5323',
        marginRight: 10
    },
    logoStyle: {
      color: '#EB5323',
      fontFamily: 'Source Sans Pro'
    }
};

function mapStateToProps(state) {
    return {
        username: state.auth.username,
        password: state.auth.password
    };
}

export default connect(mapStateToProps, {
  onUsernameChange,
  onPasswordChange,
  userLogin
})(LoginPage);
