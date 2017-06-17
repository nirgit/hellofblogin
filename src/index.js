import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCste3mvUpoT2o00MIIcHN3nurBEVmKlIA",
    authDomain: "hello-login.firebaseapp.com",
    databaseURL: "https://hello-login.firebaseio.com",
    projectId: "hello-login",
    storageBucket: "hello-login.appspot.com",
    messagingSenderId: "168190173782"
  };

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
