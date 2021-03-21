import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Image } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'

import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import UserHome from './pages/UserHome'
import UserSettings from './pages/UserSettings'
import Register from './pages/Register'
import Login from './pages/Login'
import SinglePost from './pages/SinglePost'
import AddKey from './pages/AddKey'
import logoImg from './assets/logo.svg'

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/user' component={UserHome} />
        <Route exact path='/user/addkey' component={AddKey} />
        <Route exact path='/settings' component={UserSettings} />
        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/register' component={Register} />
        <Route exact path="/posts/:postId" component={SinglePost} />
      </Router>
      <Image className="img-footer" src={logoImg} />
    </AuthProvider>
  );
}

export default App;
