'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  User,
  Building2,
  Key,
  Bell,
  Palette,
  Globe,
  Shield,
  CreditCard,
  Save,
  Upload,
  Check,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
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
  DialogTrigger,
} from '@/components/ui/dialog';

interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  avatar: string;
  initials: string;
}

interface CompanySettings {
  name: string;
  industry: string;
  size: string;
  website: string;
  description: string;
  logo: string;
}

export function SettingsModule() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Tommy Burman',
    email: 'tommy@talentsolutionsmm.com',
    company: 'Talent Solutions Myanmar',
    role: 'Owner',
    phone: '+95 9 123 456 789',
    avatar: '',
    initials: 'TB'
  });

  const [company, setCompany] = useState<CompanySettings>({
    name: 'Talent Solutions Myanmar',
    industry: 'Recruitment & Staffing',
    size: '11-50',
    website: 'https://talentsolutionsmm.com',
    description: 'Premier recruitment agency connecting top talent with leading companies in Myanmar.',
    logo: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: true,
    marketing: false,
    candidates: true,
    clients: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'Asia/Yangon',
    dateFormat: 'DD/MM/YYYY',
    currency: 'USD'
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)] flex-wrap h-auto gap-1">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="company" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Building2 className="w-4 h-4 mr-2" />
              Company
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Palette className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="flex-1 p-4 m-0 overflow-auto">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Avatar Section */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white">Profile Picture</CardTitle>
                <CardDescription>Upload your professional photo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-purple-500/30">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-2xl font-bold">
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Full Name</Label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value, initials: e.target.value.split(' ').map(n => n[0]).join('').toUpperCase() })}
                      className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Email</Label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Role</Label>
                    <Input
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Phone</Label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
            >
              {saving ? (
                'Saving...'
              ) : saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Saved Successfully!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="company" className="flex-1 p-4 m-0 overflow-auto">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Company Logo */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white">Company Logo</CardTitle>
                <CardDescription>Upload your company logo for branding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-purple-400" />
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <p className="text-xs text-muted-foreground">PNG or SVG recommended. Transparent background.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white">Company Information</CardTitle>
                <CardDescription>Your company details for proposals and communications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Company Name</Label>
                  <Input
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                    className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Industry</Label>
                    <Select value={company.industry} onValueChange={(value) => setCompany({ ...company, industry: value })}>
                      <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                        <SelectItem value="Recruitment & Staffing">Recruitment & Staffing</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Company Size</Label>
                    <Select value={company.size} onValueChange={(value) => setCompany({ ...company, size: value })}>
                      <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="200+">200+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Website</Label>
                  <Input
                    value={company.website}
                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                    className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={company.description}
                    onChange={(e) => setCompany({ ...company, description: e.target.value })}
                    className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
            >
              {saving ? 'Saving...' : saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Saved Successfully!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="flex-1 p-4 m-0 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                  <div>
                    <h4 className="text-white font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                  <div>
                    <h4 className="text-white font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                  <div>
                    <h4 className="text-white font-medium">Weekly Report</h4>
                    <p className="text-sm text-muted-foreground">Get weekly performance summary</p>
                  </div>
                  <Switch
                    checked={notifications.weekly}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weekly: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                  <div>
                    <h4 className="text-white font-medium">Candidate Updates</h4>
                    <p className="text-sm text-muted-foreground">Notifications about candidate activities</p>
                  </div>
                  <Switch
                    checked={notifications.candidates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, candidates: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                  <div>
                    <h4 className="text-white font-medium">Client Updates</h4>
                    <p className="text-sm text-muted-foreground">Notifications about client activities</p>
                  </div>
                  <Switch
                    checked={notifications.clients}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, clients: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="flex-1 p-4 m-0 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white">App Preferences</CardTitle>
                <CardDescription>Customize your dashboard experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Theme</Label>
                    <Select value={preferences.theme} onValueChange={(value) => setPreferences({ ...preferences, theme: value })}>
                      <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Language</Label>
                    <Select value={preferences.language} onValueChange={(value) => setPreferences({ ...preferences, language: value })}>
                      <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="my">Myanmar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Timezone</Label>
                    <Select value={preferences.timezone} onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}>
                      <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                        <SelectItem value="Asia/Yangon">Asia/Yangon (GMT+6:30)</SelectItem>
                        <SelectItem value="Asia/Bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                        <SelectItem value="Asia/Singapore">Asia/Singapore (GMT+8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Date Format</Label>
                    <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}>
                      <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Currency</Label>
                  <Select value={preferences.currency} onValueChange={(value) => setPreferences({ ...preferences, currency: value })}>
                    <SelectTrigger className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="MMK">MMK (K)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="SGD">SGD (S$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="flex-1 p-4 m-0 overflow-auto">
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white">Change Password</CardTitle>
                <CardDescription>Update your password regularly for security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Current Password</Label>
                  <Input type="password" className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">New Password</Label>
                  <Input type="password" className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Confirm New Password</Label>
                  <Input type="password" className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)] text-white" />
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white">API Keys</CardTitle>
                <CardDescription>Manage your API integration keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-[oklch(0.15_0.02_280)] border border-[oklch(0.25_0.03_280)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Groq API Key</h4>
                      <p className="text-sm text-muted-foreground font-mono">gsk_...Ru0c</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                </div>
                <Button variant="outline" className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                  <Key className="w-4 h-4 mr-2" />
                  Update API Key
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)] border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out from All Devices
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                    <DialogHeader>
                      <DialogTitle className="text-white">Sign Out Confirmation</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Are you sure you want to sign out from all devices? You will need to log in again.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowLogoutDialog(false)} className="bg-[oklch(0.15_0.02_280)] border-[oklch(0.25_0.03_280)]">
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={() => setShowLogoutDialog(false)}>
                        Sign Out
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="flex-1 p-4 m-0 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-[oklch(0.12_0.02_280)] border-[oklch(0.25_0.03_280)]">
              <CardHeader>
                <CardTitle className="text-white">Current Plan</CardTitle>
                <CardDescription>Your subscription details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Free Plan</h3>
                      <p className="text-muted-foreground">Basic features for small teams</p>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Current</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-white">✓ AI Chat Assistant</p>
                    <p className="text-white">✓ LinkedIn Post Generator</p>
                    <p className="text-white">✓ Content Studio</p>
                    <p className="text-muted-foreground">✗ Advanced Analytics</p>
                    <p className="text-muted-foreground">✗ Team Collaboration</p>
                    <p className="text-muted-foreground">✗ Custom Branding</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600">
                  Upgrade to Pro Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
