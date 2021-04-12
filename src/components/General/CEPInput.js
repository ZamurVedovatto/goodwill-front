import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import { GET_ADDRESS_BY_CEP } from '../../util/graphql'

export default function CEPInput() {
  const [cep, setCep] = useState("")

  useEffect(() => {
    if (cep.length === 8) {
      onSubmit()
    }
  }, [cep])

  const { loading, client, fetchMore } = useQuery(GET_ADDRESS_BY_CEP)

  const onSubmit = async () => {
    console.log(cep)    
    const data = await fetchMore({
      variables: {
        cep
      },
      updateQuery() {}
    })
    console.log(data?.data?.getAddressByCep)
  }

  return (
    <Form.Input
      control='input' type='number' max={8} label='CEP' placeholder='CEP'
      value={cep}
      // error={errors.code ? true : false}
      onChange={(e) => setCep(e.target.value)}
    />
  )
}
