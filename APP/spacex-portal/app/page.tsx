import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SpaceX Launch Portal
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the history of SpaceX launches and stay updated with the latest missions
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View Launches
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Latest Mission
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Total Launches</h3>
            <p className="text-3xl font-bold text-blue-400">200+</p>
            <p className="text-gray-400 mt-2">Successful missions completed</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Reusable Rockets</h3>
            <p className="text-3xl font-bold text-green-400">90%</p>
            <p className="text-gray-400 mt-2">Landing success rate</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Next Launch</h3>
            <p className="text-3xl font-bold text-purple-400">Soon</p>
            <p className="text-gray-400 mt-2">Stay tuned for updates</p>
          </div>
        </div>
      </div>
    </div>
  )
}