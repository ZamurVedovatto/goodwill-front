import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
  user: null,
  keys: []
}

if(localStorage.getItem('jwtToken')) {
  const token = localStorage.getItem('jwtToken')
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = decodedToken
    console.log(initialState.user)
  }
}

const AuthContext = createContext({
  user: null,
  keys: [],
  login: (userData) => {},
  logout: () => {}
})

function authReducer(state, action) {
  console.log(action.payload)
  switch (action.type) {
    
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        keys: action.payload.keys
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        keys: []
      }
    case 'SET_KEYS':
      return {
        ...state,
        keys: action.payload
      }
    default:
      return state
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  function login(userData) {
    const data = userData
    console.log(data)
    localStorage.setItem('jwtToken', data.user.token)
    dispatch({
      type: 'LOGIN',
      payload: data
    })
  }

  function logout() {
    localStorage.removeItem('jwtToken')
    dispatch({
      type: 'LOGOUT'
    })
  }

  function setKeys(data) {
    dispatch({
      type: 'SET_KEYS',
      payload: data
    })
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, keys: state.keys, login, logout, setKeys }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }