export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              🚀 Tasks Generator API
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              AI-powered task breakdown using Groq's Llama 3.3 70B model
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              API Online
            </span>
          </div>

          {/* API Endpoints */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📡 Available Endpoints
            </h2>
            
            <div className="space-y-6">
              {/* POST /api/generate-tasks */}
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-mono rounded">
                    POST
                  </span>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /api/generate-tasks
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Generate user stories and engineering tasks from project description
                </p>
                <details className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                  <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300">
                    Example Request
                  </summary>
                  <pre className="mt-3 text-xs overflow-x-auto">
{`curl -X POST http://localhost:3000/api/generate-tasks \\
  -H "Content-Type: application/json" \\
  -d '{
    "goal": "Build a todo app",
    "users": "Students",
    "constraints": "Simple UI"
  }'`}
                  </pre>
                </details>
              </div>

              {/* GET /api/specs */}
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm font-mono rounded">
                    GET
                  </span>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /api/specs
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Get list of last 5 task generations (history)
                </p>
                <a 
                  href="/api/specs"
                  className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Try it now →
                </a>
              </div>

              {/* GET /api/specs/:id */}
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-sm font-mono rounded">
                    GET
                  </span>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /api/specs/:id
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Get full details of a specific task generation
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                ~1-2s
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Response Time
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                5-7
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                User Stories
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                5-8
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Engineering Tasks
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="text-center">
            <a
              href="https://github.com/Samee28/Tasks_Generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
