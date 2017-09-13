import React, { Component } from 'react';
import { storageRef, db } from '../../../../config/constants';
import { removeFileExtension } from '../../../../api';
import CircularProgressbar from 'react-circular-progressbar';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './Upload.css';

class Upload extends Component {
  componentDidMount() {
    Alert.success(`Upload successful`, {
      position: 'top-right',
      effect: 'slide',
      timeout: 3000
    })
  }
  state = {
    percentage: 0,
    uploading: false
  }
  handleUpload = (e) => {
    if (this.state.uploading) {
      return;
    }
    const file = e.target.files[0];
    const acceptedFormats = ["audio/wav", "audio/mp3", "audio/m4a"];
    const checkFileType = acceptedFormats.some((audioType) => {
      console.log(audioType);
      console.log(file.type);
      return audioType === file.type
    })

    if(!checkFileType) {
      return Alert.error(`Invalid file type`, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      });
    }

    this.setState({uploading: true})
    const audioRef = storageRef.child('audio/' + file.name);
    const task = audioRef.put(file);

    task.on('state_changed', function(snapshot){
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      this.setState(() => ({
        percentage: progress
      }))
    }.bind(this), function(error) {
      return `SHIT! There was an error! ${error}`
    }, function() {
      const downloadURL = task.snapshot.downloadURL;
      const fileName = task.snapshot.metadata.name;
      let songName = removeFileExtension(file.name);
      songName.replace(/\./g,' ');

      db.ref(`users/${this.props.uid}/uploadedSongs/`).push({
        downloadURL,
        fileName,
        songName,
      }).then(() => {
        this.setState({
          percentage: 0,
          uploading: false
        })
        Alert.success(`Upload successful`, {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })
      })
    }.bind(this));
  }
  render() {
    return (
      <div className="Upload">
        <CircularProgressbar
          percentage={Math.floor(this.state.percentage)}
          strokeWidth={10}
        />
        <label className={this.state.uploading ? "Upload__button-disabled btn" : "Upload__button btn"}>
          <span className="Upload__button-text">{this.state.uploading ? "Uploading" : "Upload a song"}</span>
          <input className="Upload__input" type="file" onChange={(e) => this.handleUpload(e)} disabled={this.state.uploading ? true : false}/>
        </label>
        <span style={{color: '#808080', fontSize: '12px'}}>Accepted formats: .wav, .mp3, .m4a</span>
      </div>
    );
  }
}

export default Upload;
