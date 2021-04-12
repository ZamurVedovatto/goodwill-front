import { useState, useEffect } from 'react'
import cepPromise from 'cep-promise'

const useFillAddress = () => {
  const [address, setAddress] = useState({})
  const [currCep, setCurrCep] = useState(null)
  const [success, setSuccess] = useState(false)

  const onSetAddress = async (cep) => {
    if (cep.length === 8 && cep !== currCep) {
      const data = await cepPromise(cep)
      console.log(data)
      setAddress(data)
      console.log(address)

      // TODO 
      // if success
      setCurrCep(cep)
      setSuccess(true)
      // else
      setSuccess(false)

    }
  }

  return { address, onSetAddress }
}

export default useFillAddress