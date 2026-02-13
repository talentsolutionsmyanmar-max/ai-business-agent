'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  Bell,
  Search,
  MessageSquare,
  Calendar,
  ChevronDown,
  Settings,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onNavigate?: (module: string) => void;
}

// User profile - can be customized
const userProfile = {
  name: 'Tommy Burman',
  email: 'tommy@talentsolutionsmm.com',
  role: 'Owner',
  company: 'Talent Solutions Myanmar',
  initials: 'TB',
  avatar: ''
};

export function Header({ title, subtitle, onNavigate }: HeaderProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // In a real app, this would search across candidates, clients, jobs
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <header className="h-16 border-b border-[oklch(0.25_0.03_280)] bg-[oklch(0.1_0.015_280)]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Section - Title */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search candidates, clients, jobs..."
            className="pl-10 bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] focus:border-purple-500/50 text-white placeholder:text-muted-foreground"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-[oklch(0.3_0.03_280)] bg-[oklch(0.2_0.02_280)] px-1.5 py-0.5 text-xs text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Section - Actions & User */}
      <div className="flex items-center gap-3">
        {/* Quick Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)] hover:bg-[oklch(0.2_0.03_280)]"
            title="Calendar"
          >
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)] hover:bg-[oklch(0.2_0.03_280)]"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-purple-500 text-[10px]">
              3
            </Badge>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)] hover:bg-[oklch(0.2_0.03_280)]"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
        </div>

        {/* AI Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-medium text-purple-300">AI Active</span>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-[oklch(0.25_0.03_280)] mx-1" />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 hover:bg-[oklch(0.18_0.03_280)]"
            >
              <Avatar className="w-8 h-8 border-2 border-purple-500/50">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-sm">
                  {userProfile.initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden xl:block text-left">
                <p className="text-sm font-medium text-white">{userProfile.name}</p>
                <p className="text-xs text-muted-foreground">{userProfile.role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
            <DropdownMenuLabel className="text-white">
              <div className="flex flex-col">
                <span>{userProfile.name}</span>
                <span className="text-xs font-normal text-muted-foreground">{userProfile.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[oklch(0.25_0.03_280)]" />
            <DropdownMenuItem 
              className="text-muted-foreground hover:text-white focus:text-white cursor-pointer"
              onClick={() => onNavigate?.('settings')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-muted-foreground hover:text-white focus:text-white cursor-pointer">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem className="text-muted-foreground hover:text-white focus:text-white cursor-pointer">
              <Zap className="w-4 h-4 mr-2" />
              API Configuration
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[oklch(0.25_0.03_280)]" />
            <DropdownMenuItem 
              className="text-red-400 focus:text-red-400 cursor-pointer"
              onClick={() => alert('You have been signed out. Refresh the page to continue.')}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
