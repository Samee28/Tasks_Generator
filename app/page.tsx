'use client';

import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ExportOptions from './components/ExportOptions';
import SpecHistory from './components/SpecHistory';

interface Task {
  title: string;
  description: string;
}

interface SpecData {
  goal: string;
  users: string;
  constraints: string;
  risks?: string;
  userStories: Task[];
  engineeringTasks: Task[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentSpec, setCurrentSpec] = useState<SpecData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: { goal: string; users: string; constraints: string; risks?: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate tasks');
      }

      const data = await response.json();
      setCurrentSpec({
        goal: data.goal,
        users: data.users,
        constraints: data.constraints,
        risks: data.risks,
        userStories: data.tasks.userStories || [],
        engineeringTasks: data.tasks.engineeringTasks || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSpec = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/specs/${id}`);
      if (!response.ok) {
        throw new Error('Failed to load specification');
      }

      const data = await response.json();
      setCurrentSpec({
        goal: data.goal,
        users: data.users,
        constraints: data.constraints,
        risks: data.risks,
        userStories: data.tasks.userStories || [],
        engineeringTasks: data.tasks.engineeringTasks || [],
      });
      
      // Scroll to top to see loaded spec
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTasksUpdate = (userStories: Task[], engineeringTasks: Task[]) => {
    if (currentSpec) {
      setCurrentSpec({
        ...currentSpec,
        userStories,
        engineeringTasks,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              🚀 Tasks Generator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              AI-powered task breakdown using Groq's Llama 3.3 70B model
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Generate user stories and engineering tasks from your feature ideas
            </p>
          </div>

            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-6">
            {/* Task Form */}
            <TaskForm onGenerate={handleGenerate} isLoading={isLoading} />

            {/* Current Results */}
            {currentSpec && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    📊 Current Specification
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Goal</p>
                      <p className="text-gray-900 dark:text-white">{currentSpec.goal}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Target Users</p>
                      <p className="text-gray-900 dark:text-white">{currentSpec.users}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Constraints</p>
                      <p className="text-gray-900 dark:text-white">{currentSpec.constraints}</p>
                    </div>
                    {currentSpec.risks && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Risks/Unknowns</p>
                        <p className="text-gray-900 dark:text-white">{currentSpec.risks}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {currentSpec.userStories.length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">User Stories</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {currentSpec.engineeringTasks.length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Engineering Tasks</p>
                    </div>
                  </div>
                </div>

                <TaskList
                  userStories={currentSpec.userStories}
                  engineeringTasks={currentSpec.engineeringTasks}
                  onTasksUpdate={handleTasksUpdate}
                />

                <ExportOptions
                  goal={currentSpec.goal}
                  users={currentSpec.users}
                  constraints={currentSpec.constraints}
                  risks={currentSpec.risks}
                  userStories={currentSpec.userStories}
                  engineeringTasks={currentSpec.engineeringTasks}
                />
              </>
            )}

            {/* History */}
            <SpecHistory onLoad={handleLoadSpec} />
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
            <p className="mb-2">
              Built with Next.js, React, Tailwind CSS, and Groq AI
            </p>
            <a
              href="https://github.com/Samee28/Tasks_Generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
