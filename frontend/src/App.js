import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  

  return (
      <Router>
        <div className="App">
            <Route exact path="/" component={Home} />
        </div>
      </Router>
  );
}

export default App;
