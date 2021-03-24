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
import CompanyProfile from './pages/CompanyProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Route exact path='/company' component={CompanyProfile} />
        <Route exact path='/' component={Home} />
        <AuthRoute exact path='/user' component={UserHome} />
        <AuthRoute exact path='/user/addkey' component={AddKey} />
        <AuthRoute exact path='/settings' component={UserSettings} />
        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/register' component={Register} />
        <AuthRoute exact path="/posts/:postId" component={SinglePost} />
      </Router>
      <Image className="img-footer" src={logoImg} />
    </AuthProvider>
  );
}

export default App;
