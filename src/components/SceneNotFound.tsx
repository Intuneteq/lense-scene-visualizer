import React from 'react'
import { Frown } from 'lucide-react'

export default function SceneNotFound() {
   return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4 py-10">
         <Frown className="w-14 h-14 text-gray-400 mb-3" />
         <h2 className="text-lg font-medium text-gray-800 mb-1">
            Scene not available
         </h2>

         <p className="text-sm text-gray-600 max-w-sm">
            This lens does not support the selected scene.
            Please choose another scene or lens combination to continue exploring.
         </p>
      </div>
   )
}
