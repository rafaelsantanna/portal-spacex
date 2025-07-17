'use client'

import { useQuery } from '@apollo/client'
import { GET_LAUNCH_BY_ID } from '@/lib/queries'
import { LaunchData } from '@/types/spacex'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface LaunchDetailPageProps {
  params: Promise<{ id: string }>
}

export default function LaunchDetailPage({ params }: LaunchDetailPageProps) {
  const [launchId, setLaunchId] = useState<string | null>(null)

  useEffect(() => {
    params.then(({ id }) => setLaunchId(id))
  }, [params])

  const { loading, error, data } = useQuery<LaunchData>(GET_LAUNCH_BY_ID, {
    variables: { id: launchId },
    skip: !launchId,
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center space-x-2">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xl">Loading launch details...</span>
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
            <h1 className="text-4xl font-bold text-red-400 mb-4">Error Loading Launch</h1>
            <p className="text-gray-300 mb-4">{error.message}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mr-4"
              variant="outline"
            >
              Retry
            </Button>
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!data?.launch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-400 mb-4">Launch Not Found</h1>
            <p className="text-gray-300 mb-4">The launch you&apos;re looking for doesn&apos;t exist.</p>
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const launch = data.launch
  const launchDate = new Date(launch.launch_date_utc)
  const formatDate = launchDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button 
            onClick={() => window.history.back()} 
            variant="outline"
            className="mb-6 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
          >
            ← Back to Launches
          </Button>
          
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                {launch.mission_name}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-2">{formatDate}</p>
              <p className="text-base sm:text-lg">
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
            
            {launch.links.mission_patch && (
              <img 
                src={launch.links.mission_patch} 
                alt={`${launch.mission_name} patch`}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain mx-auto sm:mx-0 flex-shrink-0"
              />
            )}
          </div>
        </div>

        {/* Launch Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Mission Details */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">Mission Details</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-400 text-sm sm:text-base">Rocket:</span>
                <p className="text-gray-300 text-sm sm:text-base">{launch.rocket.rocket_name} ({launch.rocket.rocket_type})</p>
              </div>
              <div>
                <span className="font-medium text-gray-400 text-sm sm:text-base">Launch Site:</span>
                <p className="text-gray-300 text-sm sm:text-base break-words">{launch.launch_site?.site_name_long || 'Unknown'}</p>
              </div>
              {launch.details && (
                <div>
                  <span className="font-medium text-gray-400 text-sm sm:text-base">Description:</span>
                  <p className="text-gray-300 mt-1 text-sm sm:text-base">{launch.details}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">Additional Information</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-400 text-sm sm:text-base">Launch Year:</span>
                <p className="text-gray-300 text-sm sm:text-base">{new Date(launch.launch_date_utc).getFullYear()}</p>
              </div>
              <div>
                <span className="font-medium text-gray-400 text-sm sm:text-base">Mission ID:</span>
                <p className="text-gray-300 text-sm sm:text-base break-all">{launch.id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-400 text-sm sm:text-base">Upcoming:</span>
                <p className="text-gray-300 text-sm sm:text-base">
                  {new Date(launch.launch_date_utc) > new Date() ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {launch.links.flickr_images && launch.links.flickr_images.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">Image Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {launch.links.flickr_images.map((image, index) => (
                <div
                  key={image}
                  className="relative group cursor-pointer overflow-hidden rounded-lg bg-black/20"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${launch.mission_name} image ${index + 1}`}
                    className="w-full h-32 sm:h-40 lg:h-48 object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External Links */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">External Links</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            {launch.links.video_link && (
              <a 
                href={launch.links.video_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 w-full sm:w-auto justify-center sm:justify-start">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="hidden sm:inline">Watch Launch Video</span>
                  <span className="sm:hidden">Watch Video</span>
                </Button>
              </a>
            )}
            
            {launch.links.article_link && (
              <a 
                href={launch.links.article_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 w-full sm:w-auto justify-center sm:justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Read Article
                </Button>
              </a>
            )}
            
            {launch.links.wikipedia && (
              <a 
                href={launch.links.wikipedia} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 w-full sm:w-auto justify-center sm:justify-start">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  Wikipedia
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-full sm:max-w-4xl max-h-full mx-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-1 sm:p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={selectedImage}
                alt="Launch gallery image"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}