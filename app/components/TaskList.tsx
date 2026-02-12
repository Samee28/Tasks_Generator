'use client';

import { useState } from 'react';

interface Task {
  title: string;
  description: string;
  id?: string;
}

interface TaskGroup {
  title: string;
  tasks: Task[];
  type: 'userStories' | 'engineeringTasks';
}

interface TaskListProps {
  userStories: Task[];
  engineeringTasks: Task[];
  onTasksUpdate: (userStories: Task[], engineeringTasks: Task[]) => void;
}

export default function TaskList({ userStories, engineeringTasks, onTasksUpdate }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [draggedItem, setDraggedItem] = useState<{ type: string; index: number } | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const handleEdit = (task: Task, type: string, index: number) => {
    setEditingId(`${type}-${index}`);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSave = (type: 'userStories' | 'engineeringTasks', index: number) => {
    const tasks = type === 'userStories' ? [...userStories] : [...engineeringTasks];
    tasks[index] = { ...tasks[index], title: editTitle, description: editDescription };
    
    if (type === 'userStories') {
      onTasksUpdate(tasks, engineeringTasks);
    } else {
      onTasksUpdate(userStories, tasks);
    }
    
    setEditingId(null);
  };

  const handleDelete = (type: 'userStories' | 'engineeringTasks', index: number) => {
    const tasks = type === 'userStories' ? [...userStories] : [...engineeringTasks];
    tasks.splice(index, 1);
    
    if (type === 'userStories') {
      onTasksUpdate(tasks, engineeringTasks);
    } else {
      onTasksUpdate(userStories, tasks);
    }
  };

  const handleDragStart = (type: string, index: number) => {
    setDraggedItem({ type, index });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetType: string, targetIndex: number) => {
    if (!draggedItem || draggedItem.type !== targetType) return;

    const tasks = targetType === 'userStories' ? [...userStories] : [...engineeringTasks];
    const [movedTask] = tasks.splice(draggedItem.index, 1);
    tasks.splice(targetIndex, 0, movedTask);

    if (targetType === 'userStories') {
      onTasksUpdate(tasks, engineeringTasks);
    } else {
      onTasksUpdate(userStories, tasks);
    }

    setDraggedItem(null);
  };

  const toggleSection = (section: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(section)) {
      newCollapsed.delete(section);
    } else {
      newCollapsed.add(section);
    }
    setCollapsedSections(newCollapsed);
  };

  const renderTask = (task: Task, type: 'userStories' | 'engineeringTasks', index: number) => {
    const isEditing = editingId === `${type}-${index}`;

    return (
      <div
        key={`${type}-${index}`}
        draggable
        onDragStart={() => handleDragStart(type, index)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(type, index)}
        className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow hover:shadow-md transition cursor-move border-l-4 border-blue-500"
      >
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleSave(type, index)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                ✓ Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white flex-1">
                {task.title}
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(task, type, index)}
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(type, index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
          </>
        )}
      </div>
    );
  };

  if (userStories.length === 0 && engineeringTasks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* User Stories Section */}
      {userStories.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6">
          <button
            onClick={() => toggleSection('userStories')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              📖 User Stories ({userStories.length})
            </h3>
            <span className="text-2xl">
              {collapsedSections.has('userStories') ? '▶' : '▼'}
            </span>
          </button>
          
          {!collapsedSections.has('userStories') && (
            <div className="space-y-3">
              {userStories.map((task, index) => renderTask(task, 'userStories', index))}
            </div>
          )}
        </div>
      )}

      {/* Engineering Tasks Section */}
      {engineeringTasks.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6">
          <button
            onClick={() => toggleSection('engineeringTasks')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              ⚙️ Engineering Tasks ({engineeringTasks.length})
            </h3>
            <span className="text-2xl">
              {collapsedSections.has('engineeringTasks') ? '▶' : '▼'}
            </span>
          </button>
          
          {!collapsedSections.has('engineeringTasks') && (
            <div className="space-y-3">
              {engineeringTasks.map((task, index) => renderTask(task, 'engineeringTasks', index))}
            </div>
          )}
        </div>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        💡 Tip: Drag tasks to reorder, click ✏️ to edit, or 🗑️ to delete
      </div>
    </div>
  );
}
