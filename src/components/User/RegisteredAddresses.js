import { useQuery } from '@apollo/client'
import React from 'react'
import { Card } from 'semantic-ui-react'
import { FETCH_USER_ADDRESSES } from '../../util/graphql'
import ButtonsToggleAddressAsKey from './ButtonsToggleAddressAsKey'


export default function RegisteredAddresses({user}) {
  const { loading, data: { getUserAddresses: addresses } = {} } = useQuery(FETCH_USER_ADDRESSES, {
    variables: {
      userId: user?.id
    }
  })

  const onAddressPrettify = ({ street, number, complement, neighborhood, city }) => {
    let address = `${street}, `;
    if (number !== null) {
      address += ` ${number},`
    }
    if (complement !== "") {
      address += ` ${complement},`
    }
    address += ` ${neighborhood}, ${city}`
    return address
  }

  return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Endereços Cadastrados</Card.Header>
          <Card.Meta>Visualize, edite ou exclua.</Card.Meta>
          <Card.Description>
            Chaves criadas pela próprio usuário.
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Group>
            {
              !loading && addresses?.map(address => (
                <Card raised>
                  <Card.Content>
                    <Card.Header>{address.type}</Card.Header>
                    <Card.Meta>
                      <span className='date'>{address.code}</span>
                    </Card.Meta>
                    <Card.Description>
                      {onAddressPrettify(address)}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <ButtonsToggleAddressAsKey address={address} />
                  </Card.Content>
                </Card>
              ))
            }
          </Card.Group>
        </Card.Content>
      </Card>

  )
}
