import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
class App extends React.Component {
  constructor(props){
    super(props);
  this.state = {
  searchResults: [], 
  playlistName: 'New Playlist Name',  
  playlistTracks: []
};
this.addTrack=this.addTrack.bind(this);
this.removeTrack=this.removeTrack.bind(this);
this.updatePlaylistName=this.updatePlaylistName.bind(this);
this.savePlaylist=this.savePlaylist.bind(this);
this.search=this.search.bind(this);
}

addTrack (track) {
let trackIndex = this.state.playlistTracks.findIndex(trackSaved=>trackSaved.id === track.id); 
 console.log(trackIndex) 
 if(trackIndex === -1) {
    
    let addTrack = this.state.playlistTracks.slice();
    addTrack.push(track);
  
    this.setState({playlistTracks: addTrack});
    console.log(this.state.playlistTracks)
  };
};

removeTrack(track) {
  let newState = this.state.playlistTracks.slice()
  let removeTrack = newState.filter(trackSaved => trackSaved.id !== Number(track.id));
  this.setState({playlistTracks: removeTrack});
}
updatePlaylistName(name){
  let oldPlaylistName = this.state.playlistName;
  this.setState({playlistName: name});
}

savePlaylist () {
  let trackURIs = []
  this.state.playlistTracks.map(element => {
    trackURIs.push(element.uri);
  });
  console.log(trackURIs);
  Spotify.savePlaylist(this.state.playlistName, trackURIs);
  this.setState({playlistTracks:[], playlistName: 'New Playlist', searchResults:[]})
};

search(term){
  Spotify.search(term).then(results => {
    this.setState({searchResults: results})
    console.log(this.state.searchResults)
})
}


  render () {
    return ( <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} 
          playlistTracks={this.state.playlistTracks} 
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
          />
          </div>
        </div>
      </div>
    )
  }
};
export default App;

