import React from 'react'
import { Button, Grid, Card, Image, Loader } from 'semantic-ui-react'
import DeleteButton from './Key/DeleteButton'
import { useMutation } from '@apollo/client'
import { TOGGLE_ACTIVE_KEY_MUTATION } from './../util/graphql'

const KeyList = ({ keys, user, refetch }) => {

  const [onToggleActive, { error, loading }] = useMutation(TOGGLE_ACTIVE_KEY_MUTATION, {
    onError(err) {
      console.log(err)
      return err;
    },
  })

  const onSetTitle = (type) => {
    switch (type) {
      case 'generic':
        return 'Genérica'
      case 'plate':
        return 'Placa de Veículo'
      case 'address':
        return 'Endereço'
      case 'schoolId':
        return 'Número de Matrícula'
      default:
        return 'Genérica'
    }
  }

  return (
    <Grid stackable columns={4} padded stretched>
      <Grid.Row stretched>
      {
        (keys?.length === 0) ? (
          <Card.Content style={{ padding: "1rem 2rem" }}>
            <span>Nenhuma chave registrada.</span>
          </Card.Content>
        ) : (
          keys?.map(userKey => (
            <Grid.Column key={userKey.id} style={{ marginBottom: "1.5rem" }}>
              <Card>
                <Image
                  style={{ height: "0" }}
                  label={{ as: 'a', color: `${userKey.confirmed ? "blue" : "grey"}`, corner: 'right', icon: 'check' }}
                />
                <Card.Content header={onSetTitle(userKey.type)} />
                <Card.Content description={userKey.title} />
                {
                  loading ? (
                    <Card.Content extra>
                      <Loader active inline='centered' />
                    </Card.Content>
                  ) : (
                  <Card.Content extra>
                    <Button
                      content={userKey.active ? 'Desativar' : 'Ativar'}
                      toggle                  
                      active={!userKey.active}
                      onClick={() => onToggleActive({ variables: { userId: user.id, keyId: userKey.id }})}
                    ></Button>
                    <DeleteButton keyId={userKey.id} userId={user.id} callback={refetch} />
                  </Card.Content>
                  )
                }
              </Card>
            </Grid.Column>
          ))
        )
      }
      </Grid.Row>
    </Grid>
  )
}

export default KeyList