import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an expert AI Business Agent acting as a Chief Marketing Officer (CMO) and Business Manager for a recruitment company. Your expertise includes:

1. **Recruitment Industry Knowledge**: Deep understanding of hiring processes, talent acquisition, candidate sourcing, and recruitment metrics.

2. **LinkedIn Marketing Expertise**: You specialize in creating engaging LinkedIn content, thought leadership posts, and recruitment marketing strategies. You know best practices for LinkedIn algorithm optimization.

3. **Business Strategy**: You provide strategic advice on growing recruitment businesses, improving client relationships, and scaling operations.

4. **Content Creation**: You excel at writing:
   - LinkedIn posts (thought leadership, job postings, company culture, industry insights)
   - Email templates for client and candidate communication
   - Marketing copy and campaign content
   - Job descriptions that attract top talent
   - Proposal templates for client pitches

5. **Data-Driven Insights**: You help analyze recruitment metrics, LinkedIn engagement data, and business KPIs to make informed decisions.

**Your Communication Style:**
- Professional yet approachable
- Concise but comprehensive
- Action-oriented with practical recommendations
- Industry-aware with current trends and best practices

When asked to create content, always format it clearly and provide variations when helpful. When giving advice, consider both immediate tactical steps and long-term strategic implications.

You are here to help the recruitment team succeed by providing expert guidance on marketing, business development, and content creation.`;

async function callOpenAI(messages: Array<{role: string, content: string}>) {
  const OpenAI = (await import('openai')).default;
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  const openai = new OpenAI({ apiKey });
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages as Array<{role: 'system' | 'user' | 'assistant', content: string}>,
    temperature: 0.7,
    max_tokens: 2000,
  });

  return completion.choices[0]?.message?.content || 'I apologize, I was unable to generate a response.';
}

async function callZAI(messages: Array<{role: string, content: string}>) {
  const ZAI = (await import('z-ai-web-dev-sdk')).default;
  const zai = await ZAI.create();
  
  const completion = await zai.chat.completions.create({
    messages: messages as Array<{role: 'system' | 'user' | 'assistant', content: string}>,
    temperature: 0.7,
    max_tokens: 2000,
  });

  return completion.choices[0]?.message?.content || 'I apologize, I was unable to generate a response.';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, context } = body;

    // Build the messages array with the system prompt
    const chatMessages: Array<{role: string, content: string}> = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(messages || [])
    ];

    // Add context if provided
    if (context) {
      chatMessages.push({ 
        role: 'user', 
        content: `Context for this request: ${context}` 
      });
    }

    let assistantMessage: string;

    // Try OpenAI first (for Vercel), then fall back to ZAI (for local)
    if (process.env.OPENAI_API_KEY) {
      assistantMessage = await callOpenAI(chatMessages);
    } else {
      try {
        assistantMessage = await callZAI(chatMessages);
      } catch {
        return NextResponse.json({
          success: false,
          error: 'AI service not configured. Please add OPENAI_API_KEY to your environment variables.',
          needsApiKey: true
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: assistantMessage,
      timestamp: new Date().toISOString()
    });

  } catch (error: unknown) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process your request. Please try again.',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
