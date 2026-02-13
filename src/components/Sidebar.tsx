'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  Bot,
  Linkedin,
  Megaphone,
  Users,
  BarChart3,
  FileText,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { id: 'ai-command', label: 'AI Command Center', icon: Bot, color: 'from-purple-500 to-violet-600' },
  { id: 'linkedin', label: 'LinkedIn Manager', icon: Linkedin, color: 'from-blue-500 to-cyan-600' },
  { id: 'marketing', label: 'Marketing Hub', icon: Megaphone, color: 'from-pink-500 to-rose-600' },
  { id: 'recruitment', label: 'Recruitment CRM', icon: Users, color: 'from-green-500 to-emerald-600' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'from-orange-500 to-amber-600' },
  { id: 'content', label: 'Content Studio', icon: FileText, color: 'from-indigo-500 to-blue-600' },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'logout', label: 'Logout', icon: LogOut },
];

export function Sidebar({ activeModule, onModuleChange, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'flex flex-col h-screen bg-gradient-to-b from-[oklch(0.1_0.02_280)] to-[oklch(0.08_0.015_280)] border-r border-[oklch(0.25_0.03_280)] transition-all duration-300',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-[oklch(0.25_0.03_280)]">
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center w-full')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-white gradient-text">RecruitAI</span>
                <span className="text-xs text-muted-foreground">Business Agent</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeModule === item.id;
            const Icon = item.icon;
            
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onModuleChange(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative',
                      isActive
                        ? 'bg-gradient-to-r shadow-lg'
                        : 'hover:bg-[oklch(0.18_0.03_280)]',
                      isActive && item.color,
                      collapsed && 'justify-center'
                    )}
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                        isActive
                          ? 'bg-white/20'
                          : 'bg-[oklch(0.2_0.03_280)] group-hover:bg-[oklch(0.25_0.04_280)]'
                      )}
                    >
                      <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-muted-foreground')} />
                    </div>
                    {!collapsed && (
                      <span className={cn('text-sm font-medium', isActive ? 'text-white' : 'text-muted-foreground')}>
                        {item.label}
                      </span>
                    )}
                    {isActive && (
                      <div className="absolute right-2 w-1.5 h-8 bg-white/30 rounded-full" />
                    )}
                  </button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="bg-[oklch(0.2_0.03_280)] border-[oklch(0.3_0.04_280)]">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-[oklch(0.25_0.03_280)] space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-[oklch(0.18_0.03_280)]',
                      collapsed && 'justify-center'
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[oklch(0.2_0.03_280)] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    {!collapsed && (
                      <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                    )}
                  </button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="bg-[oklch(0.2_0.03_280)] border-[oklch(0.3_0.04_280)]">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}

          {/* Collapse Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[oklch(0.18_0.03_280)]',
                  collapsed && 'justify-center'
                )}
              >
                {collapsed ? (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <>
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Collapse</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-[oklch(0.2_0.03_280)] border-[oklch(0.3_0.04_280)]">
                <p>Expand Sidebar</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
