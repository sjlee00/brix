import { Home } from "lucide-react"
import Link from "next/link"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Home className="size-4" />
            </div>
            Brix
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <Home className="size-16 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Welcome to Brix</h2>
            <p className="text-lg opacity-90">
              Your comprehensive home management platform
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
