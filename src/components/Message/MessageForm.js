import React, { useContext, useState, useEffect } from 'react'
import { Button, Form, Container, Segment, Radio } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client'
import { useForm } from './../../util/hooks'
import { FETCH_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION, FETCH_KEYS_QUERY } from './../../util/graphql'
import SearchComponent from './SearchComponent'
import { AuthContext } from './../../context/auth'
import keyTypes from './../../util/consts/keyTypes';

export default function MessageForm({refetch}) {
  const { keys: userKeys } = useContext(AuthContext)
  const { loading, data: { getKeys: keys } = {}} = useQuery(FETCH_KEYS_QUERY)
  const [broadcast, setBroadcast] = useState(false)
  const [userKeysOptions, setUserKeysOptions] = useState([])

  useEffect(() => {
    let newArr = []
    userKeys.forEach(userKey => {
      let newKey = {
        key: userKey.id,
        text: userKey.title,
        value: userKey.title,
      }
      newArr.push(newKey)
    })
    setUserKeysOptions(newArr);

  }, [keys])

  const { values, onChange, onSubmit } = useForm(createMessageCallback, {
    modality: 'single',
    targetKey: '',
    body: '',
    senderKey: '',
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
      values.targetKey = '';
      values.body = "";
      values.sendertKey = '';
    },
    onError(err) {
      return err;
    },
  });

  function createMessageCallback() {
    console.log(values)
    createMessage()
    refetch()
  }

  const onSetSelection = (e) => {
    console.log(e)
    let event = {
      target: {
        name: "senderKey",
        value: e.target.textContent
      }
    }
    onChange(event)
  }

  return (
    <Container className="container-wrapper">
        <Form> 
          <Form.Field>
            Modalidade: <b>{broadcast ? 'Broadcast' : 'Direta'}</b>
          </Form.Field>
          <Form.Field>
            <Radio
              label='Direta'
              name='radioGroup'
              value="true"
              checked={!broadcast}
              onChange={() => setBroadcast(false)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Broadcast'
              name='radioGroup'
              value="false"
              checked={broadcast}
              onChange={() => setBroadcast(true)}
            />
          </Form.Field>
        </Form>

        {
          broadcast ? (
            <Form onSubmit={onSubmit}>
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
          ) : (
            <Segment>
              <Form onSubmit={onSubmit}>
                <Form.Field>
                  <Form.Select
                    fluid
                    label='Escolher sua Chave'
                    name="senderKey"
                    options={userKeysOptions}
                    onChange={(e) => onSetSelection(e)}
                    value={values.senderKey}
                    error={error ? true : false}
                    placeholder='Chave'
                  />
                </Form.Field>
                {
                  (!loading && keys) ? (
                    <Form.Field>
                      <label>Buscar Chave</label>
                      <SearchComponent setTargetKey={onChange} keys={keys} />
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
            </Segment>
          )
        }


        { error && (
          <div className="ui error message" style={{ marginBottom: "2rem" }}>
            <ul className="list">
              <li>{error?.graphQLErrors[0]?.message}</li>
            </ul>
          </div>
        )}

      {/* <pre>{JSON.stringify(keys, null, 2)}</pre> */}
    </Container>
  )
}