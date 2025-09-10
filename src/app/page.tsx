import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Manage Your Home,{" "}
            <span className="text-blue-600">Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track expenses, monitor property value, schedule maintenance, and access 
            home services all in one comprehensive platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your Home
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From financial tracking to maintenance scheduling, Brix provides all the tools 
            you need to keep your home in perfect condition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💰 Expense Tracking
              </CardTitle>
              <CardDescription>
                Track all home-related expenses with automatic categorization and receipt storage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Automatic expense categorization</li>
                <li>• Receipt OCR and storage</li>
                <li>• Budget management</li>
                <li>• Tax preparation reports</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏠 Property Value
              </CardTitle>
              <CardDescription>
                Monitor your property's market value and track equity growth over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time market value estimates</li>
                <li>• Equity calculations</li>
                <li>• ROI tracking for improvements</li>
                <li>• Market comparison tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔧 Maintenance
              </CardTitle>
              <CardDescription>
                Schedule and track maintenance tasks with contractor integration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Maintenance calendar</li>
                <li>• Service history tracking</li>
                <li>• Contractor directory</li>
                <li>• Warranty management</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💳 Financial Tools
              </CardTitle>
              <CardDescription>
                Secure escrow management and streamlined contractor payments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Escrow for large projects</li>
                <li>• Contractor payment processing</li>
                <li>• Insurance tracking</li>
                <li>• Tax optimization tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🛒 Marketplace
              </CardTitle>
              <CardDescription>
                Access curated home services and products from verified providers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Service provider directory</li>
                <li>• Product recommendations</li>
                <li>• Reviews and ratings</li>
                <li>• Local deals and offers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📱 Mobile Ready
              </CardTitle>
              <CardDescription>
                Manage your home on-the-go with our mobile-optimized platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Mobile-first design</li>
                <li>• Push notifications</li>
                <li>• Offline capability</li>
                <li>• Quick expense entry</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Simplify Your Home Management?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners who are already using Brix to manage their properties more effectively.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}