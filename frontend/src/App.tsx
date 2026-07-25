import { useState } from "react"

import Sidebar from "./components/Sidebar"
import SecurityCard from "./components/SecurityCard"
import NetworkRecon from "./components/NetworkRecon"
import PhishingDetection from "./components/PhishingDetection"
import TrafficAnalysis from "./components/TrafficAnalysis"
import FileSecurity from "./components/FileSecurity"
import PasswordSecurity from "./components/PasswordSecurity"
import RiskScore from "./components/RiskScore"
import Settings from "./components/Settings"

import "./App.css"

function App() {
  const [activePage, setActivePage] = useState("dashboard")

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />


      {/* ================= MAIN CONTENT ================= */}

      <main className="main-content">


        {/* ================= DASHBOARD ================= */}

        {activePage === "dashboard" && (
          <>

            {/* TOP BAR */}

            <header className="topbar">

              <div>
                <h1>Security Overview</h1>

                <p className="subtitle">
                  Personal Cybersecurity Command Center
                </p>
              </div>

              <div className="system-status">

                <span className="status-dot"></span>

                System Online

              </div>

            </header>


            {/* SUMMARY CARDS */}

            <section className="summary-section">

              <div className="summary-card">

                <span className="summary-icon">
                  🛡️
                </span>

                <div>

                  <p>
                    Security Risk Score
                  </p>

                  <h2>
                    78<span>/100</span>
                  </h2>

                </div>

              </div>


              <div className="summary-card">

                <span className="summary-icon">
                  🚨
                </span>

                <div>

                  <p>
                    Threats Detected
                  </p>

                  <h2>
                    3
                  </h2>

                </div>

              </div>


              <div className="summary-card">

                <span className="summary-icon">
                  🔍
                </span>

                <div>

                  <p>
                    Security Scans
                  </p>

                  <h2>
                    24
                  </h2>

                </div>

              </div>

            </section>


            {/* SECURITY MODULES */}

            <section className="modules-section">

              <div className="section-heading">

                <h2>
                  Security Modules
                </h2>

                <p>
                  Monitor and analyze your cybersecurity posture
                </p>

              </div>


              <div className="modules-grid">


                {/* PHISHING */}

                <SecurityCard
                  icon="🎣"
                  title="Phishing Detection"
                  description="Analyze suspicious URLs using machine learning."
                  onClick={() => setActivePage("phishing")}
                />


                {/* NETWORK RECON */}

                <SecurityCard
                  icon="🌐"
                  title="Network Reconnaissance"
                  description="Discover network hosts and potential security exposure."
                  onClick={() => setActivePage("network")}
                />


                {/* TRAFFIC ANALYSIS */}

                <SecurityCard
                  icon="📡"
                  title="Traffic Analysis"
                  description="Analyze network traffic for suspicious activity."
                  onClick={() => setActivePage("traffic")}
                />


                {/* FILE SECURITY */}

                <SecurityCard
                  icon="📁"
                  title="File Security Analysis"
                  description="Analyze files for potential malware and security threats."
                  onClick={() => setActivePage("file")}
                />


                {/* PASSWORD SECURITY */}

                <SecurityCard
                  icon="🔑"
                  title="Password Security"
                  description="Evaluate password strength and security."
                  onClick={() => setActivePage("password")}
                />


                {/* RISK ENGINE */}

                <SecurityCard
                  icon="🛡️"
                  title="Unified Risk Engine"
                  description="Calculate your overall cybersecurity risk score."
                  onClick={() => setActivePage("risk")}
                />

              </div>

            </section>

          </>
        )}


        {/* ================= PHISHING DETECTION ================= */}

        {activePage === "phishing" && (
          <PhishingDetection />
        )}


        {/* ================= NETWORK RECON ================= */}

        {activePage === "network" && (
          <NetworkRecon />
        )}


        {/* ================= FUTURE MODULES ================= */}

        {activePage === "traffic" && (
  <TrafficAnalysis />
)

        }


        {activePage === "file" && (
  <FileSecurity />
)}
          


       {activePage === "password" && (
  <PasswordSecurity />
)}


        {activePage === "risk" && (
  <RiskScore />
)}

{activePage === "settings" && (
  <Settings />
)}

 </main>
    </div>
  )
}

export default App