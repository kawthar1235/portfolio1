import { useState, useEffect } from "react";

const API = "https://portfolio-server-lbwm.onrender.com/api";
const CLOUD_NAME = "dljbum6et";
const UPLOAD_PRESET = "portfolio_upload";
const SKILL_ICONS = ["✦", "◈", "◇", "✧", "◉", "⬡", "◆", "●", "★", "➜"];

const api = async (path, method = "GET", body) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

  const res = await fetch(API + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error((data && data.message) || `Request failed (${res.status})`);
  }

  return data;
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

const EMPTY_SKILL = {
  icon: "",
  name: "",
  list: "",
};

export default function AdminDashboard() {
  const [token, setToken] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken") || ""
      : ""
  );
  const [view, setView] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillForm, setSkillForm] = useState(EMPTY_SKILL);
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

    api("/projects")
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error);

    api("/admin/messages")
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch(console.error);

    api("/skills")
      .then((data) => setSkills(Array.isArray(data) ? data : []))
      .catch(console.error);
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
      techStack: Array.isArray(p.techStack)
        ? p.techStack.join(", ")
        : p.techStack || "",
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
      techStack: (form.techStack || "")
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

  const addSkill = async (e) => {
    e.preventDefault();
    try {
      const created = await api("/skills", "POST", skillForm);
      setSkills((prev) => [created, ...prev]);
      setSkillForm(EMPTY_SKILL);
      showToast("✅ Skill added!");
    } catch (err) {
      showToast("❌ " + (err.message || "Error"));
    }
  };

  const deleteSkill = async (id) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await api(`/skills/${id}`, "DELETE");
      setSkills((prev) => prev.filter((s) => s._id !== id));
      showToast("🗑️ Skill deleted!");
    } catch {
      showToast("❌ Failed to delete");
    }
  };

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

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
            ["skills", "✦ Skills"],
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
              {view === "projects"
                ? "Projects"
                : view === "messages"
                  ? "Messages"
                  : "Skills"}
            </div>

            <div style={s.headerSub}>
              {view === "projects"
                ? `${projects.length} total`
                : view === "messages"
                  ? `${messages.length} messages`
                  : `${skills.length} skills`}
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
                <div style={s.empty}>
                  No projects yet — click "+ Add Project"!
                </div>
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
                    <button
                      style={s.btnDelete}
                      onClick={() => deleteProject(p._id)}
                    >
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
            {messages.length === 0 && (
              <div style={s.empty}>No messages yet!</div>
            )}

            {messages.map((m) => (
              <div key={m._id} style={s.msgCard}>
                <div style={s.msgTop}>
                  <div>
                    <div style={s.msgName}>{m.name}</div>
                    <div style={s.msgEmail}>{m.email}</div>
                  </div>
                  <button
                    style={s.btnDelete}
                    onClick={() => deleteMessage(m._id)}
                  >
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

        {view === "skills" && (
          <div style={s.msgGrid}>
            <div style={s.msgCard}>
              <div style={s.modalTitle}>Add Skill</div>
              <form onSubmit={addSkill} style={s.formGrid}>
                <div style={s.formGroup}>
                  <label style={s.label}>Icon *</label>
                  <select
                    style={s.input}
                    value={skillForm.icon}
                    onChange={(e) =>
                      setSkillForm((f) => ({ ...f, icon: e.target.value }))
                    }
                    required
                  >
                    <option value="">Choose icon</option>
                    {SKILL_ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={s.formGroup}>
                  <label style={s.label}>Name *</label>
                  <input
                    style={s.input}
                    placeholder="Visual Identity"
                    value={skillForm.name}
                    onChange={(e) =>
                      setSkillForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                  />
                </div>

                <div style={{ ...s.formGroup, gridColumn: "1/-1" }}>
                  <label style={s.label}>List *</label>
                  <input
                    style={s.input}
                    placeholder="Logo design · Color systems · Typography"
                    value={skillForm.list}
                    onChange={(e) =>
                      setSkillForm((f) => ({ ...f, list: e.target.value }))
                    }
                    required
                  />
                </div>

                <div style={{ gridColumn: "1/-1" }}>
                  <button type="submit" style={s.btnPrimary}>
                    + Add Skill
                  </button>
                </div>
              </form>
            </div>

            {skills.length === 0 && (
              <div style={s.empty}>No skills yet — add them from here!</div>
            )}

            {skills.map((skill) => (
              <div key={skill._id} style={s.msgCard}>
                <div style={s.msgTop}>
                  <div>
                    <div style={s.msgName}>
                      {skill.icon} {skill.name}
                    </div>
                    <div style={s.msgBody}>{skill.list}</div>
                  </div>
                  <button
                    style={s.btnDelete}
                    onClick={() => deleteSkill(skill._id)}
                  >
                    Delete
                  </button>
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
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  required
                />
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Year</label>
                <input
                  style={s.input}
                  value={form.year}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, year: e.target.value }))
                  }
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
                      <img
                        src={imagePreview}
                        alt="preview"
                        style={s.imagePreview}
                      />
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
                <button
                  type="button"
                  style={s.btnGhost}
                  onClick={() => setModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={s.btnPrimary}
                  disabled={loading || uploading}
                >
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

const s = {
  wrap: {
    display: "flex",
    minHeight: "100vh",
    background: "#0b0b1a",
    fontFamily: "'DM Sans',sans-serif",
    color: "rgba(232,228,255,.7)",
  },
  sidebar: {
    width: "220px",
    background: "#111128",
    borderRight: "1px solid rgba(232,228,255,.08)",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1.2rem",
    gap: "0.4rem",
    flexShrink: 0,
  },
  sidebarLogo: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "#e8e4ff",
    marginBottom: "2rem",
    paddingLeft: "0.5rem",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    flex: 1,
  },
  navBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(232,228,255,.45)",
    padding: "0.65rem 0.75rem",
    borderRadius: "0.6rem",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "0.85rem",
    transition: "all 0.2s",
  },
  navBtnActive: {
    background: "rgba(91,163,204,.15)",
    color: "#7ec8e8",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid rgba(232,228,255,.1)",
    color: "rgba(232,228,255,.35)",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.6rem",
    cursor: "pointer",
    fontSize: "0.75rem",
    textAlign: "left",
  },
  main: {
    flex: 1,
    padding: "2.5rem 3rem",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  headerTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "2rem",
    fontWeight: 300,
    color: "#e8e4ff",
  },
  headerSub: {
    fontSize: "0.78rem",
    color: "rgba(232,228,255,.35)",
    marginTop: "0.2rem",
  },
  tabs: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  tab: {
    background: "transparent",
    border: "1px solid rgba(232,228,255,.1)",
    color: "rgba(232,228,255,.4)",
    padding: "0.35rem 1rem",
    borderRadius: "2rem",
    fontSize: "0.75rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  tabActive: {
    background: "#5BA3CC",
    color: "#fff",
    borderColor: "#5BA3CC",
  },
  table: {
    background: "#111128",
    border: "1px solid rgba(232,228,255,.07)",
    borderRadius: "1rem",
    overflow: "hidden",
  },
  tableHead: {
    display: "flex",
    padding: "0.9rem 1.5rem",
    background: "rgba(232,228,255,.03)",
    borderBottom: "1px solid rgba(232,228,255,.07)",
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(232,228,255,.3)",
  },
  tableRow: {
    display: "flex",
    alignItems: "center",
    padding: "0.9rem 1.5rem",
    borderBottom: "1px solid rgba(232,228,255,.05)",
    fontSize: "0.85rem",
  },
  thumb: {
    width: "44px",
    height: "44px",
    borderRadius: "0.5rem",
    objectFit: "cover",
  },
  thumbEmpty: {
    width: "44px",
    height: "44px",
    borderRadius: "0.5rem",
    background: "rgba(232,228,255,.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(232,228,255,.2)",
    fontSize: "0.75rem",
  },
  badge: {
    fontSize: "0.65rem",
    padding: "0.2rem 0.65rem",
    borderRadius: "2rem",
    letterSpacing: "0.08em",
  },
  empty: {
    padding: "3rem",
    textAlign: "center",
    color: "rgba(232,228,255,.25)",
    fontSize: "0.9rem",
  },
  msgGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
    gap: "1.2rem",
  },
  msgCard: {
    background: "#111128",
    border: "1px solid rgba(232,228,255,.07)",
    borderRadius: "1rem",
    padding: "1.5rem",
  },
  msgTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "0.8rem",
  },
  msgName: {
    fontWeight: 500,
    color: "#e8e4ff",
    fontSize: "0.95rem",
  },
  msgEmail: {
    fontSize: "0.75rem",
    color: "rgba(232,228,255,.35)",
    marginTop: "0.15rem",
  },
  msgSubject: {
    fontSize: "0.82rem",
    color: "#7ec8e8",
    marginBottom: "0.6rem",
  },
  msgBody: {
    fontSize: "0.85rem",
    lineHeight: 1.75,
    color: "rgba(232,228,255,.55)",
  },
  msgDate: {
    fontSize: "0.7rem",
    color: "rgba(232,228,255,.25)",
    marginTop: "1rem",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.65)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modalCard: {
    background: "#111128",
    border: "1px solid rgba(232,228,255,.1)",
    borderRadius: "1.2rem",
    padding: "2rem",
    width: "620px",
    maxWidth: "95vw",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "1.6rem",
    fontWeight: 300,
    color: "#e8e4ff",
    marginBottom: "1.5rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  label: {
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(232,228,255,.4)",
  },
  input: {
    background: "rgba(232,228,255,.05)",
    border: "1px solid rgba(232,228,255,.1)",
    borderRadius: "0.6rem",
    padding: "0.65rem 0.9rem",
    color: "#e8e4ff",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: "0.88rem",
    outline: "none",
  },
  imageUploadWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  imagePreviewWrap: {
    position: "relative",
    display: "inline-block",
  },
  imagePreview: {
    width: "100%",
    maxHeight: "180px",
    objectFit: "cover",
    borderRadius: "0.6rem",
    border: "1px solid rgba(232,228,255,.1)",
  },
  removeImg: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    background: "rgba(0,0,0,.6)",
    color: "#f87171",
    border: "none",
    borderRadius: "0.4rem",
    padding: "0.25rem 0.5rem",
    fontSize: "0.72rem",
    cursor: "pointer",
  },
  uploadLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "rgba(91,163,204,.15)",
    color: "#7ec8e8",
    border: "1px solid rgba(91,163,204,.25)",
    padding: "0.6rem 1.2rem",
    borderRadius: "0.6rem",
    fontSize: "0.82rem",
    cursor: "pointer",
    width: "fit-content",
  },
  uploadHint: {
    fontSize: "0.7rem",
    color: "rgba(232,228,255,.25)",
  },
  btnPrimary: {
    background: "#5BA3CC",
    color: "#fff",
    border: "none",
    padding: "0.65rem 1.5rem",
    borderRadius: "2rem",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  btnGhost: {
    background: "transparent",
    color: "rgba(232,228,255,.5)",
    border: "1px solid rgba(232,228,255,.15)",
    padding: "0.65rem 1.5rem",
    borderRadius: "2rem",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  btnEdit: {
    background: "rgba(91,163,204,.15)",
    color: "#7ec8e8",
    border: "1px solid rgba(91,163,204,.2)",
    padding: "0.3rem 0.75rem",
    borderRadius: "0.5rem",
    fontSize: "0.72rem",
    cursor: "pointer",
  },
  btnDelete: {
    background: "rgba(242,100,100,.1)",
    color: "#f87171",
    border: "1px solid rgba(242,100,100,.2)",
    padding: "0.3rem 0.75rem",
    borderRadius: "0.5rem",
    fontSize: "0.72rem",
    cursor: "pointer",
  },
  toast: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    background: "#161630",
    border: "1px solid rgba(232,228,255,.12)",
    borderRadius: "0.8rem",
    padding: "0.9rem 1.4rem",
    fontSize: "0.85rem",
    color: "#e8e4ff",
    boxShadow: "0 8px 32px rgba(0,0,0,.3)",
    zIndex: 9999,
  },
  loginWrap: {
    minHeight: "100vh",
    background: "#0b0b1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
    background: "#111128",
    border: "1px solid rgba(232,228,255,.09)",
    borderRadius: "1.2rem",
    padding: "2.5rem",
    width: "380px",
  },
  loginLogo: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "2rem",
    fontWeight: 600,
    color: "#e8e4ff",
    marginBottom: "0.3rem",
  },
  loginTitle: {
    fontSize: "0.8rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(232,228,255,.35)",
    marginBottom: "2rem",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  err: {
    fontSize: "0.82rem",
    color: "#f87171",
  },
};
