"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Camera, Save, User, Briefcase, Heart, Linkedin, Github } from "lucide-react"
import Link from "next/link"

const interestOptions = [
  "Design Systems",
  "AI/ML",
  "Accessibility",
  "User Research",
  "Data Visualization",
  "Product Strategy",
  "Frontend Development",
  "Backend Development",
  "Mobile Design",
  "Prototyping",
  "Animation",
  "Typography",
  "Color Theory",
  "Information Architecture",
  "Usability Testing",
  "A/B Testing",
  "Analytics",
  "Machine Learning",
  "Python",
  "JavaScript",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "GraphQL",
  "APIs",
]

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    displayName: "First Name + Last Initial",
    title: "Senior UX Designer",
    company: "TechCorp",
    location: "San Francisco, CA",
    country: "USA",
    bio: "Passionate about creating user-centered designs that solve real problems. Love exploring the intersection of psychology and technology.",
    interests: ["Design Systems", "User Research", "Accessibility"],
    lookingForJob: true,
    appearInSearch: true,
    allowMessages: true,
    role: "Job Seeker",
    linkedin: "",
    github: "",
  })

  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile.interests)

  const updateProfile = (field: string, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest)
      } else if (prev.length < 5) {
        return [...prev, interest]
      }
      return prev
    })
  }

  const saveProfile = () => {
    const updatedProfile = { ...profile, interests: selectedInterests }
    console.log("Saving profile:", updatedProfile)
    // Here you would typically save to a backend
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Edit Profile</h1>
          <Button onClick={saveProfile} size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Photo */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Photo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <img
                src="/placeholder.svg?height=80&width=80"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <Button variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => updateProfile("firstName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => updateProfile("lastName", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="displayName">Display Name Format</Label>
              <select
                id="displayName"
                value={profile.displayName}
                onChange={(e) => updateProfile("displayName", e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="First Name + Last Initial">First Name + Last Initial</option>
                <option value="Full Name">Full Name</option>
                <option value="First Name Only">First Name Only</option>
              </select>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => updateProfile("bio", e.target.value)}
                placeholder="Tell others about yourself..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" value={profile.title} onChange={(e) => updateProfile("title", e.target.value)} />
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={profile.company} onChange={(e) => updateProfile("company", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => updateProfile("location", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={profile.country}
                  onChange={(e) => updateProfile("country", e.target.value)}
                />
              </div>
            </div>

            {/* LinkedIn URL */}
            <div>
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="pl-10"
                  value={profile.linkedin || ""}
                  onChange={(e) => updateProfile("linkedin", e.target.value)}
                />
              </div>
            </div>

            {/* GitHub URL */}
            <div>
              <Label htmlFor="github">GitHub Profile</Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="github"
                  placeholder="https://github.com/yourprofile"
                  className="pl-10"
                  value={profile.github || ""}
                  onChange={(e) => updateProfile("github", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Interests (Select up to 5)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <Button
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleInterest(interest)}
                  disabled={!selectedInterests.includes(interest) && selectedInterests.length >= 5}
                  className="text-xs h-7 px-3 rounded-full transition-all duration-200 hover:scale-105"
                >
                  {interest}
                </Button>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-gray-500">{selectedInterests.length}/5 selected</p>
              {selectedInterests.length >= 5 && (
                <p className="text-xs text-amber-600 font-medium">Maximum reached</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Privacy & Visibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="mr-4">
                <Label htmlFor="appearInSearch">Appear in Search</Label>
                <p className="text-sm text-gray-500">Allow others to find your profile. You must enable this setting to access the Network Tab.</p>
              </div>
              <Switch
                id="appearInSearch"
                checked={profile.appearInSearch}
                onCheckedChange={(checked) => updateProfile("appearInSearch", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="mr-4">
                <Label htmlFor="allowMessages">Allow Messages</Label>
                <p className="text-sm text-gray-500">Let others message you directly even if you have not matched.</p>
              </div>
              <Switch
                id="allowMessages"
                checked={profile.allowMessages}
                onCheckedChange={(checked) => updateProfile("allowMessages", checked)}
              />
            </div>


          </CardContent>
        </Card>

        {/* Role Selection */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  id="attendee"
                  className="text-blue-600"
                  type="radio"
                  value="Attendee"
                  checked={profile.role === "Attendee"}
                  onChange={(e) => updateProfile("role", e.target.value)}
                  name="role"
                />
                <Label htmlFor="attendee">Attendee</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="jobSeeker"
                  className="text-blue-600"
                  type="radio"
                  value="Job Seeker"
                  checked={profile.role === "Job Seeker"}
                  onChange={(e) => updateProfile("role", e.target.value)}
                  name="role"
                />
                <Label htmlFor="jobSeeker">Job Seeker</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="recruiter"
                  className="text-blue-600"
                  type="radio"
                  value="Recruiter"
                  checked={profile.role === "Recruiter"}
                  onChange={(e) => updateProfile("role", e.target.value)}
                  name="role"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={saveProfile} className="w-full h-12 text-lg">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </Button>
      </div>

      
    </div>
  )
}
