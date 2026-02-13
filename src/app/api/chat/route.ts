import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an expert AI Business Agent acting as a Chief Marketing Officer (CMO) and Business Manager for a recruitment company specializing in talent solutions. You help with LinkedIn marketing, recruitment strategies, content creation, and business development. Be professional, helpful, and provide actionable advice.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'GROQ_API_KEY is not set. Please add it in Vercel Environment Variables.',
      }, { status: 500 });
    }

    const chatMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(messages || [])
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API Error:', response.status, errorText);
      return NextResponse.json({
        success: false,
        error: `API Error: ${response.status} - ${errorText}`,
      }, { status: 500 });
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || 'No response generated.';

    return NextResponse.json({
      success: true,
      message: message,
      timestamp: new Date().toISOString()
    });

  } catch (error: unknown) {
    console.error('Chat Error:', error);
    return NextResponse.json({
      success: false,
      error: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }, { status: 500 });
  }
}
