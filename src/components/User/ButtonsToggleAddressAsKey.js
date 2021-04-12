import { useMutation } from '@apollo/client'
import React from 'react'
import { Button } from 'semantic-ui-react'
import { SET_ADDRESS_AS_KEY } from '../../util/graphql'

export default function ButtonsToggleAddressAsKey({address}) {
  const [setAddressAsKey] = useMutation(SET_ADDRESS_AS_KEY, {
    variables: { addressId: address.id }
  })

  return (
    <div className='ui two buttons'>
      {
        address.asKey ? (
          <Button basic color='grey' onClick={setAddressAsKey}>
            Desativar Endereço-Chave
          </Button>
        ) : (
          <Button basic primary color='blue' onClick={setAddressAsKey}>
            Ativar Endereço-Chave
          </Button>
        )
      }
    </div>
  )
}
