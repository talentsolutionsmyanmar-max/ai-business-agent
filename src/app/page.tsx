'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { AIChat } from '@/components/AIChat';
import { LinkedInManager } from '@/components/LinkedInManager';
import { MarketingHub } from '@/components/MarketingHub';
import { RecruitmentCRM } from '@/components/RecruitmentCRM';
import { Analytics } from '@/components/Analytics';
import { ContentStudio } from '@/components/ContentStudio';

const moduleConfig = {
  'ai-command': {
    title: 'AI Command Center',
    subtitle: 'Your AI-powered Chief Marketing Officer & Business Advisor',
  },
  'linkedin': {
    title: 'LinkedIn Manager',
    subtitle: 'Create, schedule, and analyze your LinkedIn presence',
  },
  'marketing': {
    title: 'Marketing Hub',
    subtitle: 'Campaigns, content strategy, and marketing insights',
  },
  'recruitment': {
    title: 'Recruitment CRM',
    subtitle: 'Manage candidates, clients, and job positions',
  },
  'analytics': {
    title: 'Analytics Dashboard',
    subtitle: 'Performance metrics and business insights',
  },
  'content': {
    title: 'Content Studio',
    subtitle: 'AI-powered content creation for all your needs',
  },
};

export default function Home() {
  const [activeModule, setActiveModule] = useState('ai-command');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeModule) {
      case 'ai-command':
        return <AIChat />;
      case 'linkedin':
        return <LinkedInManager />;
      case 'marketing':
        return <MarketingHub />;
      case 'recruitment':
        return <RecruitmentCRM />;
      case 'analytics':
        return <Analytics />;
      case 'content':
        return <ContentStudio />;
      default:
        return <AIChat />;
    }
  };

  const config = moduleConfig[activeModule as keyof typeof moduleConfig] || moduleConfig['ai-command'];

  return (
    <div className="flex h-screen bg-[oklch(0.08_0.015_280)] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={config.title} subtitle={config.subtitle} />

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
