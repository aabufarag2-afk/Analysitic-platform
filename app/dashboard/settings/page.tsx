"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Key, CreditCard, Bell, Shield, Zap } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Name</Label>
                  <Input defaultValue="Anonymous Trader" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="trader@example.com" type="email" className="bg-secondary" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API access for external integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50 flex items-center justify-between">
                <div>
                  <p className="font-medium">Production Key</p>
                  <p className="text-sm text-muted-foreground font-mono">cx_prod_••••••••••••</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-chart-2 border-chart-2/30">
                    Active
                  </Badge>
                  <Button variant="outline" size="sm">
                    Reveal
                  </Button>
                  <Button variant="outline" size="sm">
                    Regenerate
                  </Button>
                </div>
              </div>
              <Button variant="outline">
                <Key className="h-4 w-4 mr-2" />
                Create New Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Whale Movements", description: "Large wallet transactions over threshold" },
                { label: "LP Changes", description: "Liquidity pool modifications" },
                { label: "Price Anomalies", description: "Unusual price movements" },
                { label: "Rug Warnings", description: "Critical rug pull risk alerts" },
                { label: "Volume Spikes", description: "Abnormal trading volume" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Manage your plan and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 rounded-lg bg-secondary border-2 border-primary">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Free Tier</span>
                  </div>
                  <Badge>Current Plan</Badge>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• 5 AI queries per day</li>
                  <li>• 3 active alerts</li>
                  <li>• Basic analytics</li>
                  <li>• Community support</li>
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-chart-3" />
                    <span className="font-semibold">Pro</span>
                  </div>
                  <span className="text-2xl font-bold">$29/mo</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Unlimited AI queries</li>
                  <li>• 50 active alerts</li>
                  <li>• Advanced rug detection</li>
                  <li>• Priority support</li>
                  <li>• API access</li>
                </ul>
                <Button className="w-full">Upgrade to Pro</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
