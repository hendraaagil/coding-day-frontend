import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './auth/LoginPage';
import ProtectedPage from './ProtectedPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={ProtectedPage} />
      </Switch>
    </Router>
  );
}

export default App;
