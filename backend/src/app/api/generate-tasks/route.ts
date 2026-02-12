import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
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

    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Claude API key not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are a product manager and engineering lead. Based on the following feature idea, generate a comprehensive list of user stories and engineering tasks. Return the result as a JSON object with two arrays: "userStories" and "engineeringTasks". Each item should have a "title" and "description" field.

Feature Idea:
Goal: ${goal}
Users: ${users}
Constraints: ${constraints}

Return ONLY valid JSON, no markdown formatting or code blocks.`;

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    const content = response.data.content[0].text;

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
      console.error('Failed to parse Claude response:', content);
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
