"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function AIChatFab() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/messages?chat=ai")
  }

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <Button
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg flex items-center justify-center"
        aria-label="Open AI Chat"
        size="icon"
      >
        <Sparkles className="w-7 h-7 text-white" />
      </Button>
    </div>
  )
}
