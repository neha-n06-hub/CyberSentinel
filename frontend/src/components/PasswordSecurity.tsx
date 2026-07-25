import { useState } from "react"

function PasswordSecurity() {
  const [password, setPassword] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyzePassword = async () => {
    if (!password.trim()) {
      setError("Please enter a password to analyze.")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/password/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Password analysis failed")
      }

      const data = await response.json()

      setResult(data.password_analysis)

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
    <div className="password-security-page">

      {/* HEADER */}

      <div className="phishing-header">

        <h1>🔑 Password Security</h1>

        <p>
          Evaluate password strength and identify potential security weaknesses.
        </p>

      </div>


      {/* PASSWORD ANALYSIS CARD */}

      <div className="url-analysis-card">

        <h2>Analyze Password</h2>

        <p>
          Enter a password to evaluate its security characteristics.
        </p>

        <div className="password-input-container">

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
              setResult(null)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                analyzePassword()
              }
            }}
          />

          <button
            onClick={analyzePassword}
            disabled={loading}
          >
            {loading
              ? "Analyzing..."
              : "Analyze Password →"}
          </button>

        </div>

        <p className="security-note">
          🔒 For security, passwords are analyzed locally through the
          CyberSentinel analysis API and should not be reused in real accounts.
        </p>

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
            Password Security Results
          </h2>


          {/* SUMMARY CARDS */}

          <div className="result-grid">


            {/* SCORE */}

            <div className="result-card">

              <h3>
                Security Score
              </h3>

              <div className="big-number">

                {result.score}

                <span>
                  /100
                </span>

              </div>

            </div>


            {/* STRENGTH */}

            <div className="result-card">

              <h3>
                Password Strength
              </h3>

              <div className="prediction">

                {result.strength}

              </div>

            </div>


            {/* RISK */}

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


          {/* PASSWORD DETAILS */}

          <div className="result-card">

            <h3>
              🔍 Password Analysis
            </h3>

            <p>
              <strong>Password Length:</strong>{" "}
              {result.password_length} characters
            </p>

          </div>


          {/* SECURITY REASONS */}

          <div className="result-card">

            <h3>
              🛡️ Security Findings
            </h3>

            {result.reasons?.length > 0 ? (

              <ul>

                {result.reasons.map(
                  (
                    reason: string,
                    index: number
                  ) => (

                    <li key={index}>
                      ⚠️ {reason}
                    </li>

                  )
                )}

              </ul>

            ) : (

              <p>
                ✅ No major password weaknesses detected.
              </p>

            )}

          </div>


          {/* RECOMMENDATIONS */}

          <div className="result-card">

            <h3>
              💡 Security Recommendations
            </h3>

            <ul>

              {result.reasons?.length > 0 ? (

                result.reasons.map(
                  (
                    reason: string,
                    index: number
                  ) => (

                    <li key={index}>
                      🔐 Improve security: {reason}
                    </li>

                  )
                )

              ) : (

                <li>
                  ✅ Your password meets the current security
                  requirements.
                </li>

              )}

            </ul>

          </div>

        </div>

      )}

    </div>
  )
}

export default PasswordSecurity