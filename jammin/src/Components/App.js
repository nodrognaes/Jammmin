import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <h1>Ja<span class="highlight">mmm</span>in</h1>
      <div class="App">
        <SearchBar />
        <div class="App-playlist">
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
