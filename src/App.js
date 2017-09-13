import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import Loader from 'halogen/PulseLoader';
import { SignUpForm } from './components';
import { LoginForm } from './components';
import { Home } from './views';
import { fbAuth, db } from './config/constants';
import './App.css';

class App extends Component {
  state = {
    uid: null,
    displayName: '',
    uploads: null
  };
  componentDidMount() {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid: user.uid});
        const uploadsRef = db.ref(`users/${this.state.uid}/uploadedSongs/`);

        db.ref(`/users/${this.state.uid}/displayName`).once('value', snapshot => {
          this.setState({displayName: snapshot.val()})
        })
        uploadsRef.on('value', snapshot => {
          const data = snapshot.val();

          if (!data) {
            this.setState({uploads: []})
            return;
          }
          const list = Object.keys(data).map((key) => {
            console.log(data);
            return {
              songName: data[key].songName,
              downloadURL: data[key].downloadURL
            }
          });
          this.setState({uploads: list});
          this.props.history.push('/home');
        })
      } else {
        this.props.history.push('/login');
      }
    });
  }
  render() {
    console.log(this.state.uid);
    if (this.state.uid && this.state.uploads) {
      return (
        <Router>
          <div className="App">
            <Route path="/register" component={SignUpForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/home" render={(props) => (
              <Home
                uid={this.state.uid}
                uploads={this.state.uploads}
                displayName={this.state.displayName}
                {...this.props} />
            )} />
          </div>
        </Router>
      );
    } else {
        return (
          <div className="App__loading-spinner">
            <Loader color="#FF1439" size="20px" margin="4px"/>
          </div>
        );
    }
  }
}

export default withRouter(App);
