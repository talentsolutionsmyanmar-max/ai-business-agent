'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Linkedin,
  Copy,
  Check,
  Calendar,
  TrendingUp,
  Heart,
  MessageCircle,
  Share,
  Eye,
  BarChart3,
  Zap,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const postTypes = [
  { id: 'thought', label: 'Thought Leadership', icon: '💡' },
  { id: 'job', label: 'Job Posting', icon: '💼' },
  { id: 'culture', label: 'Company Culture', icon: '🌟' },
  { id: 'insights', label: 'Industry Insights', icon: '📊' },
];

const toneOptions = [
  { id: 'professional', label: 'Professional' },
  { id: 'casual', label: 'Casual' },
  { id: 'inspiring', label: 'Inspiring' },
  { id: 'educational', label: 'Educational' },
];

interface ScheduledPost {
  id: string;
  title: string;
  type: string;
  date: string;
  status: 'scheduled' | 'draft' | 'posted';
}

const scheduledPosts: ScheduledPost[] = [
  { id: '1', title: '5 Tips for Remote Hiring', type: 'Thought Leadership', date: '2024-01-15', status: 'scheduled' },
  { id: '2', title: 'Senior Developer Position', type: 'Job Posting', date: '2024-01-16', status: 'scheduled' },
  { id: '3', title: 'Team Building Activities', type: 'Company Culture', date: '2024-01-18', status: 'draft' },
  { id: '4', title: '2024 Hiring Trends', type: 'Industry Insights', date: '2024-01-12', status: 'posted' },
];

const engagementData = [
  { label: 'Mon', likes: 45, comments: 12, shares: 8, reach: 1200 },
  { label: 'Tue', likes: 62, comments: 18, shares: 15, reach: 1850 },
  { label: 'Wed', likes: 38, comments: 8, shares: 5, reach: 980 },
  { label: 'Thu', likes: 89, comments: 25, shares: 22, reach: 2400 },
  { label: 'Fri', likes: 55, comments: 14, shares: 10, reach: 1500 },
  { label: 'Sat', likes: 32, comments: 6, shares: 4, reach: 750 },
  { label: 'Sun', likes: 28, comments: 5, shares: 3, reach: 620 },
];

export function LinkedInManager() {
  const [postType, setPostType] = useState('thought');
  const [tone, setTone] = useState('professional');
  const [topic, setTopic] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('generator');

  const generatePost = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: `linkedin-${postType}`,
          topic,
          tone
        })
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedPost(data.content);
      }
    } catch (error) {
      console.error('Failed to generate post:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const characterCount = generatedPost.length;
  const maxCharacters = 3000;

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
            <TabsTrigger value="generator" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Zap className="w-4 h-4 mr-2" />
              Post Generator
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Calendar className="w-4 h-4 mr-2" />
              Content Calendar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="generator" className="flex-1 p-4 m-0 overflow-auto">
          <div className="grid lg:grid-cols-2 gap-4 h-full">
            {/* Input Section */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  LinkedIn Post Generator
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  AI-powered post creation for maximum engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Post Type */}
                <div className="space-y-2">
                  <Label className="text-white">Post Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {postTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={postType === type.id ? 'default' : 'outline'}
                        onClick={() => setPostType(type.id)}
                        className={cn(
                          'justify-start text-left h-auto py-3',
                          postType === type.id
                            ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                            : 'bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-muted-foreground hover:text-white'
                        )}
                      >
                        <span className="mr-2 text-lg">{type.icon}</span>
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tone */}
                <div className="space-y-2">
                  <Label className="text-white">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                      {toneOptions.map((t) => (
                        <SelectItem key={t.id} value={t.id} className="text-white hover:bg-[oklch(0.2_0.03_280)]">
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Topic */}
                <div className="space-y-2">
                  <Label className="text-white">Topic / Subject</Label>
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Remote work trends, Hiring tips, Company updates..."
                    className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white placeholder:text-muted-foreground"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generatePost}
                  disabled={isGenerating || !topic}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Post
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Generated Post</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={characterCount > maxCharacters ? 'destructive' : 'secondary'}
                      className={cn(
                        characterCount <= maxCharacters ? 'bg-green-500/20 text-green-400' : ''
                      )}
                    >
                      {characterCount}/{maxCharacters}
                    </Badge>
                    {generatedPost && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {generatedPost ? (
                  <div className="min-h-[300px] p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                    <p className="text-sm text-white whitespace-pre-wrap">{generatedPost}</p>
                  </div>
                ) : (
                  <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Linkedin className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Your generated post will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="flex-1 p-4 m-0 overflow-auto">
          <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] h-full">
            <CardHeader>
              <CardTitle className="text-white">Content Calendar</CardTitle>
              <CardDescription className="text-muted-foreground">
                Schedule and manage your LinkedIn posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simple Calendar View */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-xs text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {/* Calendar days */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isToday = day === 14;
                  const hasPost = [15, 16, 18].includes(day);
                  return (
                    <div
                      key={day}
                      className={cn(
                        'aspect-square flex items-center justify-center rounded-lg text-sm relative',
                        isToday
                          ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold'
                          : 'hover:bg-[oklch(0.18_0.03_280)] text-white',
                        hasPost && 'ring-2 ring-purple-500/50'
                      )}
                    >
                      {day}
                      {hasPost && (
                        <span className="absolute bottom-1 w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Scheduled Posts List */}
              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-medium text-white mb-3">Scheduled Posts</h4>
                {scheduledPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <Linkedin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{post.title}</p>
                        <p className="text-xs text-muted-foreground">{post.type} • {post.date}</p>
                      </div>
                    </div>
                    <Badge
                      variant={post.status === 'posted' ? 'default' : post.status === 'scheduled' ? 'secondary' : 'outline'}
                      className={cn(
                        post.status === 'posted' && 'bg-green-500/20 text-green-400 border-green-500/30',
                        post.status === 'scheduled' && 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                        post.status === 'draft' && 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      )}
                    >
                      {post.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="flex-1 p-4 m-0 overflow-auto">
          <div className="grid lg:grid-cols-4 gap-4 mb-4">
            {[
              { label: 'Total Reach', value: '12.5K', change: '+15%', icon: Eye, color: 'from-blue-500 to-cyan-500' },
              { label: 'Engagement Rate', value: '4.8%', change: '+2.3%', icon: Heart, color: 'from-pink-500 to-rose-500' },
              { label: 'Comments', value: '892', change: '+28%', icon: MessageCircle, color: 'from-purple-500 to-violet-500' },
              { label: 'Shares', value: '234', change: '+12%', icon: Share, color: 'from-green-500 to-emerald-500' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card key={i} className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Weekly Chart */}
          <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
            <CardHeader>
              <CardTitle className="text-white">Weekly Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-48 gap-2">
                {engagementData.map((day, i) => {
                  const maxReach = Math.max(...engagementData.map(d => d.reach));
                  const height = (day.reach / maxReach) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex flex-col items-center justify-end h-40">
                        <div
                          className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-purple-600 to-blue-500 relative group"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[oklch(0.2_0.03_280)] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Reach: {day.reach}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">{day.label}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
