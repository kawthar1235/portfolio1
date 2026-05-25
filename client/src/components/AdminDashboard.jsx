{/* LOGIN SCREEN */}
if (!token)
  return (
    <div style={s.loginWrap}>
      <div style={s.loginCard}>
        <div style={s.loginLogo}>
          kawthar
          <span style={{ color: "#F2A4A5", fontStyle: "italic" }}>
            .
          </span>
        </div>

        <div style={s.loginTitle}>Admin Panel</div>

        <form onSubmit={handleLogin} style={s.loginForm}>
          <input
            style={s.input}
            placeholder="Username"
            value={login.username}
            onChange={(e) =>
              setLogin((l) => ({
                ...l,
                username: e.target.value,
              }))
            }
            required
          />

          <input
            style={s.input}
            type="password"
            placeholder="Password"
            value={login.password}
            onChange={(e) =>
              setLogin((l) => ({
                ...l,
                password: e.target.value,
              }))
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


// ── DASHBOARD ──
return (
  <div style={s.wrap}>
    
    {/* SIDEBAR */}
    <aside style={s.sidebar}>
      <div style={s.sidebarLogo}>
        kawthar
        <span style={{ color: "#F2A4A5", fontStyle: "italic" }}>
          .
        </span>
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

    {/* MAIN */}
    <main style={s.main}>
      {/* HEADER */}
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
    </main>
  </div>
);
