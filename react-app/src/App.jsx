// App.jsx

// import React from 'react';
// import PixiComponent from './components/PixiComponent';

// function App() {
//   return (
//     <div className="App">
//       <PixiComponent />
//     </div>
//   );
// }

// export default App;
// App.jsx

// {
//   "dependencies": {
//     "pixi.js": "^6.0.2"
//   }
// }


import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home'; // Import Home component
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home /> {/* Render Home component for the root route */}
          </Route>
          <Route path="/page1">
            <Page1 />
          </Route>
          <Route path="/page2">
            <Page2 />
          </Route>
          <Route path="/page3">
            <Page3 />
          </Route>
          <Route path="/page4">
            <Page4 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
