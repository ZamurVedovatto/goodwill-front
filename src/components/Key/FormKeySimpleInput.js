import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

export default function FormKeySimpleInput({ values, onChange, error, createKeyCallback }) {
  return (
    <Form onSubmit={createKeyCallback}>
      <Form.Input
        label='Valor'
        placeholder={(values.type === 'plate') ? "JMI7489" : "123456"}
        name="title"
        onChange={onChange}
        value={values.title}
        error={error ? true : false}
      />
      <Form.Field>
        <Checkbox label='Eu concordo com os Termos e Condições' />
      </Form.Field>
      <Form.Field>
        <Button type="submit" color="teal">
          Adicionar
        </Button>
      </Form.Field>
      <Form.Field>
        { error && (
          // <pre>{JSON.stringify(error, null, 2)}</pre>
          <div className="ui error message" style={{ marginBottom: "2rem" }}>
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </Form.Field>
    </Form>
  )
}
