import React, { useContext, useState } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from './../util/graphql'
import { AuthContext } from './../context/auth'
import { useForm } from './../util/hooks/useForm'
import { Link } from 'react-router-dom'

export default function Login(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login:userData } }) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception.errors)
    },
    variables: values
  })

  function loginUserCallback() {
    loginUser()
  }

  return (
    <Segment placeholder className="login-wrapper">
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
          <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
            <Form.Input
              label="Username"
              placeholder="Username"
              name="username"
              type="text"
              value={values.username}
              error={errors?.username ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              value={values.password}
              error={errors?.password ? true : false}
              onChange={onChange}
            />
            <Button type="submit" primary>
              Acessar
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

        </Grid.Column>
        <Grid.Column verticalAlign='middle'>
          <Button content='Criar conta' icon='signup' size='big' as={Link} to="/register" />
        </Grid.Column>
      </Grid>

      <Divider vertical>Ou</Divider>
    </Segment>
  )
}
