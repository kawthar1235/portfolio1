import { useState } from "react";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b1a",
        color: "white",
        display: "flex",
        fontFamily: "sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#111128",
          padding: "2rem",
          borderRight: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            marginBottom: "2rem",
          }}
        >
          kawthar
          <span style={{ color: "#F2A4A5" }}>.</span>
        </h1>

        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "#5BA3CC",
            color: "white",
            cursor: "pointer",
          }}
        >
          Projects
        </button>
      </aside>

      {/* Main */}
      <main
        style={{
          flex: 1,
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2>Admin Dashboard</h2>

          <button
            onClick={() => {
              const title = prompt("Project title");

              if (!title) return;

              setProjects([
                ...projects,
                {
                  id: Date.now(),
                  title,
                },
              ]);
            }}
            style={{
              padding: "12px 18px",
              borderRadius: "10px",
              border: "none",
              background: "#5BA3CC",
              color: "white",
              cursor: "pointer",
            }}
          >
            + Add Project
          </button>
        </div>

        {/* Projects */}
        <div
          style={{
            display: "grid",
            gap: "1rem",
          }}
        >
          {projects.length === 0 ? (
            <div
              style={{
                background: "#111128",
                padding: "2rem",
                borderRadius: "14px",
              }}
            >
              No projects yet
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                style={{
                  background: "#111128",
                  padding: "1.2rem",
                  borderRadius: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{project.title}</span>

                <button
                  onClick={() =>
                    setProjects(
                      projects.filter((p) => p.id !== project.id)
                    )
                  }
                  style={{
                    background: "#f87171",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}