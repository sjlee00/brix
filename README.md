# Brix - Home Management Platform

A comprehensive web application for homeowners to centrally manage their properties, including expense tracking, property value monitoring, maintenance scheduling, and marketplace services.

## 🚀 Features

- **Financial Management**: Track home expenses, budgets, and generate tax reports
- **Property Value Tracking**: Monitor market value, equity, and ROI
- **Maintenance Management**: Schedule tasks, track service history, and manage warranties
- **Financial Tools**: Escrow management and contractor payment processing
- **Marketplace**: Access to home services and product recommendations
- **Mobile Ready**: Responsive design optimized for all devices

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── expenses/          # Expense management
│   ├── maintenance/       # Maintenance scheduling
│   ├── property/          # Property management
│   └── marketplace/       # Service marketplace
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── layout/           # Layout components
├── features/             # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configs
├── store/                # Zustand stores
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd brix
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your Supabase project:
   - Create a new Supabase project
   - Get your project URL and anon key
   - Update `.env.local` with your Supabase credentials

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄 Database Schema

The application uses Supabase with the following main tables:

- `users` - User profiles and authentication
- `properties` - Property information and details
- `expenses` - Home-related expenses and receipts
- `maintenance_tasks` - Maintenance scheduling and tracking
- `budgets` - Budget management and limits
- `contractors` - Service provider information

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Adding New Components

Use Shadcn/ui CLI to add new components:

```bash
npx shadcn@latest add [component-name]
```

### Code Style

- Use TypeScript for all new code
- Follow the existing folder structure
- Use Tailwind CSS for styling
- Implement proper error handling
- Write descriptive commit messages

## 🚀 Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@brix.com or join our Discord community.

---

Built with ❤️ for homeowners everywhere.