"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Send, 
  Users, 
  Calendar, 
  Bell, 
  Shield,
  Settings,
  CheckCircle,
  Clock,
  UserCheck,
  TrendingUp,
  Star
} from "lucide-react"
import Link from "next/link"

const events = [
  {
    id: 1,
    title: "The Future of AI in Design",
    speaker: "Sarah Chen, Meta",
    date: "Nov 15",
    time: "9:00 AM",
    location: "Main Hall",
    registered: 487,
    capacity: 500,
    status: "Active",
  },
  {
    id: 2,
    title: "Prototyping with Figma Variables",
    speaker: "Alex Rodriguez, Adobe",
    date: "Nov 15",
    time: "11:00 AM",
    location: "Workshop A",
    registered: 78,
    capacity: 80,
    status: "Almost Full",
  },
]

const recentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@company.com",
    status: "pending",
  },
]

export default function AdminPage() {
  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")

  const handleSendNotification = () => {
    if (notificationTitle.trim() && notificationMessage.trim()) {
      // Handle notification sending logic here
      console.log("Sending notification:", { title: notificationTitle, message: notificationMessage })
      setNotificationTitle("")
      setNotificationMessage("")
    }
  }

  const handleApproveUser = (userId: number) => {
    console.log("Approving user:", userId)
  }

  const handleBlockUser = (userId: number) => {
    console.log("Blocking user:", userId)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <Link href="/messages">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-10">
        <Card className="bg-gray-800 border-gray-700 flex flex-col items-center justify-center text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-white mb-2">2,847</div>
            <div className="text-gray-400 text-sm">Active Users</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 flex flex-col items-center justify-center text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-white mb-2">156</div>
            <div className="text-gray-400 text-sm">Events Scheduled</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 flex flex-col items-center justify-center text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-white mb-2">1,423</div>
            <div className="text-gray-400 text-sm">Connections Made</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 flex flex-col items-center justify-center text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-white mb-2">89%</div>
            <div className="text-gray-400 text-sm">Satisfaction Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Event Management */}
      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl">Event Management</CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{event.title}</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-blue-400 hover:bg-gray-600">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:bg-gray-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-gray-300 text-sm mb-2">
                  {event.date}, {event.time} • {event.location}
                </div>
                <div className="text-gray-300 text-sm mb-2">
                  Speaker: {event.speaker}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-green-400 font-medium">{event.registered} Registered</span>
                    <span className="text-gray-400 ml-4">Capacity: {event.capacity}</span>
                  </div>
                  <Badge variant={event.status === "Almost Full" ? "destructive" : "default"} className="text-xs">
                    {event.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl">User Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-gray-300 font-medium">Recent Registrations</h4>
              <Button variant="ghost" className="text-blue-400 text-sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gray-600 text-white text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white text-sm font-medium">{user.name}</div>
                      <div className="text-gray-400 text-xs">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-xs px-3 py-1"
                      onClick={() => handleApproveUser(user.id)}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      className="text-xs px-3 py-1"
                      onClick={() => handleBlockUser(user.id)}
                    >
                      Block
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Send Notification */}
      <Card className="bg-gray-800 border-gray-700 flex flex-col items-center justify-center text-center">
        <CardHeader>
          <CardTitle className="text-white text-xl">Send Notification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="notificationTitle" className="text-gray-300 text-sm">
                Notification Title
              </Label>
              <Input
                id="notificationTitle"
                placeholder="e.g., Don't miss today's keynote!"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="notificationMessage" className="text-gray-300 text-sm">
                Message
              </Label>
              <Textarea
                id="notificationMessage"
                placeholder="Enter your message here..."
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-1 min-h-[100px]"
              />
            </div>
            <Button 
              onClick={handleSendNotification} 
              disabled={!notificationTitle.trim() || !notificationMessage.trim()}
              className="bg-red-600 hover:bg-red-700 w-full"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
