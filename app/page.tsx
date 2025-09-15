"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ExternalLink, ChevronRight, Plus, Settings, Shield, Users } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

const conferences = [
  {
    id: 4,
    name: "HireWire 2025",
    subtitle: "Product • UI/UX • Data",
    status: "current",
    dates: "Jul 15-17, 2025",
    location: "San Francisco, CA",
    attendees: 3500,
    sessions: 180,
    companies: 550,
    progress: 0,
    image: "/conference.jpg",
  },
  {
    id: 1,
    name: "HireWire 2024",
    subtitle: "UI/UX • Product • Data",
    status: "upcoming",
    dates: "Dec 15-19, 2024",
    location: "San Francisco, CA",
    attendees: 3000,
    sessions: 150,
    companies: 500,
    progress: 65,
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 2,
    name: "HireWire Europe 2024",
    subtitle: "Design & Innovation",
    status: "upcoming",
    dates: "Mar 10-14, 2025",
    location: "London, UK",
    attendees: 2500,
    sessions: 120,
    companies: 400,
    progress: 0,
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 3,
    name: "HireWire 2023",
    subtitle: "Future of Work",
    status: "past",
    dates: "Nov 20-24, 2023",
    location: "New York, NY",
    attendees: 2800,
    sessions: 140,
    companies: 450,
    progress: 100,
    image: "/placeholder.svg?height=120&width=200",
  },
]

const mySchedule = [
  {
    id: 1,
    title: "Keynote: The Future of Design Systems",
    speaker: "Sarah Chen",
    time: "09:00 - 10:00",
    date: "Today",
    location: "Main Auditorium",
    type: "Keynote",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Hands-on: Figma Advanced Techniques",
    speaker: "Marcus Rodriguez",
    time: "10:30 - 12:00",
    date: "Today",
    location: "Workshop Room A",
    type: "Workshop",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Speed Networking Session",
    speaker: "HireWire Team",
    time: "12:30 - 13:30",
    date: "Today",
    location: "Networking Lounge",
    type: "Networking",
    status: "upcoming",
  },
  {
    id: 4,
    title: "AI in Product Design Panel",
    speaker: "Panel Discussion",
    time: "14:00 - 15:30",
    date: "Tomorrow",
    location: "Main Auditorium",
    type: "Panel",
    status: "scheduled",
  },
]

export default function HomePage() {
  const [selectedConference, setSelectedConference] = useState(4)
  const [showAllConferences, setShowAllConferences] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "schedule">("overview")

  const currentConference = conferences.find((c) => c.id === selectedConference) || conferences[0]
  const upcomingEvents = mySchedule.filter((event) => event.date === "Today").slice(0, 3)

  useEffect(() => {
    // Auto-select current conference on app load
    const current = conferences.find((c) => c.status === "current")
    if (current) setSelectedConference(current.id)
  }, [])

  const syncWithGoogleCalendar = () => {
    console.log("Syncing with Google Calendar...")
    // Integration logic would go here
  }

  if (showAllConferences) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setShowAllConferences(false)} className="text-blue-600">
              Cancel
            </Button>
            <h1 className="text-lg font-semibold">Select Conference</h1>
            <div className="w-16"></div>
          </div>
        </div>

        {/* Conference List */}
        <div className="px-6 py-6 space-y-4">
          {conferences.map((conference) => (
            <Card
              key={conference.id}
              className={`border-0 shadow-sm cursor-pointer transition-all duration-200 ${
                selectedConference === conference.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
              }`}
              onClick={() => {
                setSelectedConference(conference.id)
                setShowAllConferences(false)
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={conference.image || "/placeholder.svg"}
                    alt={conference.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{conference.name}</h3>
                      <Badge
                        variant={
                          conference.status === "current"
                            ? "default"
                            : conference.status === "upcoming"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {conference.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{conference.subtitle}</p>
                    <p className="text-xs text-gray-500">
                      {conference.dates} • {conference.location}
                    </p>
                  </div>
                  {selectedConference === conference.id && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1" align="start">
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </PopoverContent>
          </Popover>
          <h1 className="text-lg font-semibold">HireWire</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Current Conference Card */}
      <div className="px-6 py-6">
        <Card
          className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
          onClick={() => setShowAllConferences(true)}
        >
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={currentConference.image || "/placeholder.svg"}
                alt={currentConference.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">{currentConference.name}</h2>
                    <p className="text-white/90 text-sm">{currentConference.subtitle}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/80" />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {currentConference.dates}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {currentConference.location}
                </div>
              </div>

              {currentConference.status === "current" && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Conference Progress</span>
                    <span className="font-medium">{currentConference.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${currentConference.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{currentConference.sessions}+</div>
                  <div className="text-xs text-gray-600">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{currentConference.companies}+</div>
                  <div className="text-xs text-gray-600">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {(currentConference.attendees / 1000).toFixed(1)}K+
                  </div>
                  <div className="text-xs text-gray-600">Attendees</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 mb-6">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className="flex-1 h-10"
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "schedule" ? "default" : "ghost"}
            onClick={() => setActiveTab("schedule")}
            className="flex-1 h-10"
          >
            My Schedule
          </Button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "overview" ? (
        <div className="px-6 space-y-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/map">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900">Event Map</h3>
                  <p className="text-xs text-gray-600">Explore venues</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/networking">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900">Network</h3>
                  <p className="text-xs text-gray-600">Meet people</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Today's Highlights */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Today's Highlights</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900">{event.title}</h4>
                      <p className="text-xs text-gray-600">
                        {event.time} • {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/events">
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Sessions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="px-6 space-y-4">
          {/* Schedule Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">My Schedule</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={syncWithGoogleCalendar}
              className="flex items-center bg-transparent"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Sync Calendar
            </Button>
          </div>

          {/* Schedule List */}
          <div className="space-y-3">
            {mySchedule.map((event) => (
              <Card key={event.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-center min-w-0">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{event.date}</div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{event.time.split(" - ")[0]}</div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{event.speaker}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time}
                        <span className="mx-2">•</span>
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </div>
                    </div>

                    <div
                      className={`w-3 h-3 rounded-full ${event.status === "upcoming" ? "bg-blue-500" : "bg-gray-300"}`}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Event Button */}
          <Link href="/events">
            <Button variant="outline" className="w-full flex items-center justify-center bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              Add More Events
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
