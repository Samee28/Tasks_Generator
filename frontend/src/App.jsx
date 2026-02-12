import { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SpecHistory from './components/SpecHistory';
import ExportOptions from './components/ExportOptions';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function App() {
  const [tasks, setTasks] = useState({ userStories: [], engineeringTasks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('generate');
  const [specs, setSpecs] = useState([]);
  const [specDetail, setSpecDetail] = useState(null);
  const [featureInfo, setFeatureInfo] = useState({ goal: '', users: '', constraints: '' });

  useEffect(() => {
    fetchSpecs();
  }, []);

  const fetchSpecs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/specs`);
      if (response.ok) {
        const data = await response.json();
        setSpecs(data);
      }
    } catch (err) {
      console.error('Failed to fetch specs:', err);
    }
  };

  const handleGenerateTasks = async (formData) => {
    setLoading(true);
    setError('');
    setFeatureInfo(formData);

    try {
      const response = await fetch(`${API_URL}/api/generate-tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate tasks');
      }

      const data = await response.json();
      setTasks(data.tasks);
      setActiveTab('tasks');
      await fetchSpecs();
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSpec = async (specId) => {
    try {
      const response = await fetch(`${API_URL}/api/specs/${specId}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
        setFeatureInfo({
          goal: data.goal,
          users: data.users,
          constraints: data.constraints
        });
        setSpecDetail(null);
        setActiveTab('tasks');
      }
    } catch (err) {
      setError('Failed to load spec');
    }
  };

  const handleReorderTasks = (group, newOrder) => {
    setTasks(prev => ({
      ...prev,
      [group]: newOrder
    }));
  };

  const handleDeleteTask = (group, index) => {
    setTasks(prev => ({
      ...prev,
      [group]: prev[group].filter((_, i) => i !== index)
    }));
  };

  const handleEditTask = (group, index, updatedTask) => {
    setTasks(prev => ({
      ...prev,
      [group]: prev[group].map((task, i) => (i === index ? updatedTask : task))
    }));
  };

  const handleAddTask = (group, newTask) => {
    setTasks(prev => ({
      ...prev,
      [group]: [...prev[group], newTask]
    }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Tasks Generator</h1>
        <p>Generate user stories & engineering tasks from feature ideas</p>
      </header>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate
        </button>
        {Object.values(tasks).some(arr => arr.length > 0) && (
          <>
            <button
              className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks ({tasks.userStories.length + tasks.engineeringTasks.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'export' ? 'active' : ''}`}
              onClick={() => setActiveTab('export')}
            >
              Export
            </button>
          </>
        )}
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History ({specs.length})
        </button>
      </div>

      <div className="app-content">
        {error && <div className="error-banner">{error}</div>}

        {activeTab === 'generate' && (
          <div className="tab-content">
            <TaskForm onSubmit={handleGenerateTasks} loading={loading} />
          </div>
        )}

        {activeTab === 'tasks' && Object.values(tasks).some(arr => arr.length > 0) && (
          <div className="tab-content">
            <TaskList
              tasks={tasks}
              onReorder={handleReorderTasks}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onAdd={handleAddTask}
            />
          </div>
        )}

        {activeTab === 'export' && Object.values(tasks).some(arr => arr.length > 0) && (
          <div className="tab-content">
            <ExportOptions tasks={tasks} featureInfo={featureInfo} />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="tab-content">
            <SpecHistory
              specs={specs}
              onLoad={handleLoadSpec}
              selectedId={specDetail?.id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
