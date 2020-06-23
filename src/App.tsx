import React from 'react';
import { Route } from 'react-router-dom';
import { fire } from './lib/firebase'

import UserPage from './pages/UserPage';
import AttendPage from './pages/AttendPage';

const App: React.FC = () => {
  fire();
  return (
    <div>
      <Route exact component={UserPage} path='/'></Route>
      <Route exact component={UserPage} path='/user'></Route>
      <Route exact component={AttendPage} path='/attend'></Route>
    </div>
  );
}

export default App;
