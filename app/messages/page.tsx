"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  Search, 
  MoreVertical, 
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  CheckCircle,
  BadgeCheck,
  MessageSquare,
  Settings,
  Shield,

  Plus,
  Sparkles,
  Zap,
  Coffee,
  Briefcase,
  TrendingUp,
  Smile,
  RotateCcw,

} from "lucide-react"
import Link from "next/link"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

const conversations = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Design Systems Lead @ Google",
    lastMessage: "Just finished my keynote! Thanks for the great questions 🙌",
    timestamp: "2m ago",
    unread: true,
    avatar: "/avatar-female1.jpg",
    online: true,
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Data Scientist @ Netflix",
    lastMessage: "The ML workshop was incredible! Here's that Python snippet I mentioned",
    timestamp: "12m ago",
    unread: false,
    avatar: "/avatar-male1.jpg",
    online: true,
    verified: false,
  },
  {
    id: 3,
    name: "HireWire AI Assistant",
    role: "Your Personal Conference Assistant",
    lastMessage: "📅 I've added 3 sessions to your schedule! Want to see what's next?",
    timestamp: "15m ago",
    unread: true,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI&backgroundColor=c0aede",
    isBot: true,
    online: true,
  },
  {
    id: 4,
    name: "Emily Watson",
    role: "Engineering Manager @ Stripe",
    lastMessage: "Would love to discuss the open positions we have. Coffee tomorrow?",
    timestamp: "1h ago",
    unread: false,
    avatar: "/avatar-female2.jpg",
    online: false,
    verified: true,
  },
  {
    id: 5,
    name: "Alex Thompson",
    role: "Startup Founder @ TechFlow",
    lastMessage: "The pitch session was amazing! Let's connect on that collaboration idea",
    timestamp: "3h ago",
    unread: true,
    avatar: "/avatar-male2.jpg",
    online: true,
    verified: false,
  },
  {
    id: 6,
    name: "Dr. Lisa Park",
    role: "AI Research Director @ Stanford",
    lastMessage: "Fascinating presentation on neural networks! Here are those research papers",
    timestamp: "5h ago",
    unread: false,
    avatar: "/avatar-female3.jpg",
    online: false,
    verified: true,
  },
]

const chatMessagesData = {
  1: [ // Sarah Chen - Design Systems conversation
    {
      id: 1,
      sender: "other",
      message: "Hey! I saw you attended my keynote this morning. Thanks for the thoughtful question about design tokens!",
      timestamp: "9:45 AM",
      type: "text"
    },
    {
      id: 2,
      sender: "user",
      message: "It was incredible! Your approach to scalable design systems really resonated with our team's challenges.",
      timestamp: "9:47 AM",
      type: "text"
    },
    {
      id: 3,
      sender: "other",
      message: "I'd love to hear more about what you're working on. Are you free for a quick coffee chat during the break?",
      timestamp: "9:48 AM",
      type: "text"
    },
    {
      id: 4,
      sender: "user",
      message: "Absolutely! I'll be at the networking lounge around 11 AM",
      timestamp: "9:50 AM",
      type: "text"
    },
    {
      id: 5,
      sender: "other",
      message: "Perfect! Just finished my keynote. Thanks for the great questions during the Q&A 🙌",
      timestamp: "11:02 AM",
      type: "text"
    }
  ],
  2: [ // Marcus Rodriguez - Data Science conversation
    {
      id: 1,
      sender: "other",
      message: "The ML workshop was incredible! Here's that Python snippet I mentioned for data preprocessing:",
      timestamp: "2:15 PM",
      type: "text"
    },

    {
      id: 3,
      sender: "user",
      message: "This is exactly what we needed! How do you handle missing values in your pipeline?",
      timestamp: "2:18 PM",
      type: "text"
    },
    {
      id: 4,
      sender: "other",
      message: "Great question! We use a combination of imputation strategies depending on the data type. For numerical data, we typically use median imputation, and for categorical, mode imputation.",
      timestamp: "2:20 PM",
      type: "text"
    },
    {
      id: 5,
      sender: "user",
      message: "That makes sense. Do you have any recommendations for handling imbalanced datasets?",
      timestamp: "2:22 PM",
      type: "text"
    },
    {
      id: 6,
      sender: "other",
      message: "Definitely! SMOTE is our go-to for oversampling, but we also experiment with cost-sensitive learning. The Netflix case study I mentioned covers this in detail.",
      timestamp: "2:25 PM",
      type: "text"
    }
  ],
  3: [ // AI Assistant conversation
    {
      id: 1,
      sender: "bot",
      message: "Hi there! 👋 I'm your HireWire AI assistant. I can help you discover events, connect with people, optimize your schedule, and make the most of your conference experience!",
      timestamp: "8:00 AM",
      type: "text"
    },
    {
      id: 2,
      sender: "user",
      message: "What sessions would you recommend for someone interested in AI and machine learning?",
      timestamp: "8:05 AM",
      type: "text"
    },
    {
      id: 3,
      sender: "bot",
      message: "Perfect! Based on your profile and interests, here are my top recommendations:",
      timestamp: "8:05 AM",
      type: "text"
    },
    {
      id: 4,
      sender: "bot",
      message: "",
      timestamp: "8:05 AM",
      type: "schedule_card",
      scheduleData: {
        title: "AI & ML Recommendations",
        events: [
          {
            id: 1,
            title: "Future of Neural Networks",
            speaker: "Dr. Lisa Park - Stanford",
            time: "Today 10:00 AM - 11:00 AM",
            location: "Main Auditorium",
            type: "Keynote",
            difficulty: "Advanced"
          },
          {
            id: 2,
            title: "Hands-on: Building LLMs",
            speaker: "Alex Chen - OpenAI",
            time: "Today 2:00 PM - 4:00 PM",
            location: "Workshop Room A",
            type: "Workshop",
            difficulty: "Intermediate"
          },
          {
            id: 3,
            title: "AI Ethics in Practice",
            speaker: "Multiple Speakers",
            time: "Tomorrow 11:00 AM - 12:00 PM",
            location: "Conference Room B",
            type: "Panel",
            difficulty: "Beginner"
          }
        ]
      }
    },
    {
      id: 5,
      sender: "user",
      message: "These look perfect! Can you add the first two to my schedule?",
      timestamp: "8:08 AM",
      type: "text"
    },
    {
      id: 6,
      sender: "bot",
      message: "Excellent choice! ✅ I've added both sessions to your schedule:\n\n📅 **Future of Neural Networks** - Today 10:00 AM\n📅 **Hands-on: Building LLMs** - Today 2:00 PM\n\nI've also blocked 30 minutes before each session for preparation and networking. Would you like me to suggest some relevant attendees to connect with?",
      timestamp: "8:08 AM",
      type: "text"
    },
    {
      id: 7,
      sender: "user",
      message: "Yes, that would be great! Also, are there any networking events today?",
      timestamp: "8:12 AM",
      type: "text"
    },
    {
      id: 8,
      sender: "bot",
      message: "Perfect! Here are today's networking opportunities:",
      timestamp: "8:12 AM",
      type: "text"
    },
    {
      id: 9,
      sender: "bot",
      message: "",
      timestamp: "8:12 AM",
      type: "networking_card",
      networkingData: {
        events: [
          {
            title: "AI Researchers Meetup",
            time: "12:30 PM - 1:30 PM",
            location: "Networking Lounge A",
            attendees: 24,
            description: "Connect with ML researchers and practitioners"
          },
          {
            title: "Tech Startup Mixer",
            time: "6:00 PM - 8:00 PM",
            location: "Rooftop Terrace",
            attendees: 45,
            description: "Founders, VCs, and early-stage employees"
          }
        ]
      }
    },
    {
      id: 10,
      sender: "user",
      message: "Add the AI Researchers Meetup to my schedule too please!",
      timestamp: "8:15 AM",
      type: "text"
    },
    {
      id: 11,
      sender: "bot",
      message: "Done! 🎉 I've added the AI Researchers Meetup to your schedule.\n\n📅 **Your Updated Schedule:**\n• 10:00 AM - Neural Networks Keynote\n• 12:30 PM - AI Researchers Meetup\n• 2:00 PM - LLM Workshop\n\nI'll send you reminders 15 minutes before each event. Have an amazing day at the conference! ✨",
      timestamp: "8:15 AM",
      type: "text"
    },
    {
      id: 12,
      sender: "user",
      message: "I'm looking for a good place to grab dinner near the conference center.",
      timestamp: "9:00 AM",
      type: "text"
    },
    {
      id: 13,
      sender: "bot",
      message: "Of course! Chicago has amazing food. What kind of cuisine are you in the mood for?",
      timestamp: "9:01 AM",
      type: "text"
    },
    {
      id: 14,
      sender: "user",
      message: "Something casual, maybe Italian or American.",
      timestamp: "9:02 AM",
      type: "text"
    },
    {
      id: 15,
      sender: "bot",
      message: "Great choices! Here are a few highly-rated spots within a 15-minute walk:\n\n- **Giordano's** (Deep Dish Pizza) - Iconic Chicago-style pizza. Very popular, so expect a wait!\n- **The Purple Pig** (American) - Adventurous small plates and great wine list.\n- **Quartino Ristorante** (Italian) - Bustling spot with authentic Italian small plates, perfect for sharing.\n\nWould you like me to make a reservation or provide directions?",
      timestamp: "9:03 AM",
      type: "text"
    },
    {
      id: 16,
      sender: "user",
      message: "What windows of free time do I have in my schedule today?",
      timestamp: "9:30 AM",
      type: "text"
    },
    {
      id: 17,
      sender: "bot",
      message: "Let me check your schedule... It looks like you have two main windows of free time today:\n\n- **11:00 AM - 12:30 PM** (1.5 hours) - Between the 'Future of Neural Networks' keynote and the 'AI Researchers Meetup'.\n- **4:00 PM - 6:00 PM** (2 hours) - After the 'Hands-on: Building LLMs' workshop.\n\nWould you like me to find some interesting people to meet or suggest a short activity during these times?",
      timestamp: "9:31 AM",
      type: "text"
    }
  ],
  4: [ // Emily Watson - Recruiting conversation
    {
      id: 1,
      sender: "other",
      message: "Hi! I noticed your background in full-stack development. We have some exciting opportunities at Stripe that might interest you.",
      timestamp: "Yesterday 4:30 PM",
      type: "text"
    },
    {
      id: 2,
      sender: "user",
      message: "Thanks for reaching out! I'd love to learn more about the roles you have available.",
      timestamp: "Yesterday 4:45 PM",
      type: "text"
    },
    {
      id: 3,
      sender: "other",
      message: "We're looking for Senior Full-Stack Engineers to work on our payments infrastructure. The role involves React, Node.js, and working with financial systems at scale.",
      timestamp: "Yesterday 4:50 PM",
      type: "text"
    },
    {
      id: 4,
      sender: "user",
      message: "That sounds exactly like what I'm looking for! I have 5 years of experience with React and Node, plus experience with payment systems from my current role.",
      timestamp: "Yesterday 5:00 PM",
      type: "text"
    },
    {
      id: 5,
      sender: "other",
      message: "Perfect! Would love to discuss this further. Are you free for coffee tomorrow morning? I can share more details about the team and our technical challenges.",
      timestamp: "Yesterday 5:05 PM",
      type: "text"
    },
    {
      id: 6,
      sender: "user",
      message: "Absolutely! How about 9 AM at the conference coffee shop?",
      timestamp: "Yesterday 5:10 PM",
      type: "text"
    },
    {
      id: 7,
      sender: "other",
      message: "Would love to discuss the open positions we have. Coffee tomorrow?",
      timestamp: "10:30 AM",
      type: "text"
    }
  ],
  5: [ // Alex Thompson - Startup Collaboration
    {
      id: 1,
      sender: "user",
      message: "Great pitch today, Alex! Your vision for TechFlow is really compelling.",
      timestamp: "11:30 AM",
      type: "text"
    },
    {
      id: 2,
      sender: "other",
      message: "Thanks so much! I'm glad it resonated. I was really impressed with your questions during the Q&A.",
      timestamp: "11:32 AM",
      type: "text"
    },
    {
      id: 3,
      sender: "user",
      message: "I see a lot of potential for synergy with what my team is working on. We should definitely explore a collaboration.",
      timestamp: "11:35 AM",
      type: "text"
    },
    {
      id: 4,
      sender: "other",
      message: "I agree. The pitch session was amazing! Let's connect on that collaboration idea. Are you free to grab a coffee tomorrow to dive deeper?",
      timestamp: "11:40 AM",
      type: "text"
    }
  ],
  6: [ // Dr. Lisa Park - AI Research
    {
      id: 1,
      sender: "user",
      message: "Dr. Park, your presentation on generative adversarial networks was fantastic. Truly insightful.",
      timestamp: "9:15 AM",
      type: "text"
    },
    {
      id: 2,
      sender: "other",
      message: "Thank you, I'm glad you enjoyed it. It's a topic I'm very passionate about.",
      timestamp: "9:17 AM",
      type: "text"
    },
    {
      id: 3,
      sender: "user",
      message: "You mentioned a few research papers during the talk. Would it be possible to get the links to those?",
      timestamp: "9:20 AM",
      type: "text"
    },
    {
      id: 4,
      sender: "other",
      message: "Fascinating presentation on neural networks! Here are those research papers I mentioned:\n\n- **Generative Adversarial Nets** (Goodfellow et al., 2014)\n- **Unsupervised Representation Learning with DCGANs** (Radford et al., 2015)\n\nHappy reading! Let me know if you have any questions.",
      timestamp: "9:25 AM",
      type: "text"
    }
  ]
}

const ScheduleCard = ({ scheduleData, onAddEvent, addedEvents }: any) => (
  <Card className="overflow-hidden bg-white border-gray-200 shadow-sm">
    <div className="p-4 bg-gray-50 border-b">
      <div className="flex items-center">
        <Calendar className="w-5 h-5 mr-3 text-blue-600" />
        <h3 className="font-semibold text-gray-800">{scheduleData.title}</h3>
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {scheduleData.events.map((event: any) => (
        <div key={event.id} className="p-4">
          <h4 className="font-semibold text-gray-900">{event.title}</h4>
          <p className="text-sm text-gray-500 mt-1">{event.speaker}</p>
          <div className="flex items-center text-xs text-gray-500 mt-2 space-x-4">
            <div className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {event.time}</div>
            <div className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {event.location}</div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{event.type}</Badge>
              <Badge variant={event.difficulty === 'Advanced' ? 'destructive' : event.difficulty === 'Intermediate' ? 'secondary' : 'outline'}>{event.difficulty}</Badge>
            </div>
            <Button 
              size="sm" 
              onClick={() => onAddEvent(event.id)}
              disabled={addedEvents.includes(event.id)}
              className={`transition-all shadow-md hover:shadow-lg ${addedEvents.includes(event.id) ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              {addedEvents.includes(event.id) ? <CheckCircle className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              {addedEvents.includes(event.id) ? 'Added' : 'Add'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const NetworkingCard = ({ networkingData }: any) => (
  <Card className="overflow-hidden bg-white border-gray-200 shadow-sm">
     <div className="p-4 bg-gray-50 border-b">
      <div className="flex items-center">
        <Users className="w-5 h-5 mr-3 text-purple-600" />
        <h3 className="font-semibold text-gray-800">Networking Opportunities</h3>
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {networkingData.events.map((event: any, index: number) => (
        <div key={index} className="p-4">
          <h4 className="font-semibold text-gray-900">{event.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
          <div className="flex items-center text-xs text-gray-500 mt-2 space-x-4">
            <div className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {event.time}</div>
            <div className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {event.location}</div>
            <div className="flex items-center"><Users className="w-3 h-3 mr-1" /> {event.attendees}+ attending</div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const codeContent = code.replace(/```python\n|```/g, '').trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden my-2">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900 text-xs text-gray-400">
        <span>python</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-white hover:bg-gray-700">
          {copied ? 'Copied!' : 'Copy code'}
        </Button>
      </div>
      <pre className="p-4 text-sm text-white overflow-x-auto"><code>{codeContent}</code></pre>
    </div>
  );
};

const iceBreakers = [
  "What inspired you to attend this conference?",
  "Which session has been the most insightful for you so far?",
  "Working on any exciting projects right now?",
  "What are you hoping to learn or accomplish here?",
  "Have you discovered any great new tools recently?"
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("")
  const [iceBreakerIndex, setIceBreakerIndex] = useState(0);
  const searchParams = useSearchParams();
  const [addedEvents, setAddedEvents] = useState<number[]>([]);
  const [messageReactions, setMessageReactions] = useState<Record<number, string[]>>({});
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.get('chat') === 'ai') {
      setSelectedChat(3);
    }
  }, [searchParams, setSelectedChat]);

  // Scroll the chat view to the bottom when a chat is opened
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedChat]);

  // Ensure the page scroll position resets to the top when navigating back to the conversations list
  useEffect(() => {
    if (selectedChat === null) {
      // Using a timeout to wait for the list view to render before scrolling
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }
      }, 0);
    }
  }, [selectedChat]);

  const handleAddEvent = (eventId: number) => {
    setAddedEvents(prev => [...prev, eventId]);
  };

  const addReaction = (messageId: number, emoji: string) => {
    setMessageReactions((prev) => {
      const existing = prev[messageId] || [];
      if (existing.includes(emoji)) return prev;
      return { ...prev, [messageId]: [...existing, emoji] };
    });
  };

  const cycleIceBreaker = () => {
    setIceBreakerIndex((prev) => (prev + 1) % iceBreakers.length);
  };

  const insertIceBreaker = () => {
    setNewMessage(iceBreakers[iceBreakerIndex]);
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  if (selectedChat) {
    const conversation = conversations.find((c) => c.id === selectedChat);
    const chatMessages = chatMessagesData[selectedChat as keyof typeof chatMessagesData] || [];

    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => setSelectedChat(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            {conversation?.id === 3 ? (
              <div className="w-10 h-10 mr-3 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            ) : (
              <Avatar className="w-10 h-10 mr-3">
                <AvatarImage src={conversation?.avatar} alt={conversation?.name} />
                <AvatarFallback>{conversation?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <h2 className="font-semibold text-gray-900">{conversation?.name}</h2>
              <p className={`text-xs ${conversation?.online ? 'text-green-600' : 'text-gray-500'}`}>
                {conversation?.online ? 'Online now' : `Online ${conversation?.timestamp}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
          </div>
        </div>

        {/* Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {chatMessages.map((message: any) => (
            <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'bot' ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              ) : message.sender === 'other' && (
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage src={conversation?.avatar} alt={conversation?.name} />
                  <AvatarFallback>{conversation?.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-md lg:max-w-lg rounded-2xl px-4 py-2.5 ${ 
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-lg'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-lg'
                }`}>
                {message.sender === 'bot' && (
                  <div className="flex items-center mb-1">
                    <Sparkles className="w-4 h-4 mr-1.5 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">AI Assistant</span>
                  </div>
                )}
                 {message.type === 'text' && <p className="text-sm whitespace-pre-wrap">{message.message}</p>}
                 {message.type === 'code' && <CodeBlock code={message.message} />}
                 {message.type === 'schedule_card' && <ScheduleCard scheduleData={message.scheduleData} onAddEvent={handleAddEvent} addedEvents={addedEvents} />}
                 {message.type === 'networking_card' && <NetworkingCard networkingData={message.networkingData} />}
                <p className={`text-xs mt-1.5 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {message.timestamp}
                </p>
                {/* Reactions & Picker */}
                <div className="flex items-center mt-1 space-x-1">
                  {messageReactions[message.id]?.map((emoji) => (
                    <span key={emoji} className="text-sm">{emoji}</span>
                  ))}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-6 h-6 p-0">
                        <Smile className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-1" align="start">
                      {["👍","🎉","😂","❤️","👏"].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => addReaction(message.id, emoji)}
                          className="text-xl p-1 hover:bg-gray-100 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ice-breaker (only for non-AI chats) */}
        {!conversation?.isBot && (
          <div className="px-4 py-2">
            <div
              onClick={insertIceBreaker}
              className="inline-flex items-center bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-full px-3 py-1 cursor-pointer transition-colors"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              {iceBreakers[iceBreakerIndex]}
              <Button
                variant="ghost"
                size="icon"
                className="p-0 w-6 h-6 ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  cycleIceBreaker();
                }}
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 shrink-0">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon"><Plus className="w-5 h-5" /></Button>
            <Input
              placeholder={conversation?.isBot ? 'Ask the AI anything...' : 'Type a message...'}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-gray-100 border-transparent focus:ring-blue-500 focus:border-blue-500 rounded-full px-4"
            />
            <Button onClick={sendMessage} disabled={!newMessage.trim()} className="bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-6 h-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1" align="end">
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search people or messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100 border-transparent rounded-full"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="divide-y divide-gray-100">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setSelectedChat(conversation.id)}
            className="bg-white hover:bg-gray-50 px-4 py-3 cursor-pointer transition-colors flex items-center space-x-4"
          >
            <div className="relative">
              {conversation.isBot ? (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
              ) : (
                <Avatar className="w-14 h-14">
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              {conversation.online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 truncate flex items-center">
                  {conversation.name}
                  {conversation.isBot && <Bot className="w-4 h-4 ml-2 text-green-600" />}
                  {conversation.verified && <BadgeCheck className="w-4 h-4 ml-2 text-blue-500" />}
                </h3>
                <span className={`text-xs ${conversation.unread ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>{conversation.timestamp}</span>
              </div>
              <p className={`text-sm truncate ${conversation.unread ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>
                {conversation.lastMessage}
              </p>
            </div>
            {conversation.unread && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full self-center"></div>}
          </div>
        ))}
      </div>



      
    </div>
  );
}
