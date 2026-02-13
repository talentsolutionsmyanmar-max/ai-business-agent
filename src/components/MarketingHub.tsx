'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Megaphone,
  Lightbulb,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  BarChart3,
  Sparkles,
  FileText,
  Mail,
  Globe,
  Plus,
  Trash2,
  Edit,
  Check,
  RefreshCw,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Campaign {
  id: string;
  name: string;
  goal: string;
  budget: number;
  spent: number;
  status: 'active' | 'paused' | 'completed';
  timeline: string;
  type: string;
}

interface BlogIdea {
  id: string;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'idea' | 'draft' | 'published';
}

interface EmailCampaign {
  id: string;
  name: string;
  subscribers: number;
  openRate: number;
  status: 'draft' | 'active' | 'sent';
}

export function MarketingHub() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [showAddEmail, setShowAddEmail] = useState(false);
  const [showCampaignDetails, setShowCampaignDetails] = useState<string | null>(null);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Tech Talent Q1', goal: 'Hire 20 Senior Developers', budget: 15000, spent: 8500, status: 'active', timeline: 'Jan - Mar 2024', type: 'Recruitment' },
    { id: '2', name: 'LinkedIn Brand', goal: 'Increase followers by 25%', budget: 5000, spent: 3200, status: 'active', timeline: 'Jan - Feb 2024', type: 'Brand Awareness' },
    { id: '3', name: 'Healthcare Recruitment', goal: 'Build healthcare talent pool', budget: 8000, spent: 8000, status: 'completed', timeline: 'Dec 2023', type: 'Recruitment' },
  ]);

  const [blogIdeas, setBlogIdeas] = useState<BlogIdea[]>([
    { id: '1', title: '10 Essential Skills for Remote Developers', category: 'Industry Insights', priority: 'high', status: 'idea' },
    { id: '2', title: 'How AI is Transforming Recruitment', category: 'Technology', priority: 'medium', status: 'draft' },
    { id: '3', title: 'Building a Diverse Tech Team', category: 'Best Practices', priority: 'high', status: 'idea' },
    { id: '4', title: '2024 Salary Guide for Tech Roles', category: 'Resources', priority: 'medium', status: 'published' },
    { id: '5', title: 'Interview Tips from Top Recruiters', category: 'Tips & Tricks', priority: 'low', status: 'idea' },
  ]);

  const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>([
    { id: '1', name: 'Monthly Newsletter', subscribers: 5420, openRate: 32, status: 'sent' },
    { id: '2', name: 'Candidate Nurturing Series', subscribers: 1234, openRate: 28, status: 'active' },
    { id: '3', name: 'Client Update Q1', subscribers: 280, openRate: 45, status: 'draft' },
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '', goal: '', budget: '', timeline: '', type: 'Recruitment'
  });

  const [newEmail, setNewEmail] = useState({
    name: '', subscribers: ''
  });

  const addCampaign = () => {
    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      goal: newCampaign.goal,
      budget: parseInt(newCampaign.budget) || 0,
      spent: 0,
      status: 'active',
      timeline: newCampaign.timeline,
      type: newCampaign.type
    };
    setCampaigns(prev => [...prev, campaign]);
    setNewCampaign({ name: '', goal: '', budget: '', timeline: '', type: 'Recruitment' });
    setShowAddCampaign(false);
  };

  const addEmailCampaign = () => {
    const email: EmailCampaign = {
      id: Date.now().toString(),
      name: newEmail.name,
      subscribers: parseInt(newEmail.subscribers) || 0,
      openRate: 0,
      status: 'draft'
    };
    setEmailCampaigns(prev => [...prev, email]);
    setNewEmail({ name: '', subscribers: '' });
    setShowAddEmail(false);
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    setShowCampaignDetails(null);
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        const newStatus = c.status === 'active' ? 'paused' : c.status === 'paused' ? 'active' : c.status;
        return { ...c, status: newStatus as Campaign['status'] };
      }
      return c;
    }));
  };

  const generateCampaignIdeas = async () => {
    setIsGeneratingIdeas(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: 'Generate 5 creative marketing campaign ideas for a recruitment company. Each idea should be concise with a title and brief description. Format each on a new line starting with a number.' }
          ]
        })
      });
      const data = await response.json();
      if (data.success) {
        const ideas = data.message.split('\n').filter((line: string) => line.trim());
        setGeneratedIdeas(ideas);
      }
    } catch (error) {
      console.error('Failed to generate ideas:', error);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const generateBlogIdeas = async () => {
    setIsGeneratingIdeas(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: 'Generate 5 blog post ideas for a recruitment agency blog. Each should have a catchy title. Format each on a new line.' }
          ]
        })
      });
      const data = await response.json();
      if (data.success) {
        const ideas = data.message.split('\n').filter((line: string) => line.trim());
        const newIdeas: BlogIdea[] = ideas.slice(0, 5).map((idea: string, index: number) => ({
          id: Date.now().toString() + index,
          title: idea.replace(/^\d+\.?\s*/, '').replace(/^\*\*|\*\*$/g, ''),
          category: ['Industry Insights', 'Technology', 'Best Practices', 'Resources', 'Tips & Tricks'][index % 5],
          priority: ['high', 'medium', 'low'][index % 3] as BlogIdea['priority'],
          status: 'idea'
        }));
        setBlogIdeas(prev => [...newIdeas, ...prev]);
      }
    } catch (error) {
      console.error('Failed to generate ideas:', error);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const selectedCampaign = campaigns.find(c => c.id === showCampaignDetails);

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Megaphone className="w-4 h-4 mr-2" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="strategy" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Lightbulb className="w-4 h-4 mr-2" />
              Content Strategy
            </TabsTrigger>
            <TabsTrigger value="competitors" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Competitors
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="campaigns" className="flex-1 p-4 m-0 overflow-auto">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Campaign List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Active Campaigns</h3>
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-blue-600"
                  onClick={() => setShowAddCampaign(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Campaign
                </Button>
              </div>

              {campaigns.map((campaign) => (
                <Card 
                  key={campaign.id} 
                  className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] cursor-pointer hover:border-purple-500/50 transition-colors"
                  onClick={() => setShowCampaignDetails(campaign.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-white">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground">{campaign.goal}</p>
                      </div>
                      <Badge
                        className={cn(
                          campaign.status === 'active' && 'bg-green-500/20 text-green-400 border-green-500/30',
                          campaign.status === 'paused' && 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                          campaign.status === 'completed' && 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        )}
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="font-bold text-white">${campaign.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Spent</p>
                        <p className="font-bold text-white">${campaign.spent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Remaining</p>
                        <p className="font-bold text-green-400">${(campaign.budget - campaign.spent).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-white">{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                      </div>
                      <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-muted-foreground">{campaign.timeline}</p>
                      <Badge variant="outline" className="text-xs">{campaign.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Create */}
            <div>
              <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Quick Campaign</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-white text-xs">Campaign Name</Label>
                    <Input
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      placeholder="e.g., Q2 Tech Hiring"
                      className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-white text-xs">Goal</Label>
                    <Textarea
                      value={newCampaign.goal}
                      onChange={(e) => setNewCampaign({ ...newCampaign, goal: e.target.value })}
                      placeholder="What do you want to achieve?"
                      className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white text-sm min-h-[60px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-white text-xs">Budget ($)</Label>
                      <Input
                        type="number"
                        value={newCampaign.budget}
                        onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                        placeholder="10000"
                        className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-white text-xs">Timeline</Label>
                      <Input
                        value={newCampaign.timeline}
                        onChange={(e) => setNewCampaign({ ...newCampaign, timeline: e.target.value })}
                        placeholder="e.g., Mar-Apr"
                        className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white text-sm"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={addCampaign} 
                    disabled={!newCampaign.name || !newCampaign.budget}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>

              {/* AI Campaign Ideas */}
              <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] mt-4">
                <CardHeader>
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    AI Campaign Ideas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedIdeas.length > 0 ? (
                    <div className="space-y-2">
                      {generatedIdeas.map((idea, i) => (
                        <div key={i} className="p-2 rounded bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                          <p className="text-xs text-white">{idea}</p>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGeneratedIdeas([])}
                        className="w-full mt-2 bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]"
                      >
                        Clear & Regenerate
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={generateCampaignIdeas}
                      disabled={isGeneratingIdeas}
                      className="w-full bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]"
                    >
                      {isGeneratingIdeas ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Ideas
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="flex-1 p-4 m-0 overflow-auto">
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Blog Topics */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-400" />
                    Blog Topics
                  </CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={generateBlogIdeas}
                    disabled={isGeneratingIdeas}
                    className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]"
                  >
                    {isGeneratingIdeas ? (
                      <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3 mr-1" />
                    )}
                    Generate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {blogIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)] hover:border-purple-500/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">{idea.title}</p>
                        <p className="text-xs text-muted-foreground">{idea.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            idea.priority === 'high' && 'border-red-500/30 text-red-400',
                            idea.priority === 'medium' && 'border-yellow-500/30 text-yellow-400',
                            idea.priority === 'low' && 'border-green-500/30 text-green-400'
                          )}
                        >
                          {idea.priority}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={cn(
                            idea.status === 'published' && 'border-green-500/30 text-green-400',
                            idea.status === 'draft' && 'border-yellow-500/30 text-yellow-400',
                            idea.status === 'idea' && 'border-blue-500/30 text-blue-400'
                          )}
                        >
                          {idea.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Email Campaigns */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-pink-400" />
                    Email Campaigns
                  </CardTitle>
                  <Button 
                    size="sm"
                    onClick={() => setShowAddEmail(true)}
                    className="bg-gradient-to-r from-purple-500 to-blue-600"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {emailCampaigns.map((email) => (
                    <div
                      key={email.id}
                      className="p-3 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)] cursor-pointer hover:border-purple-500/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-white font-medium">{email.name}</p>
                        <Badge
                          variant="outline"
                          className={cn(
                            email.status === 'sent' && 'border-green-500/30 text-green-400',
                            email.status === 'active' && 'border-blue-500/30 text-blue-400',
                            email.status === 'draft' && 'border-yellow-500/30 text-yellow-400'
                          )}
                        >
                          {email.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{email.subscribers.toLocaleString()} subscribers</span>
                        <span>{email.openRate}% open rate</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media Plan */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Social Media Content Plan
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Weekly content distribution strategy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                    const content = [
                      'Industry News',
                      'Job Spotlight',
                      'Tips & Tricks',
                      'Company Update',
                      'Thought Leadership',
                      'Candidate Story',
                      'Weekly Recap'
                    ][i];
                    return (
                      <div
                        key={day}
                        className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-center hover:border-purple-500/60 transition-colors cursor-pointer"
                      >
                        <p className="font-medium text-white text-sm">{day}</p>
                        <p className="text-xs text-muted-foreground mt-1">{content}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="flex-1 p-4 m-0 overflow-auto">
          <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                Competitor Analysis
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Monitor and analyze competitor activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Competitor Analysis Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mb-4">
                  Track competitor job postings, social media activity, and market positioning to stay ahead of the competition.
                </p>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Request Early Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Campaign Dialog */}
      <Dialog open={showAddCampaign} onOpenChange={setShowAddCampaign}>
        <DialogContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Campaign</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Set up a new marketing campaign
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white">Campaign Name *</Label>
              <Input
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="Q1 Tech Recruitment"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Goal</Label>
              <Textarea
                value={newCampaign.goal}
                onChange={(e) => setNewCampaign({ ...newCampaign, goal: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white min-h-[80px]"
                placeholder="What do you want to achieve?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Budget ($)</Label>
                <Input
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                  className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                  placeholder="10000"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Timeline</Label>
                <Input
                  value={newCampaign.timeline}
                  onChange={(e) => setNewCampaign({ ...newCampaign, timeline: e.target.value })}
                  className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                  placeholder="Jan - Mar 2024"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Type</Label>
              <Select value={newCampaign.type} onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}>
                <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                  <SelectItem value="Recruitment">Recruitment</SelectItem>
                  <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
                  <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                  <SelectItem value="Content Marketing">Content Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCampaign(false)} className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
              Cancel
            </Button>
            <Button onClick={addCampaign} disabled={!newCampaign.name} className="bg-gradient-to-r from-purple-500 to-blue-600">
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Campaign Details Dialog */}
      <Dialog open={!!showCampaignDetails} onOpenChange={() => setShowCampaignDetails(null)}>
        <DialogContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Campaign Details</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedCampaign.name}</h3>
                <p className="text-muted-foreground">{selectedCampaign.goal}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-[oklch(0.12_0.02_280)] border border-[oklch(0.25_0.03_280)] text-center">
                  <p className="text-lg font-bold text-white">${selectedCampaign.budget.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Budget</p>
                </div>
                <div className="p-3 rounded-lg bg-[oklch(0.12_0.02_280)] border border-[oklch(0.25_0.03_280)] text-center">
                  <p className="text-lg font-bold text-white">${selectedCampaign.spent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Spent</p>
                </div>
                <div className="p-3 rounded-lg bg-[oklch(0.12_0.02_280)] border border-[oklch(0.25_0.03_280)] text-center">
                  <p className="text-lg font-bold text-green-400">${(selectedCampaign.budget - selectedCampaign.spent).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={cn(
                    selectedCampaign.status === 'active' && 'bg-green-500/20 text-green-400 border-green-500/30',
                    selectedCampaign.status === 'paused' && 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                    selectedCampaign.status === 'completed' && 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  )}
                >
                  {selectedCampaign.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{selectedCampaign.timeline}</span>
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button 
              variant="destructive" 
              onClick={() => deleteCampaign(selectedCampaign?.id || '')}
              className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            {selectedCampaign?.status !== 'completed' && (
              <Button 
                onClick={() => toggleCampaignStatus(selectedCampaign?.id || '')}
                className={cn(
                  selectedCampaign?.status === 'active' 
                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                )}
              >
                {selectedCampaign?.status === 'active' ? 'Pause' : 'Activate'}
              </Button>
            )}
            <Button onClick={() => setShowCampaignDetails(null)} className="bg-gradient-to-r from-purple-500 to-blue-600">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Email Campaign Dialog */}
      <Dialog open={showAddEmail} onOpenChange={setShowAddEmail}>
        <DialogContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Create Email Campaign</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Set up a new email campaign
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white">Campaign Name *</Label>
              <Input
                value={newEmail.name}
                onChange={(e) => setNewEmail({ ...newEmail, name: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="Monthly Newsletter"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Initial Subscribers</Label>
              <Input
                type="number"
                value={newEmail.subscribers}
                onChange={(e) => setNewEmail({ ...newEmail, subscribers: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="1000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEmail(false)} className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
              Cancel
            </Button>
            <Button onClick={addEmailCampaign} disabled={!newEmail.name} className="bg-gradient-to-r from-purple-500 to-blue-600">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
