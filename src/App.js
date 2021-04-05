import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import logoImg from './assets/logo.svg'

import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'

import UserHome from './pages/UserHome'
import UserSettings from './pages/UserSettings'
import Register from './pages/Register'
import Login from './pages/Login'
import SingleMessage from './pages/SingleMessage'
import CompanyProfile from './pages/CompanyProfile';
import MenuBar from './components/MenuBar'
import MessageHome from './components/Message/MessageHome';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Route exact path={["/", "/messages", "/home"]} component={MessageHome} />
        <Route path='/company' component={CompanyProfile} />
        <Route path='/user' component={UserHome} />
        <Route path='/settings' component={UserSettings} />
        <AuthRoute path='/login' component={Login} />
        <AuthRoute path='/register' component={Register} />
        <Route exact path="/messages/:messageId" component={SingleMessage} />
      </Router>
      <Image className="img-footer" src={logoImg} />
    </AuthProvider>
  );
}

export default App;

