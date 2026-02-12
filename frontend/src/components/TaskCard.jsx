import { useState } from 'react';

export default function TaskCard({ task, group, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-card editing">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
          className="task-title-input"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
          className="task-description-input"
        />
        <div className="task-actions">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
      </div>
      <div className="task-actions">
        <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="btn-delete" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
