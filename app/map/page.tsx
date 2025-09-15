"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Clock, Users, Filter } from "lucide-react"
import Link from "next/link"

const venues = [
  { id: 1, name: "Main Auditorium", x: 15,   y: 24.2, capacity: 1000 }, // moved further up 10%, left 5%
  { id: 2, name: "Workshop Room A", x: 0.2,  y: 45,   capacity: 150 },  // down 5%, left 40%
  { id: 3, name: "Workshop Room B", x: 34.4, y: 38,   capacity: 150 },  // moved left 10%
  { id: 4, name: "Networking Lounge", x: 55.6, y: 35.5, capacity: 300 }, // moved left 10%
  { id: 5, name: "Exhibition Hall", x: 50,   y: 75,   capacity: 500 },
  { id: 6, name: "Breakout Space",  x: 0,    y: 71.7, capacity: 100 },
]

const events = {
  1: [
    {
      id: 1,
      title: "Keynote: The Future of Design Systems",
      time: "09:00 - 10:00",
      day: "Day 1",
      type: "Keynote",
      attendees: 850,
    },
    { id: 2, title: "AI in Product Design Panel", time: "14:00 - 15:30", day: "Day 1", type: "Panel", attendees: 720 },
  ],
  2: [
    {
      id: 3,
      title: "Hands-on: Figma Advanced Techniques",
      time: "10:30 - 12:00",
      day: "Day 1",
      type: "Workshop",
      attendees: 120,
    },
    {
      id: 4,
      title: "User Research Methodologies",
      time: "15:45 - 17:00",
      day: "Day 1",
      type: "Workshop",
      attendees: 95,
    },
  ],
  3: [
    {
      id: 5,
      title: "Data Visualization Best Practices",
      time: "11:00 - 12:30",
      day: "Day 1",
      type: "Workshop",
      attendees: 110,
    },
    {
      id: 6,
      title: "Product Analytics Deep Dive",
      time: "16:00 - 17:30",
      day: "Day 1",
      type: "Workshop",
      attendees: 130,
    },
  ],
  4: [
    {
      id: 7,
      title: "Speed Networking Session",
      time: "12:30 - 13:30",
      day: "Day 1",
      type: "Networking",
      attendees: 250,
    },
    { id: 8, title: "Happy Hour Mixer", time: "18:00 - 20:00", day: "Day 1", type: "Social", attendees: 280 },
  ],
  5: [
    { id: 9, title: "Startup Showcase", time: "10:00 - 17:00", day: "Day 1", type: "Exhibition", attendees: 400 },
    { id: 10, title: "Sponsor Booths", time: "09:00 - 18:00", day: "Day 1", type: "Exhibition", attendees: 450 },
  ],
  6: [
    { id: 11, title: "Mentorship Circles", time: "13:30 - 14:30", day: "Day 1", type: "Mentoring", attendees: 80 },
    { id: 12, title: "Career Coaching Sessions", time: "17:30 - 18:30", day: "Day 1", type: "Career", attendees: 60 },
  ],
}

export default function MapPage() {
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState("Day 1")

  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]

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
          <h1 className="text-lg font-semibold">Map</h1>
        </div>
      </div>

      {/* Day Selector */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex space-x-2 overflow-x-auto">
          {days.map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDay(day)}
              className="whitespace-nowrap"
            >
              {day}
            </Button>
          ))}
        </div>
      </div>

      {/* Interactive Map */}
      <div className="p-4">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Conference Center - Floor 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-lg p-4 h-80 overflow-visible" style={{ backgroundImage: `url('/Level_1_1490 copy.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

              {/* Venue Markers */}
              {venues.map((venue) => (
                <button
                  key={venue.id}
                  onClick={() => setSelectedVenue(venue.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group relative ${
                    selectedVenue === venue.id ? "z-10" : "hover:scale-105"
                  }`}
                  style={{ left: `${venue.x}%`, top: `${venue.y}%` }}
                >
                  <div
                    className={`p-3 rounded-full shadow-lg ring-2 ring-white transition-all duration-300 ${
                      selectedVenue === venue.id
                        ? "bg-blue-600 text-white scale-125"
                        : "bg-white text-blue-600 hover:bg-gray-100 group-hover:shadow-xl"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span
                    className={`absolute z-50 top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded bg-white text-gray-800 shadow text-xs font-medium whitespace-nowrap pointer-events-none transition-opacity duration-300 ${
                      selectedVenue === venue.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {venue.name}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Venue Events */}
      {selectedVenue && (
        <div className="px-4 pb-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                {venues.find((v) => v.id === selectedVenue)?.name} - {selectedDay}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events[selectedVenue as keyof typeof events]?.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 flex-1">{event.title}</h3>
                    <Badge variant="secondary" className="ml-2">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees} attending
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 w-full">
                    Add to Schedule
                  </Button>
                </div>
              )) || (
                <div className="text-center py-8 text-gray-500">
                  No events scheduled for this venue on {selectedDay}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {!selectedVenue && (
        <div className="px-4 text-center py-8">
          <div className="text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Tap on a venue marker to see events</p>
          </div>
        </div>
      )}

      
    </div>
  )
}
