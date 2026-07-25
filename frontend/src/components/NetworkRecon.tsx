import { useState } from "react"

function NetworkRecon() {
  const [target, setTarget] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const scanNetwork = async () => {
    if (!target.trim()) {
      setError("Please enter a target.")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/network/scan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            target: target,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Network scan failed")
      }

      const data = await response.json()

      setResult(data)

    } catch (err) {
      console.error(err)

      setError(
        "Unable to connect to CyberSentinel backend. Make sure FastAPI is running."
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="network-page">

      {/* HEADER */}

      <div className="network-header">

        <h1>🌐 Network Reconnaissance</h1>

        <p>
          Discover network information and identify exposed services.
        </p>

      </div>


      {/* SCAN CARD */}

      <div className="network-card">

        <h2>Scan a Target</h2>

        <p>
          Enter a hostname or IP address to scan common network ports.
        </p>

        <div className="network-input-container">

          <input
            type="text"
            placeholder="localhost"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                scanNetwork()
              }
            }}
          />

          <button
            onClick={scanNetwork}
            disabled={loading}
          >
            {loading ? "Scanning..." : "Start Scan →"}
          </button>

        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

      </div>


      {/* RESULTS */}

      {result && (

        <div className="network-results">

          <h2>Network Scan Results</h2>


          {/* TARGET */}

          <div className="result-card">

            <h3>🎯 Target Information</h3>

            <p>
              <strong>Target:</strong>{" "}
              {result.target}
            </p>

            <p>
              <strong>IP Address:</strong>{" "}
              {result.ip_address || "N/A"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {result.status}
            </p>

          </div>


          {/* OPEN PORTS */}

          <div className="result-card">

            <h3>🔓 Open Ports</h3>

            {result.open_ports?.length > 0 ? (

              <div className="port-list">

                {result.open_ports.map(
                  (port: number) => (

                    <div
                      className="port-item"
                      key={port}
                    >

                      Port {port}

                    </div>

                  )
                )}

              </div>

            ) : (

              <p>
                ✅ No open ports detected among the scanned ports.
              </p>

            )}

          </div>


          {/* SCANNED PORTS */}

          <div className="result-card">

            <h3>🔍 Scanned Ports</h3>

            <div className="port-list">

              {result.scanned_ports?.map(
                (port: number) => (

                  <div
                    className="port-item"
                    key={port}
                  >

                    {port}

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default NetworkRecon