import { Button } from "@/components/ui/button"
import Link from "next/link"
import { apolloClient } from "@/lib/apollo"
import { GET_LAUNCHES } from "@/lib/queries"
import { LaunchesData } from "@/types/spacex"

async function getLatestLaunch() {
  try {
    const { data } = await apolloClient.query<LaunchesData>({
      query: GET_LAUNCHES,
      variables: { limit: 1 }
    })
    return data.launches[0]
  } catch (error) {
    console.error('Error fetching latest launch:', error)
    return null
  }
}

async function getLaunchStats() {
  try {
    const { data } = await apolloClient.query<LaunchesData>({
      query: GET_LAUNCHES,
      variables: { limit: 200 }
    })
    
    const totalLaunches = data.launches.length
    const successfulLaunches = data.launches.filter(launch => launch.launch_success).length
    const successRate = Math.round((successfulLaunches / totalLaunches) * 100)
    
    return {
      total: totalLaunches,
      successful: successfulLaunches,
      successRate
    }
  } catch (error) {
    console.error('Error fetching launch stats:', error)
    return null
  }
}

export default async function Home() {
  const latestLaunch = await getLatestLaunch()
  const stats = await getLaunchStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="text-center space-y-6 sm:space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent px-4">
            SpaceX Launch Portal
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Explore the history of SpaceX launches and stay updated with the latest missions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/launches">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                View Launches
              </Button>
            </Link>
            {latestLaunch && (
              <Link href={`/launches/${latestLaunch.id}`}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  <span className="hidden sm:inline">Latest Mission: </span>
                  {latestLaunch.mission_name}
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Total Launches</h3>
            <p className="text-2xl sm:text-3xl font-bold text-blue-400">{stats?.total || '200'}+</p>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Missions to date</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Success Rate</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-400">{stats?.successRate || '95'}%</p>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Mission success rate</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Latest Launch</h3>
            <p className="text-lg sm:text-xl font-bold text-purple-400">
              {latestLaunch ? new Date(latestLaunch.launch_date_utc).toLocaleDateString() : 'Loading...'}
            </p>
            <p className="text-gray-400 mt-2 text-sm sm:text-base truncate">
              {latestLaunch?.mission_name || 'Fetching data...'}
            </p>
          </div>
        </div>

        {latestLaunch && (
          <div className="mt-12 sm:mt-16 bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-white/10 mx-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Recent Mission Highlight</h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {latestLaunch.links.mission_patch && (
                <img 
                  src={latestLaunch.links.mission_patch} 
                  alt={`${latestLaunch.mission_name} patch`}
                  className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain mx-auto"
                  loading="lazy"
                />
              )}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold">{latestLaunch.mission_name}</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  <span className="font-medium">Rocket:</span> {latestLaunch.rocket.rocket_name}
                </p>
                <p className="text-gray-300 text-sm sm:text-base">
                  <span className="font-medium">Launch Site:</span> <span className="break-words">{latestLaunch.launch_site?.site_name_long || 'Unknown'}</span>
                </p>
                <p className="text-gray-300 text-sm sm:text-base">
                  <span className="font-medium">Status:</span>{' '}
                  <span className={latestLaunch.launch_success ? 'text-green-400' : 'text-red-400'}>
                    {latestLaunch.launch_success ? 'Successful' : 'Failed'}
                  </span>
                </p>
                {latestLaunch.details && (
                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                    {latestLaunch.details}
                  </p>
                )}
                <Link href={`/launches/${latestLaunch.id}`}>
                  <Button variant="outline" size="sm" className="mt-4">
                    View Details →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}