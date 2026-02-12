'use client';

import { useEffect, useState } from 'react';

interface Spec {
  id: string;
  createdAt: string;
  goal: string;
  users: string;
  constraints: string;
  risks?: string;
}

interface SpecHistoryProps {
  onLoad: (id: string) => void;
}

export default function SpecHistory({ onLoad }: SpecHistoryProps) {
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/specs');
      if (response.ok) {
        const data = await response.json();
        setSpecs(data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showHistory) {
      fetchHistory();
    }
  }, [showHistory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition shadow-lg"
      >
        <span className="flex items-center gap-2">
          📜 View History (Last 5)
        </span>
        <span className="text-2xl">{showHistory ? '▼' : '▶'}</span>
      </button>

      {showHistory && (
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : specs.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">📭 No history yet</p>
              <p className="text-sm">Generate your first task specification to see it here!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {specs.map((spec) => (
                <div
                  key={spec.id}
                  className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {formatDate(spec.createdAt)}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {spec.goal}
                      </h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <p><span className="font-medium">Users:</span> {spec.users}</p>
                        <p><span className="font-medium">Constraints:</span> {spec.constraints}</p>
                        {spec.risks && (
                          <p><span className="font-medium">Risks:</span> {spec.risks}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onLoad(spec.id)}
                    className="w-full mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    📂 Load This Spec
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
