import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Blank Page</h1>
      <p className="mb-4">Ready to build with shadcn components</p>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Button Component</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button>Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Card Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>This is a basic card with just content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here. This is where you can put any information you want to display.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>This card includes a footer section.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card has both content and a footer with action buttons.</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm">Action</Button>
                <Button variant="outline" size="sm">Cancel</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login Card</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="m@example.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password"
                      type="password" 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Login</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Input Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email-input">Email</Label>
              <Input id="email-input" type="email" placeholder="Email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-input">Password</Label>
              <Input id="password-input" type="password" placeholder="Password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text-input">Text</Label>
              <Input id="text-input" type="text" placeholder="Enter text here" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number-input">Number</Label>
              <Input id="number-input" type="number" placeholder="123" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Badge Component</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-500 text-white">Custom Blue</Badge>
              <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
              <Badge variant="destructive" className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">99</Badge>
              <Badge variant="outline" className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">20+</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tabs Component</h2>
          <Tabs defaultValue="account" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you&apos;re done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@johndoe" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your application settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Input id="theme" defaultValue="Light" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input id="language" defaultValue="English" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Alert Component</h2>
          <div className="space-y-4 max-w-2xl">
            <Alert>
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully. This is a success alert with a title and description.
              </AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was an error processing your request. Please try again later.
              </AlertDescription>
            </Alert>
            
            <Alert>
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational alert without an icon. It provides important information to the user.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}