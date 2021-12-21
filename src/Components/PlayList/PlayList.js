import React from 'react';
import './PlayList.css';
import { TrackList } from '../TrackList/TrackList';

export class PlayList extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    resetPlaylistName() {
        this.setState({ playlistName: ''})
    };

    render() {
        return (
            <div className="Playlist">
                <input placeholder={this.props.playlistName}
                    onChange={this.handleNameChange} 
                    onSave={this.resetPlaylistName}/>
                <TrackList tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true} />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}