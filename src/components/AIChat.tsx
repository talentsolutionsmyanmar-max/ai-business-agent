'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  Linkedin,
  Mail,
  FileText,
  BarChart3,
  Zap,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  onQuickAction?: (action: string) => void;
}

const quickActions = [
  { id: 'linkedin', label: 'LinkedIn Post', icon: Linkedin, prompt: 'Create a thought leadership LinkedIn post about the current state of recruitment' },
  { id: 'email', label: 'Email Template', icon: Mail, prompt: 'Create a professional follow-up email for a candidate after an interview' },
  { id: 'strategy', label: 'Marketing Strategy', icon: BarChart3, prompt: 'Suggest a marketing strategy for attracting tech talent in 2024' },
  { id: 'content', label: 'Content Ideas', icon: FileText, prompt: 'Generate 5 content ideas for our recruitment agency blog' },
];

const suggestions = [
  'How can I improve our LinkedIn engagement?',
  'What are the best interview questions for a senior developer role?',
  'Create a job description for a Product Manager',
  'Tips for reducing time-to-hire',
];

export function AIChat({ onQuickAction }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Business Agent, acting as your Chief Marketing Officer and Business Advisor. I specialize in recruitment industry marketing, LinkedIn strategy, and content creation. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    sendMessage(prompt);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[oklch(0.25_0.03_280)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white">AI Command Center</h2>
            <p className="text-sm text-muted-foreground">Your CMO & Business Advisor</p>
          </div>
          <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/20">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5" />
            Online
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-b border-[oklch(0.25_0.03_280)] bg-[oklch(0.1_0.02_280)]/50">
        <p className="text-xs text-muted-foreground mb-2">Quick Actions</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.prompt)}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] hover:bg-[oklch(0.2_0.03_280)] hover:border-purple-500/50 text-white"
              >
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600">
                  <AvatarFallback className="bg-transparent">
                    <Bot className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl p-4',
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                    : 'bg-[oklch(0.18_0.03_280)] border border-[oklch(0.25_0.03_280)]'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {message.role === 'assistant' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-60 hover:opacity-100"
                      onClick={() => copyToClipboard(message.content, message.id)}
                    >
                      {copiedId === message.id ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
              {message.role === 'user' && (
                <Avatar className="w-8 h-8 bg-[oklch(0.25_0.03_280)]">
                  <AvatarFallback className="bg-transparent">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600">
                <AvatarFallback className="bg-transparent">
                  <Bot className="w-4 h-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-[oklch(0.18_0.03_280)] border border-[oklch(0.25_0.03_280)] rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Suggested questions</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setInput(suggestion);
                  sendMessage(suggestion);
                }}
                className="text-xs text-muted-foreground hover:text-white hover:bg-[oklch(0.18_0.03_280)]"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-[oklch(0.25_0.03_280)]">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about marketing, recruitment, or content..."
            className="min-h-[44px] max-h-32 bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] focus:border-purple-500/50 text-white placeholder:text-muted-foreground resize-none"
            rows={1}
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
