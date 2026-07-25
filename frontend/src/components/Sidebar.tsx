interface SidebarProps {
  activePage: string
  setActivePage: (page: string) => void
}

function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="logo">
        <span>🛡️</span>
        <h2>CyberSentinel</h2>
      </div>

      <nav className="sidebar-nav">

        <p className="nav-title">MAIN MENU</p>

        <a
          className={`nav-item ${
            activePage === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActivePage("dashboard")}
        >
          <span>📊</span>
          Dashboard
        </a>

        <a
          className={`nav-item ${
            activePage === "phishing" ? "active" : ""
          }`}
          onClick={() => setActivePage("phishing")}
        >
          <span>🎣</span>
          Phishing Detection
        </a>

        <a
          className={`nav-item ${
            activePage === "network" ? "active" : ""
          }`}
          onClick={() => setActivePage("network")}
        >
          <span>🌐</span>
          Network Recon
        </a>

        <a
          className={`nav-item ${
            activePage === "traffic" ? "active" : ""
          }`}
          onClick={() => setActivePage("traffic")}
        >
          <span>📡</span>
          Traffic Analysis
        </a>

        <a
          className={`nav-item ${
            activePage === "file" ? "active" : ""
          }`}
          onClick={() => setActivePage("file")}
        >
          <span>📁</span>
          File Security
        </a>

        <a
          className={`nav-item ${
            activePage === "password" ? "active" : ""
          }`}
          onClick={() => setActivePage("password")}
        >
          <span>🔑</span>
          Password Security
        </a>

        <p className="nav-title">SECURITY</p>

        <a
          className={`nav-item ${
            activePage === "risk" ? "active" : ""
          }`}
          onClick={() => setActivePage("risk")}
        >
          <span>🛡️</span>
          Risk Score
        </a>

        <a
          className={`nav-item ${
            activePage === "settings" ? "active" : ""
          }`}
          onClick={() => setActivePage("settings")}
        >
          <span>⚙️</span>
          Settings
        </a>

      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <span className="status-dot"></span>

        <div>
          <strong>System Online</strong>
          <small>All services operational</small>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar