import { NextRequest, NextResponse } from 'next/server';

const CONTENT_TEMPLATES: Record<string, string> = {
  'linkedin-thought': `You are a LinkedIn content expert. Create a thought leadership post for a recruitment company. The post should be insightful, professional, and engaging. Use relevant hashtags. Keep it under 3000 characters.`,
  
  'linkedin-job': `You are a recruitment marketing expert. Create an engaging LinkedIn job posting that will attract top talent. Include any relevant details provided. Make it compelling and professional. Use relevant hashtags. Keep it under 3000 characters.`,
  
  'linkedin-culture': `You are an employer branding specialist. Create a LinkedIn post showcasing company culture for a recruitment firm. Make it authentic and engaging to attract both candidates and clients. Use relevant hashtags. Keep it under 3000 characters.`,
  
  'linkedin-insights': `You are a recruitment industry analyst. Create a LinkedIn post sharing valuable industry insights or trends. Be informative and thought-provoking. Use relevant hashtags. Keep it under 3000 characters.`,
  
  'email-candidate': `You are a recruitment specialist. Write a professional email to a candidate. Be personal yet professional. Include clear next steps. Keep it concise.`,
  
  'email-client': `You are a business development specialist. Write a professional email to a client. Be consultative and value-focused. Include clear calls to action. Keep it concise.`,
  
  'job-description': `You are a talent acquisition expert. Create a compelling job description that attracts top talent. Include: role overview, key responsibilities, qualifications, benefits, and why they should join. Make it engaging and clear.`,
  
  'proposal': `You are a recruitment business development expert. Create a compelling service proposal for a potential client. Include: understanding their needs, our solution, methodology, timeline, and pricing framework. Be professional and persuasive.`,
  
  'follow-up': `You are a relationship management expert. Create a follow-up message that maintains engagement without being pushy. Be value-focused and professional.`
};

async function callGroq(prompt: string) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY not configured');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are an expert content creator for the recruitment industry.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'Unable to generate content. Please try again.';
}

async function callZAI(prompt: string) {
  const ZAI = (await import('z-ai-web-dev-sdk')).default;
  const zai = await ZAI.create();
  
  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are an expert content creator for the recruitment industry.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.8,
    max_tokens: 1500,
  });

  return completion.choices[0]?.message?.content || 'Unable to generate content. Please try again.';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, topic, tone, additionalInfo } = body;

    const template = CONTENT_TEMPLATES[type] || CONTENT_TEMPLATES['linkedin-thought'];
    
    const prompt = `${template}

**Topic/Subject:** ${topic || 'General recruitment industry'}
**Tone:** ${tone || 'professional'}
${additionalInfo ? `**Additional Information:** ${additionalInfo}` : ''}

Generate the content now:`;

    let content: string;

    // Try Groq first, then ZAI
    if (process.env.GROQ_API_KEY) {
      content = await callGroq(prompt);
    } else {
      try {
        content = await callZAI(prompt);
      } catch {
        return NextResponse.json({
          success: false,
          error: 'AI service not configured. Please add GROQ_API_KEY to your environment variables.',
          needsApiKey: true
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      content,
      type,
      timestamp: new Date().toISOString()
    });

  } catch (error: unknown) {
    console.error('Content Generation API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate content. Please try again.',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
