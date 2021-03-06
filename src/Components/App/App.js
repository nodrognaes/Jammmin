import React from 'react';
import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../PlayList/PlayList';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: [],
      playlistName:  'Enter playlist name...',
      playlistTracks: [] 
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack =>
      savedTrack.id === track.id)) {
      return;
    }
    
    tracks.push(track);
    this.setState({ playlistTracks: tracks })
  };

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks })
  }
 
  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    if (this.state.playlistName !== 'Enter playlist name...'){
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'Enter playlist name...',
          playlistTracks: []
        })
      })
      alert(`Playlist "${this.state.playlistName}" has been saved to your Spotify account!`)
      document.getElementById('plName').value = '';
    } else {
      alert('Please name your playlist!')
    }
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  render() {
    return (
      <div>
        <h1>&#9836;Ja<span className="highlight">mmm</span>in</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
              onAdd={this.addTrack}/>
            <PlayList playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist} />
            <a href="https://open.spotify.com/" target="_blank"><button className="open">OPEN SPOTIFY</button></a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;