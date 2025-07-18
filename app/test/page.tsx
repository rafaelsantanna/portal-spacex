'use client'

import { useQuery } from '@apollo/client'
import { GET_LAUNCHES } from '@/lib/queries'
import { LaunchesData } from '@/types/spacex'

export default function TestPage() {
  const { loading, error, data } = useQuery<LaunchesData>(GET_LAUNCHES, {
    variables: { limit: 5 }
  })

  if (loading) return <div className="p-8 text-white">Loading...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">SpaceX API Test</h1>
      
      <div className="space-y-4">
        {data?.launches.map((launch) => (
          <div key={launch.id} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{launch.mission_name}</h2>
            <p className="text-gray-300">
              <span className="font-medium">Date:</span> {new Date(launch.launch_date_utc).toLocaleDateString()}
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Rocket:</span> {launch.rocket.rocket_name}
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Success:</span> {launch.launch_success ? '✅' : '❌'}
            </p>
            {launch.details && (
              <p className="text-gray-400 mt-2 text-sm">{launch.details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}