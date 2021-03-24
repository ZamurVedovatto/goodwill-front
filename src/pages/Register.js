import React, { useContext, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { AuthContext } from './../context/auth'
import { useForm } from './../util/hooks'

export default function Register(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register:userData } }) {
      console.log(userData)
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })

  function registerUser() {
    addUser()
  }

  return (
    <Segment className="login-wrapper">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="E-mail"
          placeholder="E-mail"
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Name"
          placeholder="Name"
          name="name"
          type="text"
          value={values.name}
          error={errors.name ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {
        Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {
                Object.values(errors).map(value => (
                  <li key={value}>
                    {value}
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
    </Segment>
  )
}

const REGISTER_USER = gql `
  mutation register(
    $username: String!
    $email: String!
    $name: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        name: $name
        password: $password
        confirmPassword: $confirmPassword
      }
    ){
      id
      email
      username
      name
      createdAt
      token
    }
  }
`