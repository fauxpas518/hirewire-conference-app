"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { MapPin, Calendar, Users, MessageCircle, User } from "lucide-react"

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

export function BottomNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { href: "/map", icon: MapPin, label: "Map" },
    { href: "/events", icon: Calendar, label: "Events" },
    { href: "/networking", icon: Users, label: "Network" },
    { href: "/messages", icon: MessageCircle, label: "Messages", badge: 3 },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 mb-1" />
                {item.badge && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
