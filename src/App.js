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
import Pruebas from './components/Pruebas'


function App() {

  return (
      <BrowserRouter>                
        <Route exact path="/viewService/:id" component={VerServicio} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/mypersonalinfo" component={Mypersonalinfo} />
        <Route exact path="/myprofile" component={MyProfile} />
        <Route exact path="/newservice" component={NewService} />
        <Route exact path="/editservice/:id" component={NewService} />
        <Route exact path="/recoveringpassword" component={RecoverPass} />
        <Route exact path="/chat-menu" component={ChatMenu} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/" component={Home} />
      </BrowserRouter>      
      // <NewService></NewService>
      // <Mypersonalinfo/>
  );
}

export default App;
