"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Filter, Clock, MapPin, Users, Star, MessageCircle } from "lucide-react"
import Link from "next/link"

const allEvents = [
  {
    id: 1,
    title: "Keynote: The Future of Design Systems",
    speaker: "Andrew Ng",
    company: "DeepLearning.AI",
    image: "/Andrew Ng.jpeg",
    time: "09:00 - 10:00",
    day: "Day 1",
    location: "Main Auditorium",
    type: "Keynote",
    industry: "Tech",
    level: "All Levels",
    duration: 60,
    attendees: 850,
    rating: 4.9,
    description: "Exploring how AI and automation will reshape design systems in the next decade.",
  },
  {
    id: 2,
    title: "Hands-on: Figma Advanced Techniques",
    speaker: "Grant Adam",
    company: "Apple",
    image: "/Grant-Adam.png",
    time: "10:30 - 12:00",
    day: "Day 1",
    location: "Workshop Room A",
    type: "Workshop",
    industry: "Design",
    level: "Intermediate",
    duration: 90,
    attendees: 120,
    rating: 4.8,
    description: "Master advanced prototyping and component creation in Figma.",
  },
  {
    id: 3,
    title: "Data Visualization Best Practices",
    speaker: "Golden Krishna",
    company: "Google",
    image: "/GoldenKrishna.png",
    time: "11:00 - 12:30",
    day: "Day 1",
    location: "Workshop Room B",
    type: "Workshop",
    industry: "Data",
    level: "Beginner",
    duration: 90,
    attendees: 110,
    rating: 4.7,
    description: "Learn to create compelling and accessible data visualizations.",
  },
  {
    id: 4,
    title: "Speed Networking Session",
    speaker: "Julie Zhuo",
    company: "Sundial",
    image: "/Julie_Zhuo.jpg",
    time: "12:30 - 13:30",
    day: "Day 1",
    location: "Networking Lounge",
    type: "Networking",
    industry: "All",
    level: "All Levels",
    duration: 60,
    attendees: 250,
    rating: 4.6,
    description: "Connect with professionals across UI/UX, Product, and Data fields.",
  },
  {
    id: 5,
    title: "AI in Product Design Panel",
    speaker: "Panel Discussion",
    company: "Various",
    time: "14:00 - 15:30",
    day: "Day 1",
    location: "Main Auditorium",
    type: "Panel",
    industry: "Product",
    level: "Intermediate",
    duration: 90,
    attendees: 720,
    rating: 4.8,
    description: "Industry leaders discuss the impact of AI on product design workflows.",
  },
  {
    id: 6,
    title: "User Research Methodologies",
    speaker: "Alex Kim",
    company: "Airbnb",
    time: "15:45 - 17:00",
    day: "Day 1",
    location: "Workshop Room A",
    type: "Workshop",
    industry: "UX",
    level: "Intermediate",
    duration: 75,
    attendees: 95,
    rating: 4.9,
    description: "Modern approaches to user research in agile environments.",
  },
]

const filterOptions = {
  type: ["All", "Keynote", "Workshop", "Panel", "Networking"],
  industry: ["All", "Tech", "Design", "Data", "Product", "UX"],
  level: ["All", "Beginner", "Intermediate", "Advanced", "All Levels"],
  day: ["All", "Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
}

const speakers = [
  {
    id: 1,
    name: "Andrew Ng",
    position: "Co-founder",
    department: "",
    organization: "DeepLearning.AI",
    photo: "/Andrew Ng.jpeg",
    country: "Peru",
    sessions: 2,
    expertise: ["Machine Learning", "AI", "Deep Learning", "Online Education"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Adam Grant",
    position: "Organizational Psychologist", 
    organization: "Wharton School",
    photo: "/Grant-Adam.png",
    country: "United States",
    sessions: 1,
    expertise: ["Organizational Psychology", "Motivation", "Generosity", "Original Thinking"],
    rating: 4.7
  },
  {
    id: 3,
    name: "Golden Krishna",
    position: "Product Design Lead",
    organization: "Google",
    photo: "/GoldenKrishna.png",
    country: "United States",
    sessions: 3,
    expertise: ["Design Thinking", "User Experience", "Collaborative Methods"],
    rating: 4.9
  },
  {
    id: 4,
    name: "Julie Zhuo",
    position: "Co-founder",
    organization: "Sundial",
    photo: "/Julie_Zhuo.jpg",
    country: "United States",
    sessions: 2,
    expertise: ["Product Design", "Management", "Leadership", "Systems Thinking"],
    rating: 4.6
  },
];

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"events" | "speakers">("events");
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "All",
    industry: "All",
    level: "All",
    day: "All",
  })

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filters.type === "All" || event.type === filters.type
    const matchesIndustry = filters.industry === "All" || event.industry === filters.industry
    const matchesLevel = filters.level === "All" || event.level === filters.level
    const matchesDay = filters.day === "All" || event.day === filters.day

    return matchesSearch && matchesType && matchesIndustry && matchesLevel && matchesDay
  })

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
          <h1 className="text-lg font-semibold">All Events</h1>
          <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "events" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("events")}
            className="flex-1"
          >
            Events View
          </Button>
          <Button
            variant={viewMode === "speakers" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("speakers")}
            className="flex-1"
          >
            Speaker View
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events, speakers, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

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

      {/* Results Count - Events View Only */}
      {viewMode === 'events' && (
        <div className="px-4 py-3 bg-gray-50">
          <p className="text-sm text-gray-600">{filteredEvents.length} events found</p>
        </div>
      )}

      {/* Speaker List */}
      {viewMode === 'speakers' && (
        <div className="px-4 space-y-4 pb-4">
          <div className="text-sm text-gray-600 mb-2">{speakers.length} speakers</div>
          {speakers.map((speaker) => (
            <Card key={speaker.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Speaker Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md">
                      <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  {/* Speaker Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{speaker.name}</h3>
                        <p className="text-sm text-gray-700 font-medium">{speaker.position}</p>
                        <p className="text-sm text-gray-600">{speaker.organization}</p>
                        
                        {speaker.department && (
                          <p className="text-xs text-gray-500 mt-1 italic">{speaker.department}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 h-fit">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      </div>
                    </div>
                    
                    {/* Tags/Expertise */}
                    <div className="flex flex-wrap gap-2 mt-3 mb-3">
                      {speaker.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-end mt-4">
                      <div className="flex space-x-2">
                        <Link href={`/messages`}>
                          <Button size="sm" variant="outline" className="h-8 px-3">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            <span className="text-xs">Message</span>
                          </Button>
                        </Link>
                        <Button size="sm" className="h-8 px-3">
                          <span className="text-xs">View Sessions</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Events List */}
      <div className="px-4 space-y-4 pb-4">
        {viewMode === 'events' && filteredEvents.map((event) => (
          <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600">
                    {event.speaker} • {event.company}
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{event.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{event.type}</Badge>
                <Badge variant="outline">{event.industry}</Badge>
                <Badge variant="outline">{event.level}</Badge>
                <Badge variant="outline">{event.day}</Badge>
              </div>

              <div className="flex items-center text-sm text-gray-600 space-x-4 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {event.attendees}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1">Add to Schedule</Button>
                <Button variant="outline">Share</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {viewMode === 'events' && filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      
    </div>
  )
}
