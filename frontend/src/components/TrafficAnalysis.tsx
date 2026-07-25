import { useState } from "react"

function TrafficAnalysis() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const analyzeTraffic = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    // Sample traffic data for testing
    const packets = [
      {
        source_ip: "192.168.1.10",
        destination_ip: "192.168.1.1",
        protocol: "TCP",
        destination_port: 443,
      },
      {
        source_ip: "192.168.1.10",
        destination_ip: "192.168.1.20",
        protocol: "TCP",
        destination_port: 3306,
      },
      {
        source_ip: "192.168.1.15",
        destination_ip: "192.168.1.30",
        protocol: "TELNET",
        destination_port: 23,
      },
      {
        source_ip: "192.168.1.20",
        destination_ip: "192.168.1.40",
        protocol: "TCP",
        destination_port: 3389,
      },
    ]

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/traffic/analyze",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            packets: packets,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Traffic analysis failed")
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
    <div className="phishing-page">

      {/* HEADER */}

      <div className="phishing-header">

        <h1>
          📡 Traffic Analysis
        </h1>

        <p>
          Analyze network traffic and identify potentially suspicious activity.
        </p>

      </div>


      {/* ANALYSIS CARD */}

      <div className="url-analysis-card">

        <h2>
          Network Traffic Analyzer
        </h2>

        <p>
          Analyze captured network traffic for suspicious protocols,
          ports, and potential security threats.
        </p>

        <button
          className="analyze-button"
          onClick={analyzeTraffic}
          disabled={loading}
        >

          {loading
            ? "Analyzing Traffic..."
            : "🔍 Analyze Network Traffic →"
          }

        </button>


        {error && (

          <div className="error-message">

            ⚠️ {error}

          </div>

        )}

      </div>


      {/* RESULTS */}

      {result && (

        <div className="analysis-results">

          <h2>
            Traffic Analysis Results
          </h2>


          {/* SUMMARY */}

          <div className="result-grid">


            <div className="result-card">

              <h3>
                Total Packets
              </h3>

              <div className="big-number">

                {result.total_packets}

              </div>

            </div>


            <div className="result-card">

              <h3>
                Suspicious Packets
              </h3>

              <div className="big-number">

                {result.suspicious_packets}

              </div>

            </div>


            <div className="result-card">

              <h3>
                Risk Score
              </h3>

              <div className="big-number">

                {result.risk_score}

                <span>
                  /100
                </span>

              </div>

            </div>


            <div className="result-card">

              <h3>
                Risk Level
              </h3>

              <div
                className={`risk-level ${
                  result.risk_level?.toLowerCase()
                }`}
              >

                {result.risk_level}

              </div>

            </div>

          </div>


          {/* THREATS */}

          <div className="result-card">

            <h3>
              🚨 Detected Threats
            </h3>


            {result.threats?.length === 0 ? (

              <p>
                ✅ No suspicious traffic detected.
              </p>

            ) : (

              <div className="threat-list">

                {result.threats.map(
                  (threat: any, index: number) => (

                    <div
                      className="threat-item"
                      key={index}
                    >

                      <h4>
                        ⚠️ {threat.type}
                      </h4>

                      <p>
                        {threat.description}
                      </p>

                      <p>
                        <strong>
                          Source:
                        </strong>{" "}
                        {threat.source_ip}
                      </p>

                      <p>
                        <strong>
                          Destination:
                        </strong>{" "}
                        {threat.destination_ip}
                      </p>

                      <p>
                        <strong>
                          Severity:
                        </strong>{" "}
                        {threat.severity}
                      </p>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* STATUS */}

          <div className="result-card">

            <h3>
              🛡️ Analysis Status
            </h3>

            <p>
              {result.status}
            </p>

          </div>

        </div>

      )}

    </div>
  )
}

export default TrafficAnalysis