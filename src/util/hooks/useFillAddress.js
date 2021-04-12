import { useState, useEffect } from 'react'
import cepPromise from 'cep-promise'

const useFillAddress = () => {
  const [address, setAddress] = useState({})
  const [currCep, setCurrCep] = useState(null)
  const [success, setSuccess] = useState(false)

  const onSetAddress = async (cep) => {
    if (cep.length === 8 && cep !== currCep) {
      cepPromise(cep)
        .then(data => {
          if (data.message) {
            setAddress({})
            setSuccess(false)
          } else {
            console.log(data)
            setAddress(data)
            setCurrCep(cep)
            setSuccess(true)
          }
        })
        .catch(error => {
          setAddress({})
          setSuccess(false)
        })
    }
  }

  return { success, address, onSetAddress }
}

export default useFillAddress