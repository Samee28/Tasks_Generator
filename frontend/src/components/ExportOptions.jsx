export default function ExportOptions({ tasks, featureInfo }) {
  const generateMarkdown = () => {
    let markdown = `# Tasks for: ${featureInfo.goal}\n\n`;
    markdown += `## Feature Details\n`;
    markdown += `- **Goal**: ${featureInfo.goal}\n`;
    markdown += `- **Users**: ${featureInfo.users}\n`;
    markdown += `- **Constraints**: ${featureInfo.constraints}\n\n`;

    if (tasks.userStories.length > 0) {
      markdown += `## User Stories\n\n`;
      tasks.userStories.forEach((story, idx) => {
        markdown += `${idx + 1}. **${story.title}**\n`;
        markdown += `   ${story.description}\n\n`;
      });
    }

    if (tasks.engineeringTasks.length > 0) {
      markdown += `## Engineering Tasks\n\n`;
      tasks.engineeringTasks.forEach((task, idx) => {
        markdown += `${idx + 1}. **${task.title}**\n`;
        markdown += `   ${task.description}\n\n`;
      });
    }

    return markdown;
  };

  const generateText = () => {
    let text = `TASKS FOR: ${featureInfo.goal}\n`;
    text += `${'='.repeat(60)}\n\n`;
    text += `FEATURE DETAILS\n`;
    text += `Goal: ${featureInfo.goal}\n`;
    text += `Users: ${featureInfo.users}\n`;
    text += `Constraints: ${featureInfo.constraints}\n\n`;

    if (tasks.userStories.length > 0) {
      text += `USER STORIES\n`;
      text += `${'-'.repeat(60)}\n`;
      tasks.userStories.forEach((story, idx) => {
        text += `${idx + 1}. ${story.title}\n   ${story.description}\n\n`;
      });
    }

    if (tasks.engineeringTasks.length > 0) {
      text += `ENGINEERING TASKS\n`;
      text += `${'-'.repeat(60)}\n`;
      tasks.engineeringTasks.forEach((task, idx) => {
        text += `${idx + 1}. ${task.title}\n   ${task.description}\n\n`;
      });
    }

    return text;
  };

  const handleCopy = (format) => {
    const content = format === 'markdown' ? generateMarkdown() : generateText();
    navigator.clipboard.writeText(content).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const handleDownload = (format) => {
    const content = format === 'markdown' ? generateMarkdown() : generateText();
    const filename = `tasks-${Date.now()}.${format === 'markdown' ? 'md' : 'txt'}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="export-container">
      <h2>Export Tasks</h2>
      <div className="export-options">
        <div className="export-option">
          <h3>Markdown Format</h3>
          <button className="btn-primary" onClick={() => handleCopy('markdown')}>
            📋 Copy to Clipboard
          </button>
          <button className="btn-secondary" onClick={() => handleDownload('markdown')}>
            ⬇️ Download as .md
          </button>
        </div>

        <div className="export-option">
          <h3>Text Format</h3>
          <button className="btn-primary" onClick={() => handleCopy('text')}>
            📋 Copy to Clipboard
          </button>
          <button className="btn-secondary" onClick={() => handleDownload('text')}>
            ⬇️ Download as .txt
          </button>
        </div>
      </div>

      <div className="preview">
        <h3>Preview</h3>
        <pre>{generateMarkdown()}</pre>
      </div>
    </div>
  );
}
