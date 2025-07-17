'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { GET_LAUNCHES } from '@/lib/queries'
import { LaunchesData, Launch } from '@/types/spacex'
import LaunchCard from '@/components/LaunchCard'
import { Button } from '@/components/ui/button'

const LAUNCHES_PER_PAGE = 12

export default function LaunchesPage() {
  const [launches, setLaunches] = useState<Launch[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const { loading, error, data, fetchMore } = useQuery<LaunchesData>(GET_LAUNCHES, {
    variables: { limit: LAUNCHES_PER_PAGE, offset: 0 },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (data?.launches) {
      setLaunches(data.launches)
      setHasMore(data.launches.length === LAUNCHES_PER_PAGE)
    }
  }, [data])

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore || loading) return

    setIsLoadingMore(true)
    try {
      const result = await fetchMore({
        variables: {
          offset: launches.length,
          limit: LAUNCHES_PER_PAGE,
        },
      })

      if (result.data.launches.length > 0) {
        setLaunches(prev => [...prev, ...result.data.launches])
        setHasMore(result.data.launches.length === LAUNCHES_PER_PAGE)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error loading more launches:', error)
    } finally {
      setIsLoadingMore(false)
    }
  }, [fetchMore, hasMore, isLoadingMore, launches.length, loading])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    observerRef.current = observer

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, isLoadingMore, loadMore])

  if (loading && launches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center space-x-2">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xl">Loading launches...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-400 mb-4">Error Loading Launches</h1>
            <p className="text-gray-300">{error.message}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            SpaceX Launches
          </h1>
          <p className="text-xl text-gray-300">
            Explore the complete history of SpaceX launches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {launches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </div>

        {hasMore && (
          <div 
            ref={loadMoreRef} 
            className="flex justify-center mt-8 py-8"
          >
            {isLoadingMore ? (
              <div className="inline-flex items-center justify-center space-x-2">
                <div className="w-6 h-6 border-3 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-300">Loading more launches...</span>
              </div>
            ) : (
              <span className="text-gray-400">Scroll for more</span>
            )}
          </div>
        )}

        {!hasMore && launches.length > 0 && (
          <div className="text-center mt-8 py-8">
            <p className="text-gray-400">You&apos;ve reached the end! Total launches: {launches.length}</p>
          </div>
        )}
      </div>
    </div>
  )
}