import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Card, Grid, Button, Header, Icon } from 'semantic-ui-react'
import { FETCH_USER_ADDRESSES, SET_ADDRESS_AS_KEY } from '../../util/graphql'
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
    <Grid columns={3} divided inverted padded stackable stretched>
      <Header as='h3'>Endereços cadastrados</Header>
        <Grid.Row>
        {
          !loading && addresses?.map(address => (
            <Grid.Column>
              <Card>
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
            </Grid.Column>
          ))
        }
        </Grid.Row>

    </Grid>
  )
}
