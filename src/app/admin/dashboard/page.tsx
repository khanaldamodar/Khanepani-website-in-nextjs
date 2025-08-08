import { Edit3, Plus, Users , Image} from 'lucide-react'
import React from 'react'

const page = () => {
  return (
     <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Admin Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Documents</h3>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Blog Posts</h3>
              <p className="text-3xl font-bold text-green-600">87</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gallery Images</h3>
              <p className="text-3xl font-bold text-purple-600">456</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                <Plus size={20} className="mr-2" />
                Add Document
              </button>
              <button className="flex items-center justify-center p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
                <Edit3 size={20} className="mr-2" />
                New Post
              </button>
              <button className="flex items-center justify-center p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200">
                <Image size={20} className="mr-2" />
                
                Upload Image
              </button>
              <button className="flex items-center justify-center p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
                <Users size={20} className="mr-2" />
                Add Member
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default page