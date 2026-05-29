<div style={{ marginTop: '2.5rem' }}>
  <div className="section-eyebrow">02 — My Creative Toolkit</div>

  <h3 className="section-title" style={{ fontSize: '1.6rem' }}>
    My <em>Creative Toolkit</em>
  </h3>

  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginTop: '1rem',
    }}
  >
    {tools.length > 0 ? (
      tools.map((tool) => (
        <span key={tool._id} className="tag">
          {tool.name}
        </span>
      ))
    ) : (
      <span className="tag">Loading toolkit...</span>
    )}
  </div>
</div>
