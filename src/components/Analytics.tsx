'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Eye,
  Heart,
  Share,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const metrics = [
  { 
    label: 'LinkedIn Reach', 
    value: '45.2K', 
    change: '+12.5%', 
    trend: 'up',
    icon: Eye,
    color: 'from-blue-500 to-cyan-500',
    description: 'Total impressions this month'
  },
  { 
    label: 'Engagement Rate', 
    value: '4.8%', 
    change: '+2.3%', 
    trend: 'up',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    description: 'Average engagement per post'
  },
  { 
    label: 'Candidates in Pipeline', 
    value: '156', 
    change: '+18', 
    trend: 'up',
    icon: Users,
    color: 'from-purple-500 to-violet-500',
    description: 'Active candidates across all stages'
  },
  { 
    label: 'Active Jobs', 
    value: '23', 
    change: '-3', 
    trend: 'down',
    icon: Briefcase,
    color: 'from-orange-500 to-amber-500',
    description: 'Open positions currently recruiting'
  },
];

const weeklyEngagement = [
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 82 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 95 },
  { day: 'Fri', value: 78 },
  { day: 'Sat', value: 32 },
  { day: 'Sun', value: 28 },
];

const pipelineData = [
  { stage: 'Sourced', count: 45, percentage: 100 },
  { stage: 'Screened', count: 32, percentage: 71 },
  { stage: 'Interviewed', count: 18, percentage: 40 },
  { stage: 'Offer', count: 8, percentage: 18 },
  { stage: 'Hired', count: 5, percentage: 11 },
];

const revenueData = [
  { month: 'Jan', revenue: 45000, forecast: 42000 },
  { month: 'Feb', revenue: 52000, forecast: 50000 },
  { month: 'Mar', revenue: 48000, forecast: 55000 },
  { month: 'Apr', revenue: 61000, forecast: 58000 },
  { month: 'May', revenue: 55000, forecast: 60000 },
  { month: 'Jun', revenue: 68000, forecast: 65000 },
];

const topPerformingContent = [
  { title: '5 Tips for Remote Hiring', type: 'LinkedIn Post', reach: 12500, engagement: 8.2 },
  { title: 'Senior Developer Job Spot', type: 'Job Posting', reach: 8900, engagement: 6.5 },
  { title: 'Company Culture Spotlight', type: 'LinkedIn Post', reach: 7200, engagement: 5.8 },
  { title: 'Industry Salary Guide', type: 'Blog Article', reach: 6500, engagement: 4.2 },
];

export function Analytics() {
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="h-full flex flex-col overflow-auto p-4 space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <Card key={i} className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn('w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center', metric.color)}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      metric.trend === 'up' 
                        ? 'border-green-500/30 text-green-400 bg-green-500/10' 
                        : 'border-red-500/30 text-red-400 bg-red-500/10'
                    )}
                  >
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Weekly Engagement Chart */}
        <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Weekly Engagement
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              LinkedIn post engagement by day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyEngagement.map((day, i) => {
                const max = Math.max(...weeklyEngagement.map(d => d.value));
                const height = (day.value / max) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center justify-end h-24">
                      <div
                        className="w-full max-w-[30px] rounded-t bg-gradient-to-t from-purple-600 to-blue-500 relative group cursor-pointer"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[oklch(0.2_0.03_280)] text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          {day.value}%
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-2">{day.day}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Funnel */}
        <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              Pipeline Funnel
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Candidate flow through stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pipelineData.map((stage, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white">{stage.stage}</span>
                    <span className="text-muted-foreground">{stage.count}</span>
                  </div>
                  <div className="h-2 bg-[oklch(0.2_0.03_280)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Revenue Trend
            </CardTitle>
            <CardDescription className="text-muted-forecast">
              Actual vs forecast (in thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {revenueData.map((data, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-8">{data.month}</span>
                  <div className="flex-1 h-4 bg-[oklch(0.2_0.03_280)] rounded overflow-hidden relative">
                    {/* Forecast bar */}
                    <div
                      className="absolute h-full bg-purple-500/30 rounded"
                      style={{ width: `${(data.forecast / maxRevenue) * 100}%` }}
                    />
                    {/* Actual bar */}
                    <div
                      className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded"
                      style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-white w-12 text-right">
                    ${(data.revenue / 1000).toFixed(0)}K
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded" />
                <span className="text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500/30 rounded" />
                <span className="text-muted-foreground">Forecast</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Content */}
      <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            Top Performing Content
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Content with highest reach and engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topPerformingContent.map((content, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)] hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-[oklch(0.2_0.03_280)] text-xs">
                    {content.type}
                  </Badge>
                  <span className="text-lg font-bold text-white">#{i + 1}</span>
                </div>
                <h4 className="font-medium text-white text-sm mb-3">{content.title}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Reach</p>
                    <p className="text-white font-medium">{content.reach.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engagement</p>
                    <p className="text-white font-medium">{content.engagement}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
