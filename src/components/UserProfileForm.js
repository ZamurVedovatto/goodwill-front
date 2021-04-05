import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const UserProfileForm = ({user}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [])

  return (
    <Form loading={loading}>
      <Form.Field>
        <label>Username</label>
        <input placeholder={user.username} />
      </Form.Field>
      <Form.Field>
        <label>Nome</label>
        <input placeholder={user.name ? user.name : 'Nome'} />
      </Form.Field>
      <Form.Field>
        <Checkbox label='Eu concordo com os Termos e Condições' />
      </Form.Field>
      <Button type='submit'>Salvar</Button>
    </Form>
  )
}


export default UserProfileForm