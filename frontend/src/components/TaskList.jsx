import { useState } from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onReorder, onDelete, onEdit, onAdd }) {
  const [expandedGroups, setExpandedGroups] = useState({
    userStories: true,
    engineeringTasks: true
  });
  const [showAddForm, setShowAddForm] = useState({
    userStories: false,
    engineeringTasks: false
  });
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleDragStart = (e, index, group) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ index, group }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, group) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      
      if (data.group === group) {
        const sourceIndex = data.index;
        const allItems = [...tasks[group]];
        const draggedItem = allItems[sourceIndex];
        
        allItems.splice(sourceIndex, 1);
        const targetIndex = Math.max(0, sourceIndex);
        allItems.splice(targetIndex, 0, draggedItem);
        
        onReorder(group, allItems);
      }
    } catch (error) {
      console.error('Drop error:', error);
    }
  };

  const handleAddTask = (group) => {
    if (newTask.title && newTask.description) {
      onAdd(group, newTask);
      setNewTask({ title: '', description: '' });
      setShowAddForm(prev => ({ ...prev, [group]: false }));
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-group">
        <div
          className="group-header"
          onClick={() => toggleGroup('userStories')}
        >
          <h2>{expandedGroups.userStories ? '▼' : '▶'} User Stories ({tasks.userStories.length})</h2>
        </div>

        {expandedGroups.userStories && (
          <div className="task-section">
            <div
              className="tasks-list"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'userStories')}
            >
              {tasks.userStories.map((task, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx, 'userStories')}
                >
                  <TaskCard
                    task={task}
                    index={idx}
                    group="userStories"
                    onDelete={() => onDelete('userStories', idx)}
                    onEdit={(updated) => onEdit('userStories', idx, updated)}
                  />
                </div>
              ))}
            </div>

            {!showAddForm.userStories ? (
              <button
                className="btn-add"
                onClick={() => setShowAddForm(prev => ({ ...prev, userStories: true }))}
              >
                + Add User Story
              </button>
            ) : (
              <div className="add-task-form">
                <input
                  type="text"
                  placeholder="Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
                <textarea
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                />
                <button
                  className="btn-primary"
                  onClick={() => handleAddTask('userStories')}
                >
                  Add
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setShowAddForm(prev => ({ ...prev, userStories: false }));
                    setNewTask({ title: '', description: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="task-group">
        <div
          className="group-header"
          onClick={() => toggleGroup('engineeringTasks')}
        >
          <h2>{expandedGroups.engineeringTasks ? '▼' : '▶'} Engineering Tasks ({tasks.engineeringTasks.length})</h2>
        </div>

        {expandedGroups.engineeringTasks && (
          <div className="task-section">
            <div
              className="tasks-list"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'engineeringTasks')}
            >
              {tasks.engineeringTasks.map((task, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx, 'engineeringTasks')}
                >
                  <TaskCard
                    task={task}
                    index={idx}
                    group="engineeringTasks"
                    onDelete={() => onDelete('engineeringTasks', idx)}
                    onEdit={(updated) => onEdit('engineeringTasks', idx, updated)}
                  />
                </div>
              ))}
            </div>

            {!showAddForm.engineeringTasks ? (
              <button
                className="btn-add"
                onClick={() => setShowAddForm(prev => ({ ...prev, engineeringTasks: true }))}
              >
                + Add Engineering Task
              </button>
            ) : (
              <div className="add-task-form">
                <input
                  type="text"
                  placeholder="Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
                <textarea
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                />
                <button
                  className="btn-primary"
                  onClick={() => handleAddTask('engineeringTasks')}
                >
                  Add
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setShowAddForm(prev => ({ ...prev, engineeringTasks: false }));
                    setNewTask({ title: '', description: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
