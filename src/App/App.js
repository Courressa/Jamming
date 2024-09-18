import logo from '../logo.svg';
import './App.css';
import { SearchResults } from '../SearchResults/SearchResults';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jammming</h1>
      </header>
      <main>
        <SearchResults />
      </main>
    </div>
  );
}

export default App;
