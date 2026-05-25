import { useState, useEffect } from "react";

const API = "https://portfolio-server-lbwm.onrender.com/api";
const CLOUD_NAME = "dljbum6et";
const UPLOAD_PRESET = "portfolio_upload";

const api = async (path, method = "GET", body) => {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(API + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) throw await res.json();
  return res.json();
};

const EMPTY_PROJECT = {
  title: "",
  description: "",
  type: "code",
  category: "web",
  techStack: "",
  liveUrl: "",
  githubUrl: "",
  year: new Date().getFullYear().toString(),
  featured: false,
  image: "",
};

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [view, setView] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loginErr, setLoginErr] = useState("");
  const [filter, setFilter] = useState("all");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginErr("");
    try {
      const data = await api("/admin/login", "POST", login);
      localStorage.setItem("adminToken", data.token);
      setToken(data.token);
    } catch (err) {
      setLoginErr(err.message || "Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  useEffect(() => {
    if (!token) return;
    api("/projects").then(setProjects).catch(console.error);
    api("/admin/messages").then(setMessages).catch(console.error);
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return form.image || "";

    setUploading(true);
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      const json = await res.json();
      setUploading(false);
      return json.secure_url;
    } catch {
      setUploading(false);
      showToast("❌ Image upload failed");
      return form.image || "";
    }
  };

  const openAdd = () => {
    setForm(EMPTY_PROJECT);
    setEditId(null);
    setImageFile(null);
    setImagePreview("");
    setModal("add");
  };

  const openEdit = (p) => {
    setForm({
      ...p,
      techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : (p.techStack || ""),
    });
    setEditId(p._id);
    setImageFile(null);
    setImagePreview(p.image || "");
    setModal("edit");
  };

  const saveProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imageUrl = await uploadImage();
    const payload = {
      ...form,
      image: imageUrl,
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (modal === "add") {
        const created = await api("/projects", "POST", payload);
        setProjects((ps) => [created, ...ps]);
        showToast("✅ Project added!");
      } else {
        const updated = await api(`/projects/${editId}`, "PUT", payload);
        setProjects((ps) => ps.map((p) => (p._id === editId ? updated : p)));
        showToast("✅ Project updated!");
      }
      setModal(null);
    } catch (err) {
      showToast("❌ " + (err.message || "Error"));
    }

    setLoading(false);
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await api(`/projects/${id}`, "DELETE");
      setProjects((ps) => ps.filter((p) => p._id !== id));
      showToast("🗑️ Project deleted!");
    } catch {
      showToast("❌ Failed to delete");
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api(`/admin/messages/${id}`, "DELETE");
      setMessages((ms) => ms.filter((m) => m._id !== id));
      showToast("🗑️ Message deleted!");
    } catch {
      showToast("❌ Failed to delete");
    }
  };

  const filtered = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  if (!token) {
    return (
      <div style={s.loginWrap}>
        <div style={s.loginCard}>
          <div style={s.loginLogo}>
            kawthar
            <span style={{ color: "#F2A4A5", fontStyle: "italic" }}>.</span>
          </div>

          <div style={s.loginTitle}>Admin Panel</div>

          <form onSubmit={handleLogin} style={s.loginForm}>
            <input
              style={s.input}
              placeholder="Username"
              value={login.username}
              onChange={(e) =>
                setLogin((l) => ({ ...l, username: e.target.value }))
              }
              required
            />

            <input
              style={s.input}
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) =>
                setLogin((l) => ({ ...l, password: e.target.value }))
              }
              required
            />

            {loginErr && <div style={s.err}>{loginErr}</div>}

            <button style={s.btnPrimary} type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      <aside style={s.sidebar}>
        <div style={s.sidebarLogo}>
          kawthar
          <span style={{ color: "#F2A4A5", fontStyle: "italic" }}>.</span>
        </div>

        <nav style={s.nav}>
          {[
            ["projects", "◈ Projects"],
            ["messages", "✉ Messages"],
          ].map(([v, l]) => (
            <button
              key={v}
              style={{
                ...s.navBtn,
                ...(view === v ? s.navBtnActive : {}),
              }}
              onClick={() => setView(v)}
            >
              {l}
            </button>
          ))}
        </nav>

        <button style={s.logoutBtn} onClick={handleLogout}>
          ← Logout
        </button>
      </aside>

      <main style={s.main}>
        <div style={s.header}>
          <div>
            <div style={s.headerTitle}>
              {view === "projects" ? "Projects" : "Messages"}
            </div>

            <div style={s.headerSub}>
              {view === "projects"
                ? `${projects.length} total`
                : `${messages.length} messages`}
            </div>
          </div>

          {view === "projects" && (
            <button style={s.btnPrimary} onClick={openAdd}>
              + Add Project
            </button>
          )}
        </div>

        {view === "projects" && (
          <>
            <div style={s.tabs}>
              {[
                ["all", "All"],
                ["code", "Code"],
                ["design", "Design"],
              ].map(([v, l]) => (
                <button
                  key={v}
                  style={{ ...s.tab, ...(filter === v ? s.tabActive : {}) }}
                  onClick={() => setFilter(v)}
                >
                  {l}
                </button>
              ))}
            </div>

            <div style={s.table}>
              <div style={s.tableHead}>
                <span style={{ flex: 0.5 }}>Image</span>
                <span style={{ flex: 2 }}>Title</span>
                <span style={{ flex: 1 }}>Type</span>
                <span style={{ flex: 1 }}>Category</span>
                <span style={{ flex: 1 }}>Year</span>
                <span style={{ flex: 1 }}>Featured</span>
                <span style={{ flex: 1 }}>Actions</span>
              </div>

              {filtered.length === 0 && (
                <div style={s.empty}>No projects yet — click "+ Add Project"!</div>
              )}

              {filtered.map((p) => (
                <div key={p._id} style={s.tableRow}>
                  <span style={{ flex: 0.5 }}>
                    {p.image ? (
                      <img src={p.image} alt={p.title} style={s.thumb} />
                    ) : (
                      <div style={s.thumbEmpty}>—</div>
                    )}
                  </span>

                  <span style={{ flex: 2, fontWeight: 500, color: "#e8e4ff" }}>
                    {p.title}
                  </span>

                  <span style={{ flex: 1 }}>
                    <span
                      style={{
                        ...s.badge,
                        background:
                          p.type === "code"
                            ? "rgba(91,163,204,.2)"
                            : "rgba(242,164,165,.2)",
                        color: p.type === "code" ? "#7ec8e8" : "#F2A4A5",
                      }}
                    >
                      {p.type}
                    </span>
                  </span>

                  <span
                    style={{
                      flex: 1,
                      color: "rgba(232,228,255,.5)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {p.category}
                  </span>

                  <span
                    style={{
                      flex: 1,
                      color: "rgba(232,228,255,.5)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {p.year}
                  </span>

                  <span style={{ flex: 1 }}>
                    {p.featured && (
                      <span
                        style={{
                          ...s.badge,
                          background: "rgba(242,164,165,.15)",
                          color: "#F2A4A5",
                        }}
                      >
                        ★
                      </span>
                    )}
                  </span>

                  <span style={{ flex: 1, display: "flex", gap: "0.5rem" }}>
                    <button style={s.btnEdit} onClick={() => openEdit(p)}>
                      Edit
                    </button>
                    <button style={s.btnDelete} onClick={() => deleteProject(p._id)}>
                      Del
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "messages" && (
          <div style={s.msgGrid}>
            {messages.length === 0 && <div style={s.empty}>No messages yet!</div>}

            {messages.map((m) => (
              <div key={m._id} style={s.msgCard}>
                <div style={s.msgTop}>
                  <div>
                    <div style={s.msgName}>{m.name}</div>
                    <div style={s.msgEmail}>{m.email}</div>
                  </div>
                  <button style={s.btnDelete} onClick={() => deleteMessage(m._id)}>
                    Delete
                  </button>
                </div>

                {m.subject && <div style={s.msgSubject}>{m.subject}</div>}
                <div style={s.msgBody}>{m.message}</div>
                <div style={s.msgDate}>
                  {new Date(m.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modal && (
        <div style={s.overlay} onClick={() => setModal(null)}>
          <div style={s.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={s.modalTitle}>
              {modal === "add" ? "Add New Project" : "Edit Project"}
            </div>

            <form onSubmit={saveProject} style={s.formGrid}>
              <div style={s.formGroup}>
                <label style={s.label}>Title *</label>
                <input
                  style={s.input}
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Year</label>
                <input
                  style={s.input}
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                />
              </div>

              <div style={{ ...s.formGroup, gridColumn: "1/-1" }}>
                <label style={s.label}>Description *</label>
                <textarea
                  style={{ ...s.input, height: "80px", resize: "none" }}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  required
                />
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Type *</label>
                <select
                  style={s.input}
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      type: e.target.value,
                      category: e.target.value === "code" ? "web" : "Branding",
                    }))
                  }
                >
                  <option value="code">Code</option>
                  <option value="design">Design</option>
                </select>
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Category *</label>
                <select
                  style={s.input}
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                >
                  {form.type === "code"
                    ? ["web", "app", "tool"].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))
                    : ["Branding", "UI", "Illustration"].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                </select>
              </div>

              <div style={{ ...s.formGroup, gridColumn: "1/-1" }}>
                <label style={s.label}>Tech Stack (comma separated)</label>
                <input
                  style={s.input}
                  placeholder="React, Node.js, MongoDB"
                  value={form.techStack}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, techStack: e.target.value }))
                  }
                />
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Live URL</label>
                <input
                  style={s.input}
                  placeholder="https://..."
                  value={form.liveUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, liveUrl: e.target.value }))
                  }
                />
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>GitHub URL</label>
                <input
                  style={s.input}
                  placeholder="https://github.com/..."
                  value={form.githubUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, githubUrl: e.target.value }))
                  }
                />
              </div>

              <div style={{ ...s.formGroup, gridColumn: "1/-1" }}>
                <label style={s.label}>Project Image</label>
                <div style={s.imageUploadWrap}>
                  {imagePreview && (
                    <div style={s.imagePreviewWrap}>
                      <img src={imagePreview} alt="preview" style={s.imagePreview} />
                      <button
                        type="button"
                        style={s.removeImg}
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview("");
                          setForm((f) => ({ ...f, image: "" }));
                        }}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}

                  <label style={s.uploadLabel}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    {imagePreview ? "🔄 Change Image" : "📷 Upload Image"}
                  </label>

                  <div style={s.uploadHint}>JPG, PNG, WEBP — max 10MB</div>
                </div>
              </div>

              <div
                style={{
                  ...s.formGroup,
                  gridColumn: "1/-1",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, featured: e.target.checked }))
                  }
                  style={{ width: "18px", height: "18px" }}
                />
                <label htmlFor="featured" style={{ ...s.label, margin: 0 }}>
                  Mark as Featured
                </label>
              </div>

              <div
                style={{
                  gridColumn: "1/-1",
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "flex-end",
                  marginTop: "0.5rem",
                }}
              >
                <button type="button" style={s.btnGhost} onClick={() => setModal(null)}>
                  Cancel
                </button>
                <button type="submit" style={s.btnPrimary} disabled={loading || uploading}>
                  {uploading
                    ? "Uploading image…"
                    : loading
                      ? "Saving…"
                      : modal === "add"
                        ? "Add Project"
                        : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  );
}