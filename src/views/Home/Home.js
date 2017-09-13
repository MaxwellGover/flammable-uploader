import React, { Component } from 'react';
import Upload from './components/Upload/Upload';
import UploadsList from './components/UploadsList/UploadsList';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <nav className="Home__navbar navbar-light bg-faded">
          <a className="navbar-brand" href="#">
            <img src="http://i.imgur.com/kZDsecU.png" width="50" height="50" alt="" />
          </a>
          <span className="navbar-text" style={{color: '#fff'}}>
            {this.props.displayName}
          </span>
        </nav>
        <div className="Home">
          <div className="Home__left">
            <div className="Home__uploads-text-wrapper">
              <p className="Home__uploads-text">Uploads</p>
              <i className="Home__upload-icon material-icons">cloud_upload</i>
            </div>
            <UploadsList uid={this.props.uid} uploads={this.props.uploads}/>
          </div>
          <div className="Home__right">
            <Upload uid={this.props.uid}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
