//For a more full featured async hook see https://github.com/async-library/react-async
//This is ok for basic uses.

import { useState, useEffect } from 'react'

export function useAsync(promisable = { promiseFn: async () => null }) {
  const { promiseFn, ...params } = promisable
  const [pending, setPending] = useState(true)
  const [resolved, setResolved] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const doAsync = async () => {
      try {
        const response = await promiseFn(...params)
        setData(response)
        setPending(false)
        setResolved(true)
      } catch (err) {
        setPending(false)
        setError(err.message)
        setResolved(true)
      }
    }
    setPending(true)
    setResolved(false)
    setError(null)
    doAsync()
  }, [reload, promiseFn, params])

  return {
    pending,
    resolved,
    data,
    error,
    reload: () => setReload(reload => reload++),
  }
}
