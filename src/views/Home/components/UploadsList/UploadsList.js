import React, { Component } from 'react';
import { db, storageRef } from '../../../../config/constants';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './UploadsList.css';
// TODO: Figure out issue w/ modal.

class UploadsList extends Component {
  state = {
    key: '',
  }
  getSongKey = (key) => {
    this.setState({key: key})
  }
  handleDeleteSong = (key) => {
    db.ref(`/users/${this.props.uid}/uploadedSongs/`).once('value', snapshot => {
      console.log(snapshot.val());
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log('childKey ->', childKey);
        console.log('childData ->', childData);
        if (childData.downloadURL === this.state.key) {
          const songDbRef = db.ref(`/users/${this.props.uid}/uploadedSongs/${childKey}`);
          db.ref(`/users/${this.props.uid}/uploadedSongs/${childKey}`).once('value', snapshot => {
            const fileName = snapshot.val().fileName;
            const songStorageRef = storageRef.child('audio/' + fileName);
            songStorageRef.delete().then(() => {
              // File deleted successfully
              console.log('File deleted successfully')
              // TODO: CLOSE MODAL & Show toast notification
              Alert.success(`${childData.songName} was deleted successfully`, {
                position: 'top-right',
                effect: 'slide',
                timeout: 3000
              })
            }).catch((error) => {
              // Uh-oh, an error occurred!
              console.log(`FUCK! An error! ${error}`)
            });
          })
          songDbRef.remove();
        } else {
          console.log('Error message here');
        }
      })
    });
  }
  render() {
    if (this.props.uploads.length === 0) {
      return (
        <div className="UploadsList__alert alert alert-warning" role="alert">
          Looks like you haven't uploaded any songs yet. Click the <strong style={{color: '#FF1439'}}>Upload a song</strong> button to get started.
        </div>
      );
    }
    return (
      <ul className="UploadsList__uploads-list list-group">
        {this.props.uploads.map((item) => {
          return (
            <li className="UploadsList__list-item list-group-item" key={item.downloadURL}>
              {item.songName}
              <i
                className="UploadsList__delete-icon material-icons"
                data-toggle="modal"
                data-target=".UploadsList__modal"
                onClick={() => this.getSongKey(item.downloadURL)}
              >
                delete
              </i>
            </li>
          );
        })}
        <div className="UploadsList__modal modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete song?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this song?
              </div>
              <div className="modal-footer">
                <button type="button" className="UploadsList__modal-button btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="UploadsList__modal-button btn btn-danger" onClick={this.handleDeleteSong}>Delete</button>
              </div>
            </div>
          </div>
        </div>
        <Alert />
      </ul>
    );
  }
}

export default UploadsList;
