import { useState } from "react"

function RiskScore() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyzeRisk = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/risk/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phishing_score: 40,
            network_score: 70,
            traffic_score: 60,
            file_score: 30,
            password_score: 80,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Risk analysis failed")
      }

      const data = await response.json()

      setResult(data.analysis)

    } catch (err) {
      console.error(err)

      setError(
        "Unable to connect to CyberSentinel Risk Engine. Make sure FastAPI is running."
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="risk-score-page">

      {/* HEADER */}

      <div className="risk-score-header">

        <h1>🛡️ Unified Risk Score</h1>

        <p>
          Analyze your overall cybersecurity posture using CyberSentinel's
          unified risk engine.
        </p>

      </div>


      {/* ANALYZE BUTTON */}

      <div className="risk-engine-card">

        <h2>Security Risk Assessment</h2>

        <p>
          The risk engine combines results from multiple security modules
          to calculate your overall cybersecurity risk.
        </p>

        <button
          className="analyze-risk-button"
          onClick={analyzeRisk}
          disabled={loading}
        >
          {loading
            ? "Analyzing Security Posture..."
            : "Run Security Assessment →"}
        </button>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

      </div>


      {/* RESULTS */}

      {result && (

        <div className="risk-results">

          <h2>
            Security Assessment Results
          </h2>


          {/* OVERALL SCORE */}

          <div className="overall-risk-card">

            <div>

              <h3>
                Overall Security Risk Score
              </h3>

              <p>
                Combined analysis from all CyberSentinel
                security modules.
              </p>

            </div>


            <div className="overall-score">

              <strong>
                {result.overall_score}
              </strong>

              <span>
                /100
              </span>

            </div>

          </div>


          {/* RISK LEVEL */}

          <div className="risk-level-card">

            <h3>
              Overall Risk Level
            </h3>

            <div
              className={`overall-risk-level ${
                result.risk_level?.toLowerCase()
              }`}
            >
              {result.risk_level}
            </div>

          </div>


          {/* COMPONENT SCORES */}

          <h2>
            Security Module Scores
          </h2>

          <div className="risk-components-grid">

            <div className="risk-component-card">

              <span>
                🎣
              </span>

              <h3>
                Phishing Detection
              </h3>

              <strong>
                {result.component_scores?.phishing}/100
              </strong>

            </div>


            <div className="risk-component-card">

              <span>
                🌐
              </span>

              <h3>
                Network Reconnaissance
              </h3>

              <strong>
                {result.component_scores?.network}/100
              </strong>

            </div>


            <div className="risk-component-card">

              <span>
                📡
              </span>

              <h3>
                Traffic Analysis
              </h3>

              <strong>
                {result.component_scores?.traffic}/100
              </strong>

            </div>


            <div className="risk-component-card">

              <span>
                📁
              </span>

              <h3>
                File Security
              </h3>

              <strong>
                {result.component_scores?.file}/100
              </strong>

            </div>


            <div className="risk-component-card">

              <span>
                🔑
              </span>

              <h3>
                Password Security
              </h3>

              <strong>
                {result.component_scores?.password}/100
              </strong>

            </div>

          </div>


          {/* RECOMMENDATIONS */}

          <div className="risk-recommendations">

            <h2>
              💡 Security Recommendations
            </h2>

            {result.recommendations?.map(
              (
                recommendation: string,
                index: number
              ) => (

                <div
                  className="recommendation-item"
                  key={index}
                >

                  <span>
                    ⚠️
                  </span>

                  <p>
                    {recommendation}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>
  )
}

export default RiskScore