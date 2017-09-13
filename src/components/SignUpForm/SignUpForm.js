import React, { Component } from 'react';
import { fbAuth, db } from '../../config/constants';
import './SignUpForm.css';

class SignUpForm extends Component {
  state = {
    username: '',
    renderedName: '',
    email: '',
    password: '',
    confirmPasswordInput: ''
  };
  componentDidMount() {
    console.log(fbAuth.currentUser);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    fbAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      }).then(() => {
        const user = fbAuth.currentUser;
        // Store basic user data
        db.ref(`users/${user.uid}`).set({
          username: this.state.username,
          renderedName: this.state.renderedName,
          uid: user.uid
        })
        // Add username to list of taken usernames
        db.ref(`usernames/`).push(this.state.username);
      })
  }
  render() {
    return (
      <div className="SignUpForm container">
        <div className="SignUpForm__logo-wrapper">
          <img src="http://i.imgur.com/kZDsecU.png" width="80" height="80" alt="" />
        </div>
        <h5 className="SignUpForm__create-account-text">Create a free account.</h5>
        <form className="SignUpForm__form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="SignUpForm__input form-control"
              placeholder="Username"
              onChange={(event) => this.setState({username: event.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="SignUpForm__input form-control"
              placeholder="Display Name"
              onChange={(event) => this.setState({renderedName: event.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="SignUpForm__input form-control"
              placeholder="Email"
              onChange={(event) => this.setState({email: event.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="SignUpForm__input form-control"
              placeholder="Password"
              onChange={(event) => this.setState({password: event.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="SignUpForm__input form-control"
              placeholder="Confirm Password"
              onChange={(event) => this.setState({confirmPasswordInput: event.target.value})}
            />
          </div>
          <button type="submit" className="SignUpForm__button btn">Sign Up</button>
        </form>
        <div className="SignUpForm__existing-account-text-wrapper">
          <p>Already have an account? Sign In</p>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
