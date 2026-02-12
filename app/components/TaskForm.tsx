'use client';

import { useState } from 'react';

interface Template {
  id: string;
  name: string;
  goal: string;
  users: string;
  constraints: string;
}

const templates: Template[] = [
  {
    id: 'web',
    name: '🌐 Web Application',
    goal: 'Build a web application',
    users: 'End users accessing via browser',
    constraints: 'Responsive design, SEO-friendly, fast loading'
  },
  {
    id: 'mobile',
    name: '📱 Mobile Application',
    goal: 'Build a mobile app',
    users: 'Mobile users (iOS/Android)',
    constraints: 'Native performance, offline mode, push notifications'
  },
  {
    id: 'internal',
    name: '🔧 Internal Tool',
    goal: 'Build an internal tool',
    users: 'Team members and administrators',
    constraints: 'Role-based access, data security, audit logging'
  }
];

interface TaskFormProps {
  onGenerate: (data: { goal: string; users: string; constraints: string; risks?: string }) => void;
  isLoading: boolean;
}

export default function TaskForm({ onGenerate, isLoading }: TaskFormProps) {
  const [goal, setGoal] = useState('');
  const [users, setUsers] = useState('');
  const [constraints, setConstraints] = useState('');
  const [risks, setRisks] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal && users && constraints) {
      onGenerate({ goal, users, constraints, risks: risks || undefined });
    }
  };

  const applyTemplate = (template: Template) => {
    setGoal(template.goal);
    setUsers(template.users);
    setConstraints(template.constraints);
    setShowTemplates(false);
  };

  const clearForm = () => {
    setGoal('');
    setUsers('');
    setConstraints('');
    setRisks('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          📝 New Task Specification
        </h2>
        <button
          type="button"
          onClick={() => setShowTemplates(!showTemplates)}
          className="px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition"
        >
          ✨ Use Template
        </button>
      </div>

      {showTemplates && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => applyTemplate(template)}
              className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:shadow-md transition text-left"
            >
              <div className="font-semibold text-gray-900 dark:text-white mb-2">
                {template.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Click to apply
              </div>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Goal / Feature Description *
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Build a todo app with real-time collaboration"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target Users *
          </label>
          <input
            type="text"
            value={users}
            onChange={(e) => setUsers(e.target.value)}
            placeholder="e.g., Students, Teachers, Project managers"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Constraints / Requirements *
          </label>
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="e.g., Mobile-first design, Must work offline, Budget constraints"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={2}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Risks / Unknowns (Optional)
          </label>
          <textarea
            value={risks}
            onChange={(e) => setRisks(e.target.value)}
            placeholder="e.g., Third-party API reliability, Scalability concerns, Data privacy regulations"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={2}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading || !goal || !users || !constraints}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating with AI...
              </span>
            ) : (
              '🚀 Generate Tasks'
            )}
          </button>
          
          <button
            type="button"
            onClick={clearForm}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
