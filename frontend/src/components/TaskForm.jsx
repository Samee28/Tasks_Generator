import { useState } from 'react';

export default function TaskForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    goal: '',
    users: '',
    constraints: ''
  });
  const [template, setTemplate] = useState('custom');

  const templates = {
    web: {
      goal: 'Build a responsive web application',
      users: 'Desktop and mobile users',
      constraints: 'Modern browsers, SEO friendly, < 3s load time'
    },
    mobile: {
      goal: 'Build a mobile app feature',
      users: 'iOS and Android users',
      constraints: 'Offline support, battery efficient, < 100MB'
    },
    internal: {
      goal: 'Build an internal dashboard',
      users: 'Internal team members',
      constraints: 'Admin access, audit logging, < 5s load time'
    }
  };

  const handleTemplateChange = (e) => {
    const templateType = e.target.value;
    setTemplate(templateType);
    if (templateType !== 'custom' && templates[templateType]) {
      setFormData(templates[templateType]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.goal && formData.users && formData.constraints) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <h2>Feature Specification</h2>
      
      <div className="template-selector">
        <label htmlFor="template">Choose Template:</label>
        <select id="template" value={template} onChange={handleTemplateChange}>
          <option value="custom">Custom</option>
          <option value="web">Web App</option>
          <option value="mobile">Mobile App</option>
          <option value="internal">Internal Tool</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="goal">Feature Goal *</label>
          <textarea
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
            placeholder="What should this feature accomplish?"
            rows={3}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="users">Target Users *</label>
          <textarea
            id="users"
            name="users"
            value={formData.users}
            onChange={handleInputChange}
            placeholder="Who are the users? What are their needs?"
            rows={3}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="constraints">Constraints & Requirements *</label>
          <textarea
            id="constraints"
            name="constraints"
            value={formData.constraints}
            onChange={handleInputChange}
            placeholder="Budget, timeline, technical constraints, performance requirements..."
            rows={3}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Generating...' : 'Generate Tasks'}
        </button>
      </form>
    </div>
  );
}
