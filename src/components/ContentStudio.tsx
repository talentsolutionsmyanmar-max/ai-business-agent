'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  FileText,
  Mail,
  Briefcase,
  FileCheck,
  Send,
  Copy,
  Check,
  Sparkles,
  PenLine,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

const templates = [
  {
    id: 'linkedin-post',
    title: 'LinkedIn Post',
    description: 'Create engaging LinkedIn content',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    fields: ['topic', 'tone'],
    type: 'linkedin-thought'
  },
  {
    id: 'email-candidate',
    title: 'Candidate Email',
    description: 'Professional email to candidates',
    icon: Mail,
    color: 'from-purple-500 to-violet-500',
    fields: ['candidateName', 'position', 'purpose'],
    type: 'email-candidate'
  },
  {
    id: 'job-description',
    title: 'Job Description',
    description: 'Attractive job postings',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    fields: ['jobTitle', 'company', 'requirements'],
    type: 'job-description'
  },
  {
    id: 'proposal',
    title: 'Client Proposal',
    description: 'Winning service proposals',
    icon: FileCheck,
    color: 'from-orange-500 to-amber-500',
    fields: ['clientName', 'industry', 'services'],
    type: 'proposal'
  },
];

interface GeneratedContent {
  template: string;
  content: string;
  timestamp: Date;
}

export function ContentStudio() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<GeneratedContent[]>([]);

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedTemplate.type,
          topic: formData.topic || formData.jobTitle || formData.clientName || 'General',
          tone: formData.tone || 'professional',
          additionalInfo: JSON.stringify(formData)
        })
      });
      const data = await response.json();
      if (data.success) {
        const newContent: GeneratedContent = {
          template: selectedTemplate.title,
          content: data.content,
          timestamp: new Date()
        };
        setGeneratedContent(newContent);
        setHistory(prev => [newContent, ...prev.slice(0, 9)]);
      }
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderField = (field: string) => {
    const fieldConfig: Record<string, { label: string; placeholder: string; type: string }> = {
      topic: { label: 'Topic', placeholder: 'What would you like to write about?', type: 'text' },
      tone: { label: 'Tone', placeholder: 'Select tone', type: 'select' },
      candidateName: { label: 'Candidate Name', placeholder: 'Enter candidate name', type: 'text' },
      position: { label: 'Position', placeholder: 'Job position', type: 'text' },
      purpose: { label: 'Purpose', placeholder: 'e.g., Interview invitation, Follow-up', type: 'text' },
      jobTitle: { label: 'Job Title', placeholder: 'e.g., Senior React Developer', type: 'text' },
      company: { label: 'Company', placeholder: 'Company name', type: 'text' },
      requirements: { label: 'Key Requirements', placeholder: 'List key skills/requirements', type: 'textarea' },
      clientName: { label: 'Client Name', placeholder: 'Client company name', type: 'text' },
      industry: { label: 'Industry', placeholder: 'Client industry', type: 'text' },
      services: { label: 'Services Needed', placeholder: 'What services are you proposing?', type: 'textarea' },
    };

    const config = fieldConfig[field] || { label: field, placeholder: '', type: 'text' };

    if (config.type === 'select') {
      return (
        <div key={field} className="space-y-2">
          <Label className="text-white text-sm">{config.label}</Label>
          <Select value={formData[field] || ''} onValueChange={(value) => setFormData({ ...formData, [field]: value })}>
            <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
              <SelectValue placeholder={config.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="inspiring">Inspiring</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (config.type === 'textarea') {
      return (
        <div key={field} className="space-y-2">
          <Label className="text-white text-sm">{config.label}</Label>
          <Textarea
            value={formData[field] || ''}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            placeholder={config.placeholder}
            className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white min-h-[80px]"
          />
        </div>
      );
    }

    return (
      <div key={field} className="space-y-2">
        <Label className="text-white text-sm">{config.label}</Label>
        <Input
          value={formData[field] || ''}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          placeholder={config.placeholder}
          className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
        />
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="create" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
            <TabsTrigger value="create" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <PenLine className="w-4 h-4 mr-2" />
              Create Content
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <FileText className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="create" className="flex-1 p-4 m-0 overflow-auto">
          <div className="grid lg:grid-cols-2 gap-4 h-full">
            {/* Input Section */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Content Generator
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  AI-powered content creation for recruitment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Template Selector */}
                <div className="grid grid-cols-2 gap-2">
                  {templates.map((template) => {
                    const Icon = template.icon;
                    const isActive = selectedTemplate.id === template.id;
                    return (
                      <button
                        key={template.id}
                        onClick={() => {
                          setSelectedTemplate(template);
                          setFormData({});
                          setGeneratedContent(null);
                        }}
                        className={cn(
                          'p-3 rounded-lg border text-left transition-all',
                          isActive
                            ? `bg-gradient-to-r ${template.color} border-transparent`
                            : 'bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] hover:border-purple-500/50'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-muted-foreground')} />
                          <span className={cn('text-sm font-medium', isActive ? 'text-white' : 'text-white')}>
                            {template.title}
                          </span>
                        </div>
                        <p className={cn('text-xs mt-1', isActive ? 'text-white/80' : 'text-muted-foreground')}>
                          {template.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Fields */}
                <div className="space-y-3 pt-2 border-t border-[oklch(0.25_0.03_280)]">
                  {selectedTemplate.fields.map(renderField)}
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateContent}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Generated Content</CardTitle>
                  {generatedContent && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {generatedContent.template}
                      </Badge>
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
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <ScrollArea className="h-[400px]">
                    <div className="p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                      <p className="text-sm text-white whitespace-pre-wrap">{generatedContent.content}</p>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Select a template and fill in the details</p>
                      <p className="text-sm mt-1">Your generated content will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="flex-1 p-4 m-0 overflow-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <Card
                  key={template.id}
                  className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] hover:border-purple-500/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setFormData({});
                  }}
                >
                  <CardContent className="p-6">
                    <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center mb-4', template.color)}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-lg">{template.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{template.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {template.fields.map((field) => (
                        <Badge key={field} variant="secondary" className="bg-[oklch(0.2_0.02_280)] text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Custom Template Card */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] border-dashed hover:border-purple-500/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.2_0.02_280)] flex items-center justify-center mb-4">
                  <PenLine className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-white">Custom Template</h3>
                <p className="text-muted-foreground text-sm mt-1 text-center">Create your own template with AI</p>
                <Button variant="outline" className="mt-4 bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="flex-1 p-4 m-0 overflow-auto">
          <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
            <CardHeader>
              <CardTitle className="text-white">Generation History</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your recently generated content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)] hover:border-purple-500/50 transition-colors cursor-pointer"
                      onClick={() => setGeneratedContent(item)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {item.template}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {item.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-white line-clamp-2">{item.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <RefreshCw className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No content generated yet</p>
                  <p className="text-sm mt-1">Start creating content to see your history</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
