import { useState } from "react"

function Settings() {

  const [notifications, setNotifications] = useState(true)
  const [highRiskAlerts, setHighRiskAlerts] = useState(true)
  const [autoScan, setAutoScan] = useState(false)
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true)

  return (
    <div className="settings-page">

      {/* HEADER */}

      <div className="settings-header">

        <h1>⚙️ Settings</h1>

        <p>
          Configure CyberSentinel security and system preferences.
        </p>

      </div>


      {/* SYSTEM STATUS */}

      <section className="settings-section">

        <h2>⚡ System Status</h2>

        <div className="settings-card">

          <div className="setting-row">

            <div>
              <h3>Backend API</h3>
              <p>
                Connection to CyberSentinel backend services.
              </p>
            </div>

            <span className="status-badge online">
              ● Online
            </span>

          </div>


          <div className="setting-row">

            <div>
              <h3>Security Modules</h3>
              <p>
                Phishing, Network, Traffic and File Security modules.
              </p>
            </div>

            <span className="status-badge online">
              ● Operational
            </span>

          </div>


          <div className="setting-row">

            <div>
              <h3>Risk Engine</h3>
              <p>
                Unified cybersecurity risk analysis engine.
              </p>
            </div>

            <span className="status-badge online">
              ● Active
            </span>

          </div>

        </div>

      </section>


      {/* NOTIFICATIONS */}

      <section className="settings-section">

        <h2>🔔 Notifications</h2>

        <div className="settings-card">

          <div className="setting-row">

            <div>
              <h3>Security Notifications</h3>
              <p>
                Receive notifications about security events.
              </p>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />

              <span className="slider"></span>

            </label>

          </div>


          <div className="setting-row">

            <div>
              <h3>High Risk Alerts</h3>
              <p>
                Get alerts when the unified risk score is high.
              </p>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                checked={highRiskAlerts}
                onChange={() =>
                  setHighRiskAlerts(!highRiskAlerts)
                }
              />

              <span className="slider"></span>

            </label>

          </div>

        </div>

      </section>


      {/* SECURITY PREFERENCES */}

      <section className="settings-section">

        <h2>🛡️ Security Preferences</h2>

        <div className="settings-card">

          <div className="setting-row">

            <div>
              <h3>Automatic Security Scanning</h3>
              <p>
                Automatically perform security scans periodically.
              </p>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                checked={autoScan}
                onChange={() =>
                  setAutoScan(!autoScan)
                }
              />

              <span className="slider"></span>

            </label>

          </div>


          <div className="setting-row">

            <div>
              <h3>Real-Time Monitoring</h3>
              <p>
                Continuously monitor security activity.
              </p>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                checked={realTimeMonitoring}
                onChange={() =>
                  setRealTimeMonitoring(!realTimeMonitoring)
                }
              />

              <span className="slider"></span>

            </label>

          </div>

        </div>

      </section>


      {/* APPEARANCE */}

      <section className="settings-section">

        <h2>🎨 Appearance</h2>

        <div className="settings-card">

          <div className="setting-row">

            <div>
              <h3>Theme</h3>
              <p>
                CyberSentinel currently uses the dark security theme.
              </p>
            </div>

            <span className="theme-badge">
              🌙 Dark
            </span>

          </div>

        </div>

      </section>


      {/* ABOUT */}

      <section className="settings-section">

        <h2>ℹ️ About CyberSentinel</h2>

        <div className="settings-card about-card">

          <h3>
            🛡️ CyberSentinel
          </h3>

          <p>
            Personal Cybersecurity Command Center
          </p>

          <p>
            Version: <strong>0.1.0</strong>
          </p>

          <p>
            A unified cybersecurity platform for phishing detection,
            network reconnaissance, traffic analysis, file security,
            password security and risk assessment.
          </p>

        </div>

      </section>

    </div>
  )
}

export default Settings