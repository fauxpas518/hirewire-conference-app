"use client"

import { useState, useRef } from "react"
import { useSwipeable, SwipeEventData } from "react-swipeable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Filter, MapPin, Heart, X, MessageCircle, Github, Linkedin, RotateCcw } from "lucide-react"
import Link from "next/link"

const profiles = [
  {
    id: 1,
    firstName: "Sarah",
    lastInitial: "C",
    title: "Senior Product Designer",
    company: "Google",
    location: "San Francisco, CA",
    country: "USA",
    level: "Senior",
    role: "Job Seeker",
    interests: ["Design Systems", "AI/ML", "Accessibility"],
    photo: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/sarahc",
    github: "https://github.com/sarahc",
    bio: "Passionate about creating inclusive design systems that scale across products and teams.",
  },
  {
    id: 2,
    firstName: "Marcus",
    lastInitial: "R",
    title: "Data Scientist",
    company: "Netflix",
    location: "Los Angeles, CA",
    country: "USA",
    level: "Mid-level",
    role: "Job Seeker",
    interests: ["Machine Learning", "Data Viz", "Python"],
    photo: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/marcusr",
    github: "https://github.com/marcusr",
    bio: "Building recommendation systems and exploring the intersection of data science and user experience.",
  },
  {
    id: 3,
    firstName: "Emily",
    lastInitial: "W",
    title: "Head of Talent",
    company: "Stripe",
    location: "New York, NY",
    country: "USA",
    level: "Executive",
    role: "Recruiter",
    interests: ["Talent Strategy", "Team Building", "Diversity"],
    photo: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/emilyw",
    github: null,
    bio: "Helping build world-class product and engineering teams. Always looking for exceptional talent.",
  },
  {
    id: 4,
    firstName: "Alex",
    lastInitial: "K",
    title: "UX Researcher",
    company: "Airbnb",
    location: "London, UK",
    country: "UK",
    level: "Mid-level",
    role: "Job Seeker",
    interests: ["User Research", "Behavioral Psychology", "Travel"],
    photo: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/alexk",
    github: "https://github.com/alexk",
    bio: "Uncovering user insights that drive product decisions. Love exploring new cultures and perspectives.",
  },
]

const filterOptions = {
  industry: ["All", "Tech", "Finance", "Healthcare", "E-commerce", "Media"],
  level: ["All", "Entry", "Mid-level", "Senior", "Executive"],
  country: ["All", "USA", "UK", "Canada", "Germany", "Australia"],
  role: ["All", "Job Seeker", "Recruiter", "Attendee"],
}

export default function NetworkingPage() {
  const [viewMode, setViewMode] = useState<"list" | "cards">("list")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showCardBack, setShowCardBack] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [filters, setFilters] = useState({
    industry: "All",
    level: "All",
    country: "All",
    role: "All",
  })

  const swipeHandlers = useSwipeable({
    onSwiping: (e: SwipeEventData) => {
      if (showCardBack) return; // Don't allow swiping when showing card back
      setIsDragging(true);
      setDragOffset(e.deltaX);
    },
    onSwiped: (e: SwipeEventData) => {
      setIsDragging(false);
      // Detect swipe direction based on velocity and distance
      const threshold = 80; // minimum distance for a swipe
      if (Math.abs(e.deltaX) > threshold) {
        if (e.deltaX > 0) {
          handleSwipe("right"); // Right swipe = like
        } else {
          handleSwipe("left"); // Left swipe = pass
        }
      } else {
        // Reset if it wasn't a strong enough swipe
        setDragOffset(0);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
    delta: 10, // minimum distance required before swipe recognized
  });

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel = filters.level === "All" || profile.level === filters.level
    const matchesCountry = filters.country === "All" || profile.country === filters.country
    const matchesRole = filters.role === "All" || profile.role === filters.role

    return matchesSearch && matchesLevel && matchesCountry && matchesRole
  })

  const currentProfile = filteredProfiles[currentCardIndex]

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction)

    if (direction === "right") {
      // Like action
      console.log("Liked:", currentProfile?.firstName)
    } else {
      // Pass action
      console.log("Passed:", currentProfile?.firstName)
    }

    // Use setTimeout to allow the swipe animation to complete
    setTimeout(() => {
      setShowCardBack(false)
      setCurrentCardIndex((prev) => (prev + 1) % filteredProfiles.length)
      setSwipeDirection(null)
      setDragOffset(0)
    }, 300)
  }

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Networking</h1>
          <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex-1"
          >
            List View
          </Button>
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("cards")}
            className="flex-1"
          >
            Card View
          </Button>
        </div>
      </div>

      {/* Search (List View Only) */}
      {viewMode === "list" && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search professionals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-4 py-4 space-y-4">
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-700 mb-2 block capitalize">{key}</label>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <Button
                    key={option}
                    variant={filters[key as keyof typeof filters] === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateFilter(key, option)}
                    className="text-xs"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="px-4 space-y-4 pb-4">
          {filteredProfiles.map((profile) => (
            <Card key={profile.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={profile.photo || "/placeholder.svg"}
                    alt={`${profile.firstName} ${profile.lastInitial}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {profile.firstName} {profile.lastInitial}.
                    </h3>
                    <p className="text-gray-600 mb-1">{profile.title}</p>
                    <p className="text-sm text-gray-500 mb-2">{profile.company}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profile.location}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {profile.interests.slice(0, 3).map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Card View */}
      {viewMode === "cards" && currentProfile && (
        <div className="px-4 py-8">
          <div className="max-w-sm mx-auto">
            <div 
              className="relative h-96"
              style={{
                perspective: "1000px"
              }}>
              <Card 
                key={currentProfile.id}
                className={`absolute inset-0 border-0 shadow-2xl transform transition-all duration-300 
                  ${swipeDirection === "left" ? "translate-x-[-200%] rotate-[-30deg]" : 
                    swipeDirection === "right" ? "translate-x-[200%] rotate-[30deg]" : ""}
                  ${!swipeDirection && isDragging ? "" : !swipeDirection ? "hover:scale-105" : ""}`}
                style={{
                  transform: isDragging ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)` : undefined,
                  opacity: isDragging ? 1 - Math.min(0.5, Math.abs(dragOffset) / 500) : 1,
                  transition: isDragging ? "none" : undefined
                }}
                {...swipeHandlers}>

                <CardContent className="p-0 h-full" onClick={() => !isDragging && setShowCardBack(!showCardBack)}>
                  {!showCardBack ? (
                    // Front of card
                    <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-2xl font-bold">
                              {currentProfile.firstName} {currentProfile.lastInitial}.
                            </h2>
                            <p className="text-blue-100">{currentProfile.title}</p>
                            <p className="text-blue-200 text-sm">{currentProfile.company}</p>
                          </div>
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            {currentProfile.role}
                          </Badge>
                        </div>

                        <div className="flex items-center text-blue-100 mb-6">
                          <MapPin className="w-4 h-4 mr-2" />
                          {currentProfile.location}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Top Interests</h3>
                        <div className="space-y-2">
                          {currentProfile.interests.slice(0, 3).map((interest, index) => (
                            <div key={index} className="bg-white/20 rounded-full px-3 py-1 text-sm">
                              {interest}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-center text-blue-200 text-sm mt-4">Tap to flip card</div>
                    </div>
                  ) : (
                    // Back of card
                    <div className="h-full bg-white rounded-lg p-6 flex flex-col">
                      <div className="flex-1">
                        <div className="text-center mb-6">
                          <img
                            src={currentProfile.photo || "/placeholder.svg"}
                            alt={`${currentProfile.firstName} ${currentProfile.lastInitial}`}
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                          />
                          <h2 className="text-xl font-bold text-gray-900">
                            {currentProfile.firstName} {currentProfile.lastInitial}.
                          </h2>
                          <p className="text-gray-600">{currentProfile.title}</p>
                        </div>

                        <p className="text-gray-700 text-sm mb-6 text-center">{currentProfile.bio}</p>

                        <div className="flex justify-center space-x-4 mb-6">
                          {currentProfile.linkedin && (
                            <Button size="sm" variant="outline">
                              <Linkedin className="w-4 h-4 mr-2" />
                              LinkedIn
                            </Button>
                          )}
                          {currentProfile.github && (
                            <Button size="sm" variant="outline">
                              <Github className="w-4 h-4 mr-2" />
                              GitHub
                            </Button>
                          )}
                        </div>
                      </div>

                      <Button className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Swipe Actions */}
            <div className="flex justify-center space-x-8 mt-8">
              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full border-red-200 hover:bg-red-50 bg-transparent"
                onClick={() => handleSwipe("left")}
              >
                <X className="w-6 h-6 text-red-500" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-12 h-12 rounded-full bg-transparent"
                onClick={() => setShowCardBack(!showCardBack)}
              >
                <RotateCcw className="w-5 h-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full border-green-200 hover:bg-green-50 bg-transparent"
                onClick={() => handleSwipe("right")}
              >
                <Heart className="w-6 h-6 text-green-500" />
              </Button>
            </div>

            <div className="text-center mt-4 text-sm text-gray-500">
              {currentCardIndex + 1} of {filteredProfiles.length}
            </div>
          </div>
        </div>
      )}

      
    </div>
  )
}
