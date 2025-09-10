"use client"

import { motion } from "framer-motion"
import { SearchX, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full rounded-2xl bg-white shadow-lg p-8 text-center border border-gray-200"
      >
        <div className="flex justify-center mb-4">
          <SearchX className="h-12 w-12 text-gray-700" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Page Not Found</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => router.back()}
            className="cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 transition"
          >
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
