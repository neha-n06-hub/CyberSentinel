import { useState } from "react"

function PhishingDetection() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyzeURL = async () => {
    if (!url.trim()) {
      setError("Please enter a URL.")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/phishing/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to analyze URL")
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
        <div>
          <h1>🎣 Phishing Detection</h1>

          <p>
            Analyze suspicious URLs using rule-based security analysis
            and machine learning.
          </p>
        </div>
      </div>


      {/* URL INPUT */}

      <div className="url-analysis-card">

        <h2>Analyze a URL</h2>

        <p>
          Enter a website URL to check whether it may be a phishing threat.
        </p>

        <div className="url-input-container">

          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                analyzeURL()
              }
            }}
          />

          <button
            onClick={analyzeURL}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze URL →"}
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

        <div className="analysis-results">

          <h2>Security Analysis Results</h2>


          {/* FINAL ASSESSMENT */}

          <div className="result-card final-result">

            <div>

              <h3>Final Assessment</h3>

              <p className="result-url">
                {result.url}
              </p>

            </div>

            <div
              className={`risk-badge ${
                result.final_assessment?.is_suspicious
                  ? "danger"
                  : "safe"
              }`}
            >

              {result.final_assessment?.is_suspicious
                ? "⚠️ SUSPICIOUS"
                : "✅ SAFE"}

            </div>

          </div>


          {/* SUMMARY CARDS */}

          <div className="result-grid">

            <div className="result-card">

              <h3>Risk Score</h3>

              <div className="big-number">

                {result.final_assessment?.risk_score}

                <span>/100</span>

              </div>

            </div>


            <div className="result-card">

              <h3>Risk Level</h3>

              <div
                className={`risk-level ${
                  result.final_assessment?.risk_level?.toLowerCase()
                }`}
              >

                {result.final_assessment?.risk_level}

              </div>

            </div>


            <div className="result-card">

              <h3>ML Prediction</h3>

              <div className="prediction">

                {result.ml_analysis?.prediction}

              </div>

            </div>

          </div>


          {/* RULE BASED ANALYSIS */}

          <div className="result-card">

            <h3>🛡️ Rule-Based Analysis</h3>

            <p>
              <strong>Risk Score:</strong>{" "}
              {result.rule_based_analysis?.risk_score}
            </p>

            <p>
              <strong>Risk Level:</strong>{" "}
              {result.rule_based_analysis?.risk_level}
            </p>


            {result.rule_based_analysis?.reasons?.length > 0 && (

              <div className="reasons">

                <h4>Security Reasons</h4>

                <ul>

                  {result.rule_based_analysis.reasons.map(
                    (reason: string, index: number) => (

                      <li key={index}>
                        ⚠️ {reason}
                      </li>

                    )
                  )}

                </ul>

              </div>

            )}

          </div>


          {/* ML ANALYSIS */}

          <div className="result-card">

            <h3>🤖 Machine Learning Analysis</h3>

            <p>

              <strong>Prediction:</strong>{" "}

              {result.ml_analysis?.prediction}

            </p>

            <p>

              <strong>Phishing Probability:</strong>{" "}

              {result.ml_analysis?.phishing_probability}%

            </p>

          </div>


          {/* FEATURES */}

          <div className="result-card">

            <h3>🔍 Extracted URL Features</h3>

            <div className="features-grid">

              {Object.entries(result.features || {}).map(
                ([key, value]) => (

                  <div
                    className="feature-item"
                    key={key}
                  >

                    <span>
                      {key}
                    </span>

                    <strong>
                      {String(value)}
                    </strong>

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

export default PhishingDetection