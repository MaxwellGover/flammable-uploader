import React, { Component } from 'react';
import { fbAuth, db } from '../../config/constants';
import './LoginForm.css';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fbAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }).then(() => this.props.history.push('/home'));
  }
  render() {
    console.log(this);
    return (
      <div className="LoginForm container">
        <div className="LoginForm__logo-wrapper">

        </div>
        <h5 className="LoginForm__create-account-text">Create a free account.</h5>
        <form className="LoginForm__form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="LoginForm__input form-control"
              placeholder="Email"
              onChange={(event) => this.setState({email: event.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="LoginForm__input form-control"
              placeholder="Password"
              onChange={(event) => this.setState({password: event.target.value})}
            />
          </div>
          <button type="submit" className="LoginForm__button btn btn-primary btn-lg">Sign Up</button>
        </form>
        <div className="LoginForm__existing-account-text-wrapper">
          <p>Already have an account? Sign In</p>
        </div>
      </div>
    );
  }
}

export default LoginForm;
