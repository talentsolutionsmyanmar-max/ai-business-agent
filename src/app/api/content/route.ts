import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, topic, tone } = body;

    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'GROQ_API_KEY is not set.',
      }, { status: 500 });
    }

    const prompts: Record<string, string> = {
      'linkedin-thought': `Write a professional LinkedIn thought leadership post about: ${topic || 'recruitment industry trends'}. Make it engaging and insightful. Include relevant hashtags.`,
      'linkedin-job': `Write an engaging LinkedIn job posting for: ${topic || 'a tech position'}. Make it compelling to attract top talent.`,
      'linkedin-culture': `Write a LinkedIn post about company culture for a recruitment agency. Topic: ${topic || 'our team values'}.`,
      'linkedin-insights': `Write a LinkedIn post with industry insights about: ${topic || 'hiring trends'}.`,
      'email-candidate': `Write a professional email to a candidate about: ${topic || 'interview follow-up'}.`,
      'job-description': `Write a job description for: ${topic || 'Software Developer'}. Include responsibilities, requirements, and benefits.`,
    };

    const prompt = prompts[type] || prompts['linkedin-thought'];
    const fullPrompt = `${prompt}\n\nTone: ${tone || 'professional'}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are an expert content writer for a recruitment company.' },
          { role: 'user', content: fullPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        error: `API Error: ${response.status}`,
      }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'Unable to generate content.';

    return NextResponse.json({
      success: true,
      content: content,
      timestamp: new Date().toISOString()
    });

  } catch (error: unknown) {
    console.error('Content Error:', error);
    return NextResponse.json({
      success: false,
      error: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }, { status: 500 });
  }
}
