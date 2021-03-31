import React, { useContext } from 'react'
import { Button, Form, Container, Segment } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client'
import { useForm } from './../../util/hooks'
import { FETCH_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION, FETCH_KEYS_QUERY } from './../../util/graphql'
import SearchComponent from './../Message/SearchComponent'
import { AuthContext } from './../../context/auth'
import keyTypes from './../../util/consts/keyTypes';

export default function MessageForm() {
  const { user } = useContext(AuthContext)
  const { loading, data: { getKeys: keys } = {}} = useQuery(FETCH_KEYS_QUERY)


  const { values, onChange, onSubmit } = useForm(createMessageCallback, {
    body: ''
  })
  
  const [createMessage, { error }] = useMutation(CREATE_MESSAGE_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_MESSAGES_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_MESSAGES_QUERY,
        data: {
          getMessages: [result.data.createMessage, ...data.getMessages],
        },
      });
      values.body = "";
    },
    onError(err) {
      return err;
    },
  });
  function createMessageCallback() {
    createMessage()
  }

  return (
    <Container className="container-wrapper">
      <Segment style={{ maxWidth: "420px" }}>
        <Form onSubmit={onSubmit}> 
          <h2>Send message</h2>
          <Form.Field>
            <Form.Select
              fluid
              label='Tipo'
              name="type"
              options={keyTypes}
              onChange={onChange}
              value={values.type}
              error={error ? true : false}
              placeholder='Tipo'
            />
          </Form.Field>
          {
            (!loading && keys) ? (
              <Form.Field>
                <label>Buscar Chave</label>
                <SearchComponent keys={keys} />
              </Form.Field>
            ) : (
              <span>loading</span>
            )
          }

          <Form.Field>
            <Form.TextArea
              label="Mensagem"
              placeholder="Escreva aqui sua mensagem"
              name="body"
              onChange={onChange}
              value={values.body}
              error={error ? true : false}
            />
          </Form.Field>
          <Form.Field>
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Form.Field>
        </Form>
        { error && (
          <div className="ui error message" style={{ marginBottom: "2rem" }}>
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </Segment>
      {/* <pre>{JSON.stringify(keys, null, 2)}</pre> */}
    </Container>
  )
}