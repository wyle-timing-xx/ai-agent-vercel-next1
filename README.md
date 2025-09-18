# AI Agent - Vercel AI SDK + Jotai

A modern AI chatbot application built with Next.js 15, Vercel AI SDK, and Jotai for state management.

## Features

- 🤖 **AI Chat Interface**: Interactive chat with OpenAI's GPT models
- 🧠 **State Management**: Powered by Jotai for reactive state management
- ⚡ **Streaming Responses**: Real-time streaming of AI responses using Vercel AI SDK
- 🎛️ **Customizable Settings**: Adjust model parameters, temperature, and agent personality
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🚀 **Next.js 15**: Built on the latest Next.js with App Router
- 📱 **Mobile Responsive**: Optimized for all device sizes

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Jotai
- **AI Integration**: Vercel AI SDK, OpenAI
- **Icons**: Lucide React
- **Package Manager**: PNPM (recommended)
- **Development**: Turbopack, ESLint

## Prerequisites

Before running this project, make sure you have:

- **Node.js** version 18.0 or higher ([Download here](https://nodejs.org/))
- **Package Manager**: PNPM (recommended), npm, or yarn
- **OpenAI API Key** ([Get it here](https://platform.openai.com/api-keys))

### Installing PNPM (Recommended)

If you don't have PNPM installed:

```bash
npm install -g pnpm
```

Or using curl:
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/wyle-timing-xx/ai-agent-vercel-next1.git
cd ai-agent-vercel-next1
```

### Step 2: Install Dependencies

Choose one of the following commands:

```bash
# Using PNPM (recommended)
pnpm install

# Using npm
npm install

# Using yarn
yarn install
```

### Step 3: Configure Environment Variables

1. **Copy the environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` file:**
   ```bash
   # Open with your preferred editor
   nano .env.local
   # or
   code .env.local
   # or
   vim .env.local
   ```

3. **Add your OpenAI API key:**
   ```env
   # Required: OpenAI API Configuration
   OPENAI_API_KEY=sk-your-actual-openai-api-key-here
   
   # Optional: Vercel AI SDK Configuration
   # AI_SDK_LOG_LEVEL=info
   ```

   **⚠️ Important:** 
   - Replace `sk-your-actual-openai-api-key-here` with your actual OpenAI API key
   - Never commit your `.env.local` file to version control
   - The key should start with `sk-` followed by a long string

### Step 4: Run the Development Server

```bash
# Using PNPM (recommended)
pnpm dev

# Using npm
npm run dev

# Using yarn
yarn dev
```

### Step 5: Open in Browser

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

You should see the AI Assistant interface ready to use!

## 🔑 Getting Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key and paste it in your `.env.local` file

**Note:** OpenAI API usage is pay-per-use. Make sure you have billing set up in your OpenAI account.

## Project Structure

```
ai-agent-vercel-next1/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts      # AI chat API endpoint
│   │   ├── favicon.ico
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout with Jotai Provider
│   │   └── page.tsx              # Home page
│   ├── components/
│   │   ├── ChatInterface.tsx     # Main chat interface
│   │   └── SettingsPanel.tsx     # Settings configuration panel
│   └── store/
│       └── atoms.ts              # Jotai state atoms
├── .env.example                  # Environment variables template
├── .env.local                    # Your environment variables (create this)
├── .gitignore
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── pnpm-lock.yaml               # PNPM lock file
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md
```

## Available Scripts

```bash
# Development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Usage Guide

### Basic Chat

1. Start typing in the message input at the bottom
2. Press Enter or click the Send button (📤)
3. Watch as the AI responds in real-time with streaming
4. Continue the conversation naturally

### Customizing Settings

1. Click the "Settings" button in the header
2. Adjust the following options:
   - **Model**: Choose between GPT-3.5 Turbo, GPT-4, or GPT-4 Turbo
   - **Temperature**: Control response creativity (0 = conservative, 1 = creative)
   - **Max Tokens**: Set the maximum response length (100-4000)
   - **Agent Name**: Customize the AI assistant's name
   - **Agent Role**: Define the assistant's role/persona
   - **Traits**: Add personality traits (comma-separated)
3. Click "Save Settings" to apply changes

### Clearing Chat

Click the "Clear Chat" button (🗑️) in the header to start a fresh conversation.

## Troubleshooting

### Common Issues

**1. "OpenAI API key not found" error:**
- Make sure you've created the `.env.local` file
- Verify your API key is correctly set in the file
- Restart the development server after adding the key

**2. Dependencies installation fails:**
- Try deleting `node_modules` and `pnpm-lock.yaml`
- Run `pnpm install` again
- Make sure you have Node.js 18+ installed

**3. Port 3000 already in use:**
- The server will automatically try the next available port
- Or specify a custom port: `pnpm dev -- --port 3001`

**4. Build fails:**
- Run `pnpm lint` to check for code issues
- Make sure all TypeScript errors are resolved
- Verify all environment variables are set

### Performance Tips

- Use **GPT-3.5 Turbo** for faster responses and lower costs
- Adjust **Max Tokens** to control response length and cost
- Lower **Temperature** for more consistent responses

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub** (if not already done)

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables:**
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add: `OPENAI_API_KEY` with your OpenAI API key
   - Set for all environments (Production, Preview, Development)

4. **Deploy:**
   - Click "Deploy"
   - Your app will be available at `https://your-project.vercel.app`

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Use `npm run build` and deploy the `.next` folder
- **Railway**: Connect your GitHub repo and set environment variables
- **Digital Ocean**: Use their App Platform with Node.js
- **AWS/Google Cloud**: Use their respective hosting services

**Remember to set the `OPENAI_API_KEY` environment variable on your deployment platform.**

## State Management with Jotai

The app uses Jotai atoms for state management:

- `messagesAtom`: Stores chat messages
- `inputAtom`: Current input value  
- `isLoadingAtom`: Loading state
- `chatConfigAtom`: Chat configuration (model, temperature, etc.)
- `agentPersonalityAtom`: Agent personality settings
- `clearChatAtom`: Action to clear chat history

### Benefits of Jotai

- **Atomic**: Bottom-up approach to state management
- **Reactive**: Components automatically re-render on state changes  
- **TypeScript**: Full TypeScript support
- **Performance**: Only re-renders components that use changed atoms
- **Simple**: Minimal boilerplate compared to other state management solutions

## API Costs

Be aware that using OpenAI's API incurs costs:
- **GPT-3.5 Turbo**: ~$0.0015 per 1K tokens
- **GPT-4**: ~$0.03 per 1K tokens  
- **GPT-4 Turbo**: ~$0.01 per 1K tokens

Monitor your usage in the [OpenAI Dashboard](https://platform.openai.com/usage).

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `pnpm lint`
5. Commit: `git commit -am 'Add some feature'`
6. Push: `git push origin feature-name`
7. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues:

1. Check this README for common solutions
2. Look through [GitHub Issues](https://github.com/wyle-timing-xx/ai-agent-vercel-next1/issues)
3. Create a new issue with:
   - Your Node.js version (`node --version`)
   - Package manager and version (`pnpm --version`)
   - Error messages (if any)
   - Steps to reproduce the issue

## Acknowledgments

- Built with [Vercel AI SDK](https://sdk.vercel.ai/)
- State management by [Jotai](https://jotai.org/)
- Powered by [Next.js](https://nextjs.org/)
- UI components from [Lucide React](https://lucide.dev/)

---

⭐ **Star this repo if you found it helpful!**