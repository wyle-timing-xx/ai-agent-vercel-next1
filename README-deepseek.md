# AI Agent with DeepSeek Integration

This project has been migrated from OpenAI to DeepSeek AI to provide more cost-effective and efficient AI capabilities.

## What Changed

### 🔄 Migration from OpenAI to DeepSeek

- **API Provider**: Changed from OpenAI to DeepSeek AI
- **Model**: Now using `deepseek-chat` model instead of `gpt-3.5-turbo`
- **Environment Variable**: `OPENAI_API_KEY` → `DEEPSEEK_API_KEY`
- **Base URL**: Using `https://api.deepseek.com/v1`

### ✅ Benefits of DeepSeek

1. **Cost-effective**: Significantly lower API costs compared to OpenAI
2. **Performance**: Competitive performance for most use cases
3. **Compatibility**: Uses OpenAI-compatible API format
4. **Chinese Language Support**: Better support for Chinese language tasks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- A DeepSeek API key (get one at [https://platform.deepseek.com](https://platform.deepseek.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wyle-timing-xx/ai-agent-vercel-next1.git
cd ai-agent-vercel-next1
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your DeepSeek API key:
```
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### DeepSeek API Configuration

The application is configured to use DeepSeek's API with the following settings:

- **Base URL**: `https://api.deepseek.com/v1`
- **Model**: `deepseek-chat`
- **API Key**: Set via `DEEPSEEK_API_KEY` environment variable

### Environment Variables

```bash
# Required
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Optional
AI_SDK_LOG_LEVEL=info
```

## 📝 API Usage

The chat API endpoint (`/api/chat`) now uses DeepSeek instead of OpenAI:

```typescript
import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: deepseek('deepseek-chat'),
    messages,
    system: `You are a helpful AI assistant powered by DeepSeek. You can help users with various tasks including:
    - Answering questions
    - Providing explanations
    - Helping with problem-solving
    - Creative writing
    - Code assistance
    
    Be concise, helpful, and friendly in your responses.`,
  });

  return result.toDataStreamResponse();
}
```

## 🚀 Deployment

### Vercel Deployment

1. Deploy to Vercel:
```bash
vercel --prod
```

2. Set environment variables in Vercel dashboard:
   - `DEEPSEEK_API_KEY`: Your DeepSeek API key

### Other Platforms

Make sure to set the `DEEPSEEK_API_KEY` environment variable in your deployment platform.

## 🔄 Migration Notes

If you're migrating from the previous OpenAI version:

1. **API Key**: Replace `OPENAI_API_KEY` with `DEEPSEEK_API_KEY`
2. **Model**: The code now uses `deepseek-chat` instead of `gpt-3.5-turbo`
3. **Functionality**: All existing functionality remains the same
4. **Performance**: You may notice faster response times and lower costs

## 🆘 Troubleshooting

### Common Issues

1. **API Key Error**: Make sure `DEEPSEEK_API_KEY` is set correctly
2. **Model Not Found**: Ensure you're using `deepseek-chat` model name
3. **Rate Limits**: DeepSeek has different rate limits than OpenAI

### Getting Help

- Check the [DeepSeek API Documentation](https://platform.deepseek.com/api-docs)
- Review the original [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for general issues
- Open an issue in this repository

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original project template
- DeepSeek AI for providing cost-effective AI capabilities
- Vercel AI SDK for seamless integration
