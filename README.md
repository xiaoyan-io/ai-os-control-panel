# AI OS Control Panel

Web dashboard for managing AI OS templates and deployments.

## Features

- **Template Management**: Browse and view available OS templates
- **Instance Deployment**: Deploy AI OS instances to target nodes
- **Instance Management**: View and manage deployed instances
- **Multi-Provider Support**: Connect to various AI API providers

## Supported API Providers

| Provider | Base URL |
|----------|----------|
| NetworkIO | `https://api.networkio.nyc.mn/v1` |
| CLIProxyAPI | `https://api.cli-proxy.com/v1` |
| OpenAI | `https://api.openai.com/v1` |
| Google Gemini | `https://generativelanguage.googleapis.com/v1` |
| Anthropic Claude | `https://api.anthropic.com` |
| 百度千帆 | `https://dash.qianfan.chat/v1` |
| 腾讯混元 | `https://dash.abcgpt.com/v1` |
| MiniMax | `https://api.minimax.chat/v1` |
| DeepSeek | `https://api.deepseek.com/v1` |
| 硅基流动 | `https://api.siliconflow.cn/v1` |

## Available Templates

- Boss Secretary OS (company)
- Chat Sales OS (sales)
- Site Report OS (construction)
- Personal OS (personal)
- Family Care OS (personal)
- Alan Boss OS (personal-use)
- Alan Sales OS (personal-use)
- Alan Personal OS (personal-use)
- Alan Family Care OS (personal-use)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your settings
nano .env.local

# Run development server
npm run dev
```

## Build for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

## Deployment

The app can be deployed to any Node.js hosting platform:
- Vercel
- Railway
- Render
- Docker
- Cloud Run

## Pages

- `/` - Dashboard
- `/templates` - Browse OS templates
- `/deploy` - Deploy new instance
- `/instances` - Manage deployed instances
- `/settings` - Configuration

## Configuration

Set API credentials via:
- Environment variables in `.env.local`
- Or via the Deploy form when creating an instance
