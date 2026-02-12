import { NextRequest, NextResponse } from 'next/server';
import { loadSpecs, saveSpecs } from '@/lib/specs';

export async function POST(request: NextRequest) {
  try {
    const { goal, users, constraints } = await request.json();

    if (!goal || !users || !constraints) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are a product manager and engineering lead. Based on the following feature idea, generate a comprehensive list of user stories and engineering tasks. Return the result as a JSON object with two arrays: "userStories" and "engineeringTasks". Each item should have a "title" and "description" field.

Feature Idea:
Goal: ${goal}
Users: ${users}
Constraints: ${constraints}

Return ONLY valid JSON, no markdown formatting or code blocks.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.2,
        messages: [
          { role: 'system', content: 'You return only valid JSON.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const completion = await response.json();
    if (!response.ok) {
      const message = completion?.error?.message || 'Groq request failed';
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const content = completion?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: 'Groq returned an empty response' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let tasks;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        tasks = JSON.parse(jsonMatch[0]);
      } else {
        tasks = JSON.parse(content);
      }
    } catch (e) {
      console.error('Failed to parse Groq response:', content);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    // Save to specs history
    const specs = loadSpecs();
    const newSpec = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      goal,
      users,
      constraints,
      tasks
    };

    specs.unshift(newSpec);
    specs.splice(5); // Keep only last 5
    saveSpecs(specs);

    return NextResponse.json({ ...newSpec, tasks });
  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to generate tasks' },
      { status: 500 }
    );
  }
}
