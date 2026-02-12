export default function SpecHistory({ specs, onLoad }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="history-container">
      <h2>Recent Specifications</h2>
      {specs.length === 0 ? (
        <p className="empty-state">No previous specifications. Create one to get started!</p>
      ) : (
        <div className="specs-grid">
          {specs.map((spec) => (
            <div key={spec.id} className="spec-card">
              <div className="spec-header">
                <h3>{spec.goal}</h3>
                <p className="spec-date">{formatDate(spec.createdAt)}</p>
              </div>
              <div className="spec-details">
                <p><strong>Users:</strong> {spec.users}</p>
                <p><strong>Constraints:</strong> {spec.constraints}</p>
              </div>
              <button
                className="btn-primary"
                onClick={() => onLoad(spec.id)}
              >
                Load This Spec
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
