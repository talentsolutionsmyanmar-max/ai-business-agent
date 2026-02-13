import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: 'GROQ_API_KEY not found in environment variables',
    }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { type, topic, tone } = body;

    const prompts: Record<string, string> = {
      'linkedin-thought': `Write a professional LinkedIn thought leadership post about: ${topic || 'recruitment industry trends'}. Make it engaging and insightful. Include relevant hashtags. Keep it under 3000 characters.`,
      'linkedin-job': `Write an engaging LinkedIn job posting for: ${topic || 'a tech position'}. Make it compelling to attract top talent. Include relevant hashtags.`,
      'linkedin-culture': `Write a LinkedIn post about company culture for a recruitment agency. Topic: ${topic || 'our team values'}. Make it authentic.`,
      'linkedin-insights': `Write a LinkedIn post with industry insights about: ${topic || 'hiring trends'}. Be informative and thought-provoking.`,
      'email-candidate': `Write a professional email to a candidate about: ${topic || 'interview follow-up'}. Be friendly and professional.`,
      'email-client': `Write a professional email to a client about: ${topic || 'partnership opportunity'}. Be consultative.`,
      'job-description': `Write a job description for: ${topic || 'Software Developer'}. Include responsibilities, requirements, and benefits.`,
      'proposal': `Write a business proposal for recruitment services for: ${topic || 'a client company'}. Include methodology and timeline.`,
      'follow-up': `Write a follow-up message about: ${topic || 'previous conversation'}. Be professional and not pushy.`,
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
          { role: 'system', content: 'You are an expert content writer for a recruitment company. Create professional, engaging content.' },
          { role: 'user', content: fullPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
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
