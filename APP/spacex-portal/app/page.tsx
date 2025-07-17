export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to SpaceX Portal
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track and explore SpaceX launches, missions, and rocket data
          </p>
        </section>

        <section className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Explore SpaceX
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              This portal provides real-time information about SpaceX launches,
              missions, and rocket data sourced from the official SpaceX API.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  🚀 Upcoming Launches
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  View scheduled launches and mission details
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  📡 Past Missions
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Explore historical launch data and outcomes
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  🛸 Rocket Fleet
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn about SpaceX rockets and capabilities
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
