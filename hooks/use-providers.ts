"use client"

import { useState, useEffect } from "react"
import type { Provider } from "@/types/plan"

interface UseProvidersResult {
  providers: Provider[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useProviders(category?: string): UseProvidersResult {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProviders = async () => {
    try {
      setLoading(true)
      setError(null)

      const url = category ? `/api/providers?category=${category}` : "/api/providers"
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch providers")
      }

      const result = await response.json()

      if (result.success) {
        setProviders(result.data)
      } else {
        throw new Error(result.error || "Unknown error")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setProviders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProviders()
  }, [category])

  return {
    providers,
    loading,
    error,
    refetch: fetchProviders,
  }
}

export function useProvider(id: string) {
  const [provider, setProvider] = useState<Provider | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/providers/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch provider")
        }

        const result = await response.json()

        if (result.success) {
          setProvider(result.data)
        } else {
          throw new Error(result.error || "Provider not found")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setProvider(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProvider()
    }
  }, [id])

  return { provider, loading, error }
}
