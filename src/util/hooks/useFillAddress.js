import { useState, useEffect } from 'react'
import cepPromise from 'cep-promise'

const useFillAddress = () => {
  const [address, setAddress] = useState({})

  const onSetAddress = async (cep) => {
    if (cep.length === 8) {
      const data = await cepPromise(cep)
      console.log(data)
      setAddress(data)
      console.log(address)
    }
  }

  return { address, onSetAddress }
}

export default useFillAddress