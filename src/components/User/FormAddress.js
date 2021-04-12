import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form, Segment, Icon, Accordion } from 'semantic-ui-react'
import { CREATE_ADDRESS_MUTATION } from '../../util/graphql'
import { useForm } from '../../util/hooks/useForm'
import addressTypes from './../../util/consts/addressTypes'
import cepPromise from 'cep-promise'

export default function FormAddress({user}) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [cepLoading, setCepLoading] = useState(false)
  const [cep, setCep] = useState("")
  const [errors, setErrors] = useState({})
  
  const { onChange, onSubmit, values, setValues } = useForm(registerAddress, {
    userId: user.id,
    code: "",
    type: "house",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: ""
  })

  const [addAddress, { loading }] = useMutation(CREATE_ADDRESS_MUTATION, {
    update(_, { data: { createAddress: addressData } }) {
      console.log(addressData)
      if(addressData) {
        console.log(addressData)
      }
    },
    onError(err) {
      console.log(err)
      setErrors(err?.graphQLErrors[0]?.extensions?.exception.errors)
    },
    variables: values
  })

  function registerAddress() {
    console.log(values)
    addAddress()
  }

  const onSetSelection = (key) => {
    let event = {
      target: {
        name: "type",
        value: key.value
      }
    }
    onChange(event)
  }

  const onFillAddress = async () => {
    setCepLoading(true)
    if (cep.length === 8) {
      await cepPromise(cep)
        .then(data => {
          if (data.cep) {
            setErrors({})
            setValues({
              ...values,
              code: data.cep,
              street: data.street,
              neighborhood: data.neighborhood,
              city: data.city
            })
          }
        })
        .catch(error => {
          console.log(error)
          setErrors({ cep: error })
          setValues({
            ...values,
            code: "",
            street: "",
            neighborhood: "",
            city: ""
          })
        })
        setCepLoading(false)
    }
  }


  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  return (
    <Accordion styled fluid style={{marginTop: "1rem"}}>
    <Accordion.Title
      active={activeIndex === 0}
      index={0}
      onClick={handleClick}
      style={{ fontSize: "1.28571429rem"}}
    >
      <Icon name='dropdown' />
      Registrar novo endereço
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 0}>
      <Form
          loading={loading}
          onSubmit={onSubmit}
          noValidate
          className={loading ? 'loading' : ''}
        >
        <Segment vertical>
          <Form.Group>
            <Form.Field width={8}>
              <label>Modalidade</label>
              <div>
                {!loading && addressTypes?.map((addressType) => (
                  <Button
                    type="button"
                    primary
                    basic={addressType.value !== values.type}
                    style={{ margin: " .25rem .15rem"}} compact circular key={addressType.key}
                    onClick={() => onSetSelection(addressType)}  
                  >{addressType.text}</Button>
                ))}
              </div>
            </Form.Field>

            <Form.Field width={8} required>
              <Form.Input
                value={cep}
                onChange={e => setCep(e.target.value)}
                fluid label='CEP' placeholder='CEP'
                error={errors?.cep ? true : false}
                loading={cepLoading}
                icon={<Icon name='search' inverted circular link onClick={onFillAddress} />}
              >
                {/* <Button animated onClick={onFillAddress}>
                  <Button.Content visible>Buscar</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button> */}
              </Form.Input>
            </Form.Field>
          </Form.Group>

          <Form.Group>
            <Form.Field width={12}>
              <Form.Input
                fluid label='Rua/Logradouro' placeholder='Rua/Logradouro'
                value={values.street}
                readOnly
              />
            </Form.Field>
            <Form.Field required width={4}>
              <Form.Input
                label='Número' placeholder='Número'
                value={values.number}
                name="number"
                error={errors?.number ? true : false}
                onChange={onChange}
              />
            </Form.Field>
          </Form.Group>

          <Form.Field width={16}>
            <Form.Input
              fluid label='Complemento' placeholder='Complemento'
              value={values.complement}  
              name="complement"
              error={errors?.complement ? true : false}
              onChange={onChange}
            />
          </Form.Field>

          <Form.Group widths='equal'>
            <Form.Field>
              <Form.Input
                fluid label='Bairro' placeholder='Bairro'
                value={values.neighborhood}
                readOnly
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label='Cidade' placeholder='Cidade'
                value={values.city}
                readOnly
              />
            </Form.Field>
          </Form.Group>
        </Segment>

        <Segment vertical>
          <Form.Field>
            <Button primary type='submit'>Salvar</Button>
          </Form.Field>
        </Segment>
      </Form>
    </Accordion.Content>
  </Accordion>
  )
}
