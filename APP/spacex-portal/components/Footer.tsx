export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              SpaceX Portal
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tracking SpaceX launches, missions, and innovations.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/launches" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Launches
                </a>
              </li>
              <li>
                <a href="/rockets" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Rockets
                </a>
              </li>
              <li>
                <a href="/company" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Company
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
              External Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.spacex.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  SpaceX Official
                </a>
              </li>
              <li>
                <a 
                  href="https://api.spacexdata.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  SpaceX API
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 SpaceX Portal. Built with Next.js and TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}