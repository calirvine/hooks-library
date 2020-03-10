import { useState, useEffect } from 'react'

export function useAsync(promiseFn, dataProperty = 'data') {
  const [pending, setPending] = useState(true)
  const [resolved, setResolved] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const doAsync = async () => {
      try {
        const data = await promiseFn()
        setResponse(data[dataProperty])
        setPending(false)
        setResolved(true)
      } catch (err) {
        setPending(false)
        setError(err.message)
        setResolved(true)
      }
    }
    doAsync()
  }, [reload, promiseFn, dataProperty])

  return {
    pending,
    resolved,
    response,
    error,
    reload: () => setReload(reload => reload++),
  }
}
