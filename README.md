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
- **Development**: Turbopack, ESLint

## Project Structure

```
src/
├── app/
│   ├── api/chat/          # AI chat API route
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with Jotai Provider
│   └── page.tsx           # Home page
├── components/
│   ├── ChatInterface.tsx  # Main chat interface
│   └── SettingsPanel.tsx  # Settings configuration panel
└── store/
    └── atoms.ts           # Jotai state atoms
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wyle-timing-xx/ai-agent-vercel-next1.git
   cd ai-agent-vercel-next1
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Basic Chat

1. Start typing in the message input at the bottom
2. Press Enter or click the Send button
3. Watch as the AI responds in real-time with streaming

### Customizing Settings

1. Click the "Settings" button in the header
2. Adjust the following options:
   - **Model**: Choose between GPT-3.5 Turbo, GPT-4, or GPT-4 Turbo
   - **Temperature**: Control response creativity (0 = conservative, 1 = creative)
   - **Max Tokens**: Set the maximum response length
   - **Agent Name**: Customize the AI assistant's name
   - **Agent Role**: Define the assistant's role/persona
   - **Traits**: Add personality traits (comma-separated)

### State Management with Jotai

The app uses Jotai atoms for state management:

- `messagesAtom`: Stores chat messages
- `inputAtom`: Current input value
- `isLoadingAtom`: Loading state
- `chatConfigAtom`: Chat configuration (model, temperature, etc.)
- `agentPersonalityAtom`: Agent personality settings
- `clearChatAtom`: Action to clear chat history

## Key Features

### Vercel AI SDK Integration

The project leverages the Vercel AI SDK for:
- Streaming AI responses
- Message handling
- OpenAI integration
- Real-time updates

### Jotai State Management

Benefits of using Jotai:
- **Atomic**: Bottom-up approach to state management
- **Reactive**: Components automatically re-render on state changes  
- **TypeScript**: Full TypeScript support
- **Performance**: Only re-renders components that use changed atoms
- **Simple**: Minimal boilerplate compared to other state management solutions

## Deployment

### Deploy to Vercel

1. **Push to GitHub** (if not already done)
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add your `OPENAI_API_KEY` environment variable
   - Deploy

### Environment Variables for Production

Make sure to set these environment variables in your deployment platform:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -am 'Add some feature'`
5. Push: `git push origin feature-name`
6. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or issues, please:
1. Check the [Issues](https://github.com/wyle-timing-xx/ai-agent-vercel-next1/issues) page
2. Create a new issue if needed
3. Star the repo if you found it helpful! ⭐
