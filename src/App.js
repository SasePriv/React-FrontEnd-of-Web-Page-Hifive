import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import RecoverPass from './components/RecoverPass'
import RecoveringPassword from './components/RecoveringPassword'
import Mypersonalinfo from './components/Mypersonalinfo'
import ChatMenu from './components/ChatMenu'
import Chat from './components/Chat'
import Review from './components/Review'
import NewService from './components/NewService'
import VerServicio from './components/VerServicio'
import MyProfile from './components/MyProfile'
import NewEvent from './components/NewEvent'


function App() {

  return (
      <BrowserRouter>
        <Route exact path="/home" component={Home} />
        <Route exact path="/viewService/:id" component={VerServicio} />
        <Route exact path="/myprofile/:userID" component={MyProfile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/myprofile" component={MyProfile} />
      </BrowserRouter>      
  );
}

export default App;
