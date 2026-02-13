import ZAI from 'z-ai-web-dev-sdk';
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, context } = body;

    const zai = await ZAI.create();

    // Build the messages array with the system prompt
    const chatMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...(messages || [])
    ];

    // Add context if provided (e.g., "generate linkedin post about...")
    if (context) {
      chatMessages.push({ 
        role: 'user' as const, 
        content: `Context for this request: ${context}` 
      });
    }

    const completion = await zai.chat.completions.create({
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    const assistantMessage = completion.choices[0]?.message?.content || 'I apologize, I was unable to generate a response. Please try again.';

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
