'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Users,
  UserPlus,
  Building2,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Clock,
  ChevronRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Candidate {
  id: string;
  name: string;
  role: string;
  company: string;
  stage: 'sourced' | 'screened' | 'interviewed' | 'offer' | 'hired';
  rating: number;
  avatar: string;
  appliedDate: string;
}

interface Client {
  id: string;
  name: string;
  industry: string;
  jobsPosted: number;
  activeJobs: number;
  logo: string;
}

interface Job {
  id: string;
  title: string;
  client: string;
  applications: number;
  status: 'active' | 'paused' | 'filled';
  posted: string;
  salary: string;
}

const stages = [
  { id: 'sourced', label: 'Sourced', color: 'from-gray-500 to-slate-600' },
  { id: 'screened', label: 'Screened', color: 'from-blue-500 to-cyan-600' },
  { id: 'interviewed', label: 'Interviewed', color: 'from-purple-500 to-violet-600' },
  { id: 'offer', label: 'Offer', color: 'from-orange-500 to-amber-600' },
  { id: 'hired', label: 'Hired', color: 'from-green-500 to-emerald-600' },
];

const candidates: Candidate[] = [
  { id: '1', name: 'Sarah Johnson', role: 'Senior Frontend Developer', company: 'Tech Corp', stage: 'sourced', rating: 4.5, avatar: 'SJ', appliedDate: '2024-01-14' },
  { id: '2', name: 'Michael Chen', role: 'Full Stack Engineer', company: 'StartupX', stage: 'sourced', rating: 4.8, avatar: 'MC', appliedDate: '2024-01-13' },
  { id: '3', name: 'Emily Davis', role: 'Product Manager', company: 'Innovation Labs', stage: 'screened', rating: 4.2, avatar: 'ED', appliedDate: '2024-01-12' },
  { id: '4', name: 'James Wilson', role: 'DevOps Engineer', company: 'CloudTech', stage: 'screened', rating: 4.6, avatar: 'JW', appliedDate: '2024-01-11' },
  { id: '5', name: 'Lisa Anderson', role: 'UX Designer', company: 'DesignHub', stage: 'interviewed', rating: 4.9, avatar: 'LA', appliedDate: '2024-01-10' },
  { id: '6', name: 'Robert Taylor', role: 'Backend Developer', company: 'DataSys', stage: 'interviewed', rating: 4.3, avatar: 'RT', appliedDate: '2024-01-09' },
  { id: '7', name: 'Jennifer Brown', role: 'Data Scientist', company: 'AI Solutions', stage: 'offer', rating: 4.7, avatar: 'JB', appliedDate: '2024-01-08' },
  { id: '8', name: 'David Lee', role: 'Tech Lead', company: 'ScaleUp Inc', stage: 'hired', rating: 5.0, avatar: 'DL', appliedDate: '2024-01-05' },
  { id: '9', name: 'Amanda Martinez', role: 'QA Engineer', company: 'QualityFirst', stage: 'sourced', rating: 4.1, avatar: 'AM', appliedDate: '2024-01-14' },
  { id: '10', name: 'Chris Thompson', role: 'Mobile Developer', company: 'AppWorks', stage: 'interviewed', rating: 4.4, avatar: 'CT', appliedDate: '2024-01-10' },
];

const clients: Client[] = [
  { id: '1', name: 'TechCorp Industries', industry: 'Technology', jobsPosted: 12, activeJobs: 5, logo: 'TC' },
  { id: '2', name: 'Healthcare Plus', industry: 'Healthcare', jobsPosted: 8, activeJobs: 3, logo: 'HP' },
  { id: '3', name: 'FinanceFirst Bank', industry: 'Finance', jobsPosted: 6, activeJobs: 2, logo: 'FF' },
  { id: '4', name: 'RetailMax', industry: 'Retail', jobsPosted: 15, activeJobs: 4, logo: 'RM' },
  { id: '5', name: 'GreenEnergy Co', industry: 'Energy', jobsPosted: 4, activeJobs: 2, logo: 'GE' },
];

const jobs: Job[] = [
  { id: '1', title: 'Senior React Developer', client: 'TechCorp Industries', applications: 45, status: 'active', posted: '2024-01-10', salary: '$120K - $150K' },
  { id: '2', title: 'Product Manager', client: 'Healthcare Plus', applications: 32, status: 'active', posted: '2024-01-08', salary: '$100K - $130K' },
  { id: '3', title: 'DevOps Engineer', client: 'FinanceFirst Bank', applications: 28, status: 'active', posted: '2024-01-05', salary: '$110K - $140K' },
  { id: '4', title: 'UX/UI Designer', client: 'RetailMax', applications: 56, status: 'paused', posted: '2024-01-03', salary: '$80K - $110K' },
  { id: '5', title: 'Data Scientist', client: 'GreenEnergy Co', applications: 22, status: 'filled', posted: '2023-12-20', salary: '$130K - $160K' },
];

export function RecruitmentCRM() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [draggedCandidate, setDraggedCandidate] = useState<string | null>(null);

  const getCandidatesByStage = (stage: string) => 
    candidates.filter(c => c.stage === stage);

  const handleDragStart = (candidateId: string) => {
    setDraggedCandidate(candidateId);
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Users className="w-4 h-4 mr-2" />
              Candidates Pipeline
            </TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Building2 className="w-4 h-4 mr-2" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Briefcase className="w-4 h-4 mr-2" />
              Jobs
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="pipeline" className="flex-1 p-4 m-0 overflow-auto">
          <div className="flex gap-4 h-full min-w-max">
            {stages.map((stage) => {
              const stageCandidates = getCandidatesByStage(stage.id);
              return (
                <div key={stage.id} className="w-72 flex flex-col">
                  {/* Stage Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-3 h-3 rounded-full bg-gradient-to-r', stage.color)} />
                      <span className="font-medium text-white">{stage.label}</span>
                    </div>
                    <Badge variant="secondary" className="bg-[oklch(0.2_0.03_280)]">
                      {stageCandidates.length}
                    </Badge>
                  </div>

                  {/* Candidates List */}
                  <ScrollArea className="flex-1 pr-2">
                    <div className="space-y-2">
                      {stageCandidates.map((candidate) => (
                        <Card
                          key={candidate.id}
                          className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] cursor-grab hover:border-purple-500/50 transition-colors"
                          draggable
                          onDragStart={() => handleDragStart(candidate.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              <Avatar className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 flex-shrink-0">
                                <AvatarFallback className="bg-transparent text-white text-xs font-bold">
                                  {candidate.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-white text-sm truncate">{candidate.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{candidate.role}</p>
                                <p className="text-xs text-muted-foreground truncate">{candidate.company}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs text-white">{candidate.rating}</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {candidate.appliedDate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Add Candidate Button */}
                  <Button
                    variant="ghost"
                    className="mt-2 w-full border border-dashed border-[oklch(0.25_0.03_280)] text-muted-foreground hover:text-white hover:border-purple-500/50"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Candidate
                  </Button>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="clients" className="flex-1 p-4 m-0 overflow-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <Card key={client.id} className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] hover:border-purple-500/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold">{client.logo}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{client.name}</h4>
                      <p className="text-sm text-muted-foreground">{client.industry}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-2 rounded-lg bg-[oklch(0.15_0.02_280)]">
                      <p className="text-xs text-muted-foreground">Total Jobs</p>
                      <p className="text-lg font-bold text-white">{client.jobsPosted}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[oklch(0.15_0.02_280)]">
                      <p className="text-xs text-muted-foreground">Active</p>
                      <p className="text-lg font-bold text-green-400">{client.activeJobs}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full mt-3 text-muted-foreground hover:text-white">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="flex-1 p-4 m-0 overflow-auto">
          {/* Jobs Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">3</p>
                    <p className="text-xs text-muted-foreground">Active Positions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">183</p>
                    <p className="text-xs text-muted-foreground">Total Applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-xs text-muted-foreground">Avg. Days to Fill</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jobs List */}
          <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Active Job Positions</CardTitle>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)] hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-white">{job.salary}</p>
                        <p className="text-xs text-muted-foreground">{job.applications} applications</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          job.status === 'active' && 'border-green-500/30 text-green-400',
                          job.status === 'paused' && 'border-yellow-500/30 text-yellow-400',
                          job.status === 'filled' && 'border-blue-500/30 text-blue-400'
                        )}
                      >
                        {job.status}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
