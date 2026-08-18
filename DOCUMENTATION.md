# GBP Growth Pro - Complete Documentation

## Overview

GBP Growth Pro is a comprehensive production-ready SaaS platform for managing Google Business Profiles, WhatsApp Business integration, AI-powered SEO tools, and CRM features.

## 🚀 Features

### Core Modules
- **Google Business Profile Management**: Connect multiple Google accounts, manage business locations, sync reviews and insights
- **Review Management**: AI-powered review replies, sentiment analysis, bulk operations, CSV export
- **Google Posts**: Create, schedule, and publish posts with AI content generation
- **Performance Analytics**: Real-time dashboards with charts, competitor comparison, revenue tracking
- **Local SEO Audit**: AI-powered scoring, NAP consistency, keyword analysis, optimization suggestions
- **AI SEO Generator**: Generate business descriptions, products, services, FAQs, and meta descriptions
- **WhatsApp Business Integration**: Official WhatsApp Cloud API, real-time chat, automation flows
- **CRM**: Pipeline management, deal tracking, tasks, notes, activities
- **Contacts**: Import/export, segmentation, custom fields, tags
- **Broadcast**: Send bulk messages with approved templates, scheduling, delivery reports
- **Automation**: Visual flow builder, AI-powered chatbots, knowledge base training
- **Appointments**: Booking calendar, Google/Outlook sync, AI booking assistant
- **Billing**: Stripe integration, subscription management, usage tracking

### Technical Features
- **Authentication**: Google OAuth, JWT tokens, refresh tokens, 2FA support
- **Security**: Helmet, CORS, rate limiting, RBAC, encryption, webhook signature validation
- **Background Jobs**: BullMQ + Redis for async processing
- **Real-time**: Socket.IO for live updates
- **Storage**: Cloudinary for media management
- **Email**: Resend for transactional emails
- **AI Integration**: OpenAI GPT-5, Google Gemini, Claude

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Shadcn UI, Radix UI
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Cache**: Redis
- **Queue**: BullMQ
- **Real-time**: Socket.IO

### Integrations
- **Google APIs**: Business Profile, OAuth, Places, Geocoding, Maps
- **WhatsApp**: Official Business Cloud API
- **AI**: OpenAI, Anthropic (Claude), Google Gemini
- **Payments**: Stripe
- **Storage**: Cloudinary
- **Email**: Resend

### Deployment
- **Containerization**: Docker
- **Reverse Proxy**: NGINX
- **Process Manager**: PM2

## 📋 Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Redis 7+
- Docker & Docker Compose (optional)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd gbp-growth-pro
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: Secret for JWT tokens
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `OPENAI_API_KEY`: OpenAI API key (for AI features)
- `STRIPE_SECRET_KEY`: Stripe secret key (for payments)

### 4. Set up the database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed
```

### 5. Start the development server

```bash
# Start both Next.js frontend and Express backend
npm run dev

# Or start separately:
npm run dev:next    # Frontend on port 3000
npm run dev:server # Backend on port 3001
```

Visit [http://localhost:3000](http://localhost:3000) for the frontend and [http://localhost:3001](http://localhost:3001) for the backend API.

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services included:
- PostgreSQL (port 5432)
- Redis (port 6379)
- Next.js + Express (ports 3000, 3001)
- NGINX (ports 80, 443)
- BullMQ Board (port 3002)

### Manual Docker Build

```bash
# Build the image
docker build -t gbp-growth-pro .

# Run the container
docker run -p 3000:3000 -p 3001:3001 gbp-growth-pro
```

## 📁 Project Structure

```
gbp-growth-pro/
├── app/                      # Next.js App Router
│   ├── (dashboard)/         # Dashboard routes
│   ├── (auth)/              # Authentication routes
│   ├── (marketing)/         # Marketing pages
│   ├── api/                 # API routes (Next.js)
│   └── layout.tsx           # Root layout
├── server/                   # Express backend
│   ├── controllers/         # Route controllers
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── services/            # Business logic
│   ├── jobs/                # BullMQ jobs
│   └── index.ts             # Server entry point
├── components/              # React components
│   ├── shared/              # Shared components
│   ├── dashboard/           # Dashboard components
│   └── marketing/           # Marketing components
├── lib/                     # Utilities
├── prisma/                  # Prisma ORM
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seed
├── public/                  # Static assets
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
├── nginx.conf               # NGINX configuration
└── package.json             # Dependencies
```

## 🔧 API Documentation

### Authentication Endpoints

- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/2fa/enable` - Enable 2FA
- `POST /api/auth/2fa/verify` - Verify 2FA

### Business Profile Endpoints

- `GET /api/business-profiles` - List business profiles
- `GET /api/business-profiles/:id` - Get business profile details
- `PUT /api/business-profiles/:id` - Update business profile
- `POST /api/business-profiles/:id/publish` - Publish changes
- `POST /api/business-profiles/:id/rollback/:versionId` - Rollback to version

### Review Endpoints

- `GET /api/reviews` - List reviews with filters
- `POST /api/reviews/:id/reply` - Reply to review
- `POST /api/reviews/:id/ai-reply` - Generate AI reply
- `POST /api/reviews/sync` - Sync reviews from Google
- `GET /api/reviews/export/csv` - Export reviews as CSV

### WhatsApp Endpoints

- `GET /api/whatsapp/accounts` - List WhatsApp accounts
- `POST /api/whatsapp/accounts` - Connect WhatsApp account
- `GET /api/whatsapp/conversations` - List conversations
- `POST /api/whatsapp/conversations/:id/messages` - Send message

### AI Endpoints

- `POST /api/ai/generate` - Generate AI content
- `GET /api/ai/generated` - List generated content
- `PUT /api/ai/settings` - Update AI settings

## 🔐 Security

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Rate limiting on all API endpoints
- Helmet.js for security headers
- CORS configuration
- Webhook signature validation
- Encrypted sensitive data (API keys, tokens)
- 2FA support

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm test -- --coverage
```

## 📊 Monitoring

- **BullMQ Board**: Monitor background jobs at `http://localhost:3002`
- **Logs**: Check `logs/` directory for application logs
- **Health Check**: `GET /health` endpoint for service health

## 🚀 Deployment

### Production Build

```bash
# Build frontend
npm run build:next

# Build backend
npm run build:server

# Or build both
npm run build
```

### Start Production Server

```bash
# Start both services
npm start

# Or separately
npm run start:next
npm run start:server
```

### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@gbpgrowth.com or open an issue in the repository.

## 🙏 Acknowledgments

- Google Business Profile API
- WhatsApp Business Cloud API
- OpenAI, Anthropic, and Google for AI capabilities
- The open-source community for the amazing tools and libraries
