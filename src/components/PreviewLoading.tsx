'use client'
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function PreviewLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-muted">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="text-purple-600"
      >
        <Loader2 size={48} />
      </motion.div>

      <p className="mt-4 text-sm text-white">
        Adjusting your lens view...
      </p>
    </div>
  )
}
