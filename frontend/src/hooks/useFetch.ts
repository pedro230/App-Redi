import { useEffect, useState } from 'react'
import axios from 'axios'

interface FetchState<T> {
  data: T
  loading: boolean
  error: string | null
}

export function useFetch<T>(url: string, fallbackData: T): FetchState<T> {
  const [data, setData] = useState<T>(fallbackData)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true
    setLoading(true)
    setError(null)

    axios
      .get<T>(url)
      .then((response) => {
        if (!isActive) return
        setData(response.data)
      })
      .catch((err) => {
        if (!isActive) return
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? err.message)
        } else {
          setError((err as Error).message)
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [url])

  return { data, loading, error }
}
