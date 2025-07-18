import Link from 'next/link'
import { Launch } from '@/types/spacex'
import { Button } from '@/components/ui/button'

interface LaunchCardProps {
  launch: Launch
}

export default function LaunchCard({ launch }: LaunchCardProps) {
  const launchDate = new Date(launch.launch_date_utc)
  const formatDate = launchDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all hover:shadow-xl hover:shadow-blue-500/10 group h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
            {launch.mission_name}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{formatDate}</p>
        </div>
        {launch.links.mission_patch_small && (
          <img 
            src={launch.links.mission_patch_small} 
            alt={`${launch.mission_name} patch`}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0 ml-3"
            loading="lazy"
          />
        )}
      </div>

      <div className="space-y-2 mb-4 flex-grow">
        <p className="text-gray-300 text-sm">
          <span className="font-medium text-gray-400">Rocket:</span> <span className="break-words">{launch.rocket.rocket_name}</span>
        </p>
        <p className="text-gray-300 text-sm">
          <span className="font-medium text-gray-400">Launch Site:</span> <span className="break-words">{launch.launch_site?.site_name_long || 'Unknown'}</span>
        </p>
        <p className="text-gray-300 text-sm">
          <span className="font-medium text-gray-400">Status:</span>{' '}
          <span className={`font-medium ${
            launch.launch_success === null 
              ? 'text-yellow-400' 
              : launch.launch_success 
              ? 'text-green-400' 
              : 'text-red-400'
          }`}>
            {launch.launch_success === null ? 'Upcoming' : launch.launch_success ? 'Success' : 'Failed'}
          </span>
        </p>
      </div>

      {launch.details && (
        <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">
          {launch.details}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-auto">
        <Link href={`/launches/${launch.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 w-full">
            View Details
          </Button>
        </Link>
        
        <div className="flex gap-2">
          {launch.links.video_link && (
            <a 
              href={launch.links.video_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial"
            >
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 w-full sm:w-auto">
                <svg className="w-4 h-4 sm:mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span className="hidden sm:inline">Watch</span>
              </Button>
            </a>
          )}
          
          {launch.links.article_link && (
            <a 
              href={launch.links.article_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial"
            >
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 w-full sm:w-auto">
                <svg className="w-4 h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="hidden sm:inline">Read</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}