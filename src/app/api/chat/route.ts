import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  
  // Debug: Check if API key exists
  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: 'GROQ_API_KEY not found in environment variables',
      debug: 'Please add GROQ_API_KEY in Vercel Settings > Environment Variables'
    }, { status: 500 });
  }

  // Debug: Check API key format
  if (!apiKey.startsWith('gsk_')) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key format',
      debug: 'API key should start with "gsk_"'
    }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { messages } = body;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant for a recruitment company. Be professional and concise.' },
          ...(messages || [])
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `Groq API Error (${response.status})`,
        debug: responseText,
        keyPreview: apiKey.substring(0, 10) + '...'
      }, { status: 500 });
    }

    const data = JSON.parse(responseText);
    const message = data.choices?.[0]?.message?.content || 'No response';

    return NextResponse.json({
      success: true,
      message: message
    });

  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: 'Request failed',
      debug: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
