'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Users,
  UserPlus,
  Building2,
  Briefcase,
  ChevronRight,
  Star,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Clock,
  Plus,
  X,
  Save,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Candidate {
  id: string;
  name: string;
  role: string;
  company: string;
  stage: 'sourced' | 'screened' | 'interviewed' | 'offer' | 'hired';
  rating: number;
  avatar: string;
  appliedDate: string;
  email: string;
  phone: string;
  notes: string;
}

interface Client {
  id: string;
  name: string;
  industry: string;
  jobsPosted: number;
  activeJobs: number;
  logo: string;
  contact: string;
  email: string;
}

interface Job {
  id: string;
  title: string;
  client: string;
  applications: number;
  status: 'active' | 'paused' | 'filled';
  posted: string;
  salary: string;
  description: string;
}

const stages = [
  { id: 'sourced', label: 'Sourced', color: 'from-gray-500 to-slate-600' },
  { id: 'screened', label: 'Screened', color: 'from-blue-500 to-cyan-600' },
  { id: 'interviewed', label: 'Interviewed', color: 'from-purple-500 to-violet-600' },
  { id: 'offer', label: 'Offer', color: 'from-orange-500 to-amber-600' },
  { id: 'hired', label: 'Hired', color: 'from-green-500 to-emerald-600' },
];

export function RecruitmentCRM() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [showCandidateDetails, setShowCandidateDetails] = useState<string | null>(null);
  const [showJobDetails, setShowJobDetails] = useState<string | null>(null);
  
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: '1', name: 'Sarah Johnson', role: 'Senior Frontend Developer', company: 'Tech Corp', stage: 'sourced', rating: 4.5, avatar: 'SJ', appliedDate: '2024-01-14', email: 'sarah@email.com', phone: '+1 234 567 890', notes: 'Strong React experience' },
    { id: '2', name: 'Michael Chen', role: 'Full Stack Engineer', company: 'StartupX', stage: 'sourced', rating: 4.8, avatar: 'MC', appliedDate: '2024-01-13', email: 'michael@email.com', phone: '+1 234 567 891', notes: 'Great problem solver' },
    { id: '3', name: 'Emily Davis', role: 'Product Manager', company: 'Innovation Labs', stage: 'screened', rating: 4.2, avatar: 'ED', appliedDate: '2024-01-12', email: 'emily@email.com', phone: '+1 234 567 892', notes: 'Excellent communication' },
    { id: '4', name: 'James Wilson', role: 'DevOps Engineer', company: 'CloudTech', stage: 'screened', rating: 4.6, avatar: 'JW', appliedDate: '2024-01-11', email: 'james@email.com', phone: '+1 234 567 893', notes: 'AWS certified' },
    { id: '5', name: 'Lisa Anderson', role: 'UX Designer', company: 'DesignHub', stage: 'interviewed', rating: 4.9, avatar: 'LA', appliedDate: '2024-01-10', email: 'lisa@email.com', phone: '+1 234 567 894', notes: 'Portfolio is impressive' },
    { id: '6', name: 'Robert Taylor', role: 'Backend Developer', company: 'DataSys', stage: 'interviewed', rating: 4.3, avatar: 'RT', appliedDate: '2024-01-09', email: 'robert@email.com', phone: '+1 234 567 895', notes: 'Python expert' },
    { id: '7', name: 'Jennifer Brown', role: 'Data Scientist', company: 'AI Solutions', stage: 'offer', rating: 4.7, avatar: 'JB', appliedDate: '2024-01-08', email: 'jennifer@email.com', phone: '+1 234 567 896', notes: 'Ready for offer' },
    { id: '8', name: 'David Lee', role: 'Tech Lead', company: 'ScaleUp Inc', stage: 'hired', rating: 5.0, avatar: 'DL', appliedDate: '2024-01-05', email: 'david@email.com', phone: '+1 234 567 897', notes: 'Started on Jan 20' },
  ]);

  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'TechCorp Industries', industry: 'Technology', jobsPosted: 12, activeJobs: 5, logo: 'TC', contact: 'John Smith', email: 'john@techcorp.com' },
    { id: '2', name: 'Healthcare Plus', industry: 'Healthcare', jobsPosted: 8, activeJobs: 3, logo: 'HP', contact: 'Mary Johnson', email: 'mary@healthcareplus.com' },
    { id: '3', name: 'FinanceFirst Bank', industry: 'Finance', jobsPosted: 6, activeJobs: 2, logo: 'FF', contact: 'Bob Williams', email: 'bob@financefirst.com' },
    { id: '4', name: 'RetailMax', industry: 'Retail', jobsPosted: 15, activeJobs: 4, logo: 'RM', contact: 'Alice Brown', email: 'alice@retailmax.com' },
    { id: '5', name: 'GreenEnergy Co', industry: 'Energy', jobsPosted: 4, activeJobs: 2, logo: 'GE', contact: 'Charlie Green', email: 'charlie@greenenergy.com' },
  ]);

  const [jobs, setJobs] = useState<Job[]>([
    { id: '1', title: 'Senior React Developer', client: 'TechCorp Industries', applications: 45, status: 'active', posted: '2024-01-10', salary: '$120K - $150K', description: 'Build modern web applications' },
    { id: '2', title: 'Product Manager', client: 'Healthcare Plus', applications: 32, status: 'active', posted: '2024-01-08', salary: '$100K - $130K', description: 'Lead product development' },
    { id: '3', title: 'DevOps Engineer', client: 'FinanceFirst Bank', applications: 28, status: 'active', posted: '2024-01-05', salary: '$110K - $140K', description: 'Manage cloud infrastructure' },
    { id: '4', title: 'UX/UI Designer', client: 'RetailMax', applications: 56, status: 'paused', posted: '2024-01-03', salary: '$80K - $110K', description: 'Design user experiences' },
    { id: '5', title: 'Data Scientist', client: 'GreenEnergy Co', applications: 22, status: 'filled', posted: '2023-12-20', salary: '$130K - $160K', description: 'Analyze energy data' },
  ]);

  // New item forms
  const [newCandidate, setNewCandidate] = useState({
    name: '', role: '', company: '', email: '', phone: '', notes: '', stage: 'sourced' as const
  });
  const [newClient, setNewClient] = useState({
    name: '', industry: '', contact: '', email: ''
  });
  const [newJob, setNewJob] = useState({
    title: '', client: '', salary: '', description: ''
  });

  const getCandidatesByStage = (stage: string) => 
    candidates.filter(c => c.stage === stage);

  const moveCandidateStage = (candidateId: string, newStage: Candidate['stage']) => {
    setCandidates(prev => prev.map(c => 
      c.id === candidateId ? { ...c, stage: newStage } : c
    ));
  };

  const addCandidate = () => {
    const candidate: Candidate = {
      id: Date.now().toString(),
      ...newCandidate,
      rating: 0,
      avatar: newCandidate.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setCandidates(prev => [...prev, candidate]);
    setNewCandidate({ name: '', role: '', company: '', email: '', phone: '', notes: '', stage: 'sourced' });
    setShowAddCandidate(false);
  };

  const addClient = () => {
    const client: Client = {
      id: Date.now().toString(),
      ...newClient,
      jobsPosted: 0,
      activeJobs: 0,
      logo: newClient.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    setClients(prev => [...prev, client]);
    setNewClient({ name: '', industry: '', contact: '', email: '' });
    setShowAddClient(false);
  };

  const addJob = () => {
    const job: Job = {
      id: Date.now().toString(),
      ...newJob,
      applications: 0,
      status: 'active',
      posted: new Date().toISOString().split('T')[0]
    };
    setJobs(prev => [...prev, job]);
    setNewJob({ title: '', client: '', salary: '', description: '' });
    setShowAddJob(false);
  };

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
    setShowCandidateDetails(null);
  };

  const selectedCandidate = candidates.find(c => c.id === showCandidateDetails);
  const selectedJob = jobs.find(j => j.id === showJobDetails);

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
                          className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] cursor-pointer hover:border-purple-500/50 transition-colors"
                          onClick={() => setShowCandidateDetails(candidate.id)}
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
                    onClick={() => {
                      setNewCandidate(prev => ({ ...prev, stage: stage.id as Candidate['stage'] }));
                      setShowAddCandidate(true);
                    }}
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
          <div className="flex justify-end mb-4">
            <Button 
              className="bg-gradient-to-r from-purple-500 to-blue-600"
              onClick={() => setShowAddClient(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
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
                  <div className="mt-3 text-sm text-muted-foreground">
                    <p>Contact: {client.contact}</p>
                    <p>{client.email}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-3 text-muted-foreground hover:text-white"
                    onClick={() => alert(`Viewing details for ${client.name}`)}
                  >
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
                    <p className="text-2xl font-bold text-white">{jobs.filter(j => j.status === 'active').length}</p>
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
                    <p className="text-2xl font-bold text-white">{jobs.reduce((sum, j) => sum + j.applications, 0)}</p>
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
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-blue-600"
                  onClick={() => setShowAddJob(true)}
                >
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
                    className="flex items-center justify-between p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)] hover:border-purple-500/50 transition-colors cursor-pointer"
                    onClick={() => setShowJobDetails(job.id)}
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

      {/* Add Candidate Dialog */}
      <Dialog open={showAddCandidate} onOpenChange={setShowAddCandidate}>
        <DialogContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Candidate</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter candidate details to add them to the pipeline
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white">Full Name *</Label>
              <Input
                value={newCandidate.name}
                onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Role *</Label>
              <Input
                value={newCandidate.role}
                onChange={(e) => setNewCandidate({ ...newCandidate, role: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="Senior Developer"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Current Company</Label>
              <Input
                value={newCandidate.company}
                onChange={(e) => setNewCandidate({ ...newCandidate, company: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="Tech Corp"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Email</Label>
                <Input
                  type="email"
                  value={newCandidate.email}
                  onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                  className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                  placeholder="john@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Phone</Label>
                <Input
                  value={newCandidate.phone}
                  onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
                  className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                  placeholder="+1 234 567"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Notes</Label>
              <Textarea
                value={newCandidate.notes}
                onChange={(e) => setNewCandidate({ ...newCandidate, notes: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white min-h-[80px]"
                placeholder="Additional notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCandidate(false)} className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
              Cancel
            </Button>
            <Button onClick={addCandidate} disabled={!newCandidate.name || !newCandidate.role} className="bg-gradient-to-r from-purple-500 to-blue-600">
              <Save className="w-4 h-4 mr-2" />
              Add Candidate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Candidate Details Dialog */}
      <Dialog open={!!showCandidateDetails} onOpenChange={() => setShowCandidateDetails(null)}>
        <DialogContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Candidate Details</DialogTitle>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600">
                  <AvatarFallback className="bg-transparent text-white text-xl font-bold">
                    {selectedCandidate.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedCandidate.name}</h3>
                  <p className="text-muted-foreground">{selectedCandidate.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white">{selectedCandidate.rating}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>{selectedCandidate.company}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{selectedCandidate.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{selectedCandidate.phone}</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[oklch(0.12_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                <p className="text-xs text-muted-foreground mb-1">Notes</p>
                <p className="text-sm text-white">{selectedCandidate.notes || 'No notes added'}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-white text-sm">Move to Stage</Label>
                <Select 
                  value={selectedCandidate.stage} 
                  onValueChange={(value) => moveCandidateStage(selectedCandidate.id, value as Candidate['stage'])}
                >
                  <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                    {stages.map(s => (
                      <SelectItem key={s.id} value={s.id} className="text-white">{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="destructive" onClick={() => deleteCandidate(selectedCandidate?.id || '')} className="bg-red-500/20 text-red-400 hover:bg-red-500/30">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button onClick={() => setShowCandidateDetails(null)} className="bg-gradient-to-r from-purple-500 to-blue-600">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Client Dialog */}
      <Dialog open={showAddClient} onOpenChange={setShowAddClient}>
        <DialogContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Client</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Add a new client company
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white">Company Name *</Label>
              <Input
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="Acme Corp"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Industry</Label>
              <Input
                value={newClient.industry}
                onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="Technology"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Contact Person</Label>
              <Input
                value={newClient.contact}
                onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="John Smith"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Email</Label>
              <Input
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="contact@company.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddClient(false)} className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
              Cancel
            </Button>
            <Button onClick={addClient} disabled={!newClient.name} className="bg-gradient-to-r from-purple-500 to-blue-600">
              <Save className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Job Dialog */}
      <Dialog open={showAddJob} onOpenChange={setShowAddJob}>
        <DialogContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Post New Job</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Create a new job position
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white">Job Title *</Label>
              <Input
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="Senior Developer"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Client *</Label>
              <Select value={newJob.client} onValueChange={(value) => setNewJob({ ...newJob, client: value })}>
                <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                  {clients.map(c => (
                    <SelectItem key={c.id} value={c.name} className="text-white">{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Salary Range</Label>
              <Input
                value={newJob.salary}
                onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                placeholder="$100K - $130K"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Description</Label>
              <Textarea
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white min-h-[80px]"
                placeholder="Job description..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddJob(false)} className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
              Cancel
            </Button>
            <Button onClick={addJob} disabled={!newJob.title || !newJob.client} className="bg-gradient-to-r from-purple-500 to-blue-600">
              <Save className="w-4 h-4 mr-2" />
              Post Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Job Details Dialog */}
      <Dialog open={!!showJobDetails} onOpenChange={() => setShowJobDetails(null)}>
        <DialogContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Job Details</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedJob.title}</h3>
                <p className="text-muted-foreground">{selectedJob.client}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-[oklch(0.12_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                  <p className="text-xs text-muted-foreground">Salary</p>
                  <p className="text-white font-medium">{selectedJob.salary}</p>
                </div>
                <div className="p-3 rounded-lg bg-[oklch(0.12_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                  <p className="text-xs text-muted-foreground">Applications</p>
                  <p className="text-white font-medium">{selectedJob.applications}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Description</p>
                <p className="text-sm text-white">{selectedJob.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    selectedJob.status === 'active' && 'border-green-500/30 text-green-400',
                    selectedJob.status === 'paused' && 'border-yellow-500/30 text-yellow-400',
                    selectedJob.status === 'filled' && 'border-blue-500/30 text-blue-400'
                  )}
                >
                  {selectedJob.status}
                </Badge>
                <span className="text-sm text-muted-foreground">Posted: {selectedJob.posted}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowJobDetails(null)} className="bg-gradient-to-r from-purple-500 to-blue-600">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
