import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

class App extends Component {

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.incCount = this.incCount.bind(this);
    this.authHandler = this.authHandler.bind(this);

    this.state = {
      user: null,
      count: 0
    };
  }

  componentWillMount() {
    this.database = firebase.database();
  }

  componentDidMount() {
    console.log('loaded');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler(user);
      }
    });
  }

  toggleLogin() {
    if (!this.state.user) {
      this.login();
    } else {
      this.logout();
    }
  }

  logout() {
    const self = this;
    firebase.auth().signOut().then(function() {
      self.setState({user: null});
    }).catch(function(error) {
      console.error('failed signing out :(');
    });
  }

  login() {
    firebase.auth().signInWithPopup(provider).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  authHandler(user) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      // var user = result.user;
      console.log(user);
      // const self = this;

      this.database.ref('counters/' + user.uid + '/count').once('value').then((snapshot) => {
        var userCounter = snapshot.val();
        console.log('userCounter', userCounter);
        this.setState({
          user: user,
          count: userCounter || 0
        });
      });
      // ...
    }

  incCount() {
    this.database.ref('counters/' + this.state.user.uid).set({count: this.state.count + 1}).then(() => {
      this.setState({
        count: this.state.count + 1
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <div>
            <h3>Login with your Google Account</h3>
            <button onClick={this.toggleLogin}>{this.state.user === null ? 'Login' : 'Logout'}</button>
            <div>
              Logged in user is: {this.state.user ? this.state.user.email : 'No user logged in'}
            </div>
            <div>
              {this.state.count} <button disabled={!this.state.user} onClick={this.incCount}>+1</button>
            </div>
          </div>
        </p>
      </div>
    );
  }
}

export default App;
