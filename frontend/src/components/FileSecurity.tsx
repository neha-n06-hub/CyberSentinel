import { useState } from "react"

function FileSecurity() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyzeFile = async () => {
    if (!file) {
      setError("Please select a file first.")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const formData = new FormData()

      formData.append("file", file)

      const response = await fetch(
        "http://127.0.0.1:8000/api/file/analyze",
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error("Failed to analyze file")
      }

      const data = await response.json()

      setResult(data.analysis)

    } catch (err) {

      console.error(err)

      setError(
        "Unable to connect to CyberSentinel backend."
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="file-security-page">

      {/* HEADER */}

      <div className="file-security-header">

        <h1>📁 File Security Analysis</h1>

        <p>
          Analyze files for potentially suspicious characteristics
          and security risks.
        </p>

      </div>


      {/* UPLOAD CARD */}

      <div className="file-upload-card">

        <h2>Analyze a File</h2>

        <p>
          Select a file to perform a security analysis.
        </p>


        <div className="file-input-container">

          <input
            type="file"
            onChange={(e) => {

              const selectedFile =
                e.target.files?.[0] || null

              setFile(selectedFile)

              setError("")

              setResult(null)

            }}
          />

        </div>


        {file && (

          <div className="selected-file">

            <p>
              📄 Selected File:
            </p>

            <strong>
              {file.name}
            </strong>

          </div>

        )}


        <button
          className="analyze-file-button"
          onClick={analyzeFile}
          disabled={loading}
        >

          {loading
            ? "Analyzing..."
            : "Analyze File →"}

        </button>


        {error && (

          <div className="error-message">

            ⚠️ {error}

          </div>

        )}

      </div>


      {/* RESULTS */}

      {result && (

        <div className="file-analysis-results">

          <h2>
            Security Analysis Results
          </h2>


          {/* FINAL ASSESSMENT */}

          <div className="result-card final-result">

            <div>

              <h3>
                Final Assessment
              </h3>

              <p className="result-url">
                {result.filename}
              </p>

            </div>


            <div
              className={`risk-badge ${
                result.is_suspicious
                  ? "danger"
                  : "safe"
              }`}
            >

              {result.is_suspicious
                ? "⚠️ SUSPICIOUS"
                : "✅ SAFE"}

            </div>

          </div>


          {/* SUMMARY */}

          <div className="result-grid">

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

              <div className="risk-level">

                {result.risk_level}

              </div>

            </div>


            <div className="result-card">

              <h3>
                File Type
              </h3>

              <div className="prediction">

                {result.file_extension || "Unknown"}

              </div>

            </div>

          </div>


          {/* FILE INFORMATION */}

          <div className="result-card">

            <h3>
              📄 File Information
            </h3>

            <p>

              <strong>
                Filename:
              </strong>{" "}

              {result.filename}

            </p>


            <p>

              <strong>
                File Size:
              </strong>{" "}

              {(result.file_size / 1024).toFixed(2)} KB

            </p>


            <p>

              <strong>
                Extension:
              </strong>{" "}

              {result.file_extension || "None"}

            </p>

          </div>


          {/* SECURITY REASONS */}

          <div className="result-card">

            <h3>
              🛡️ Security Analysis
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
                ✅ No suspicious characteristics
                were detected.
              </p>

            )}

          </div>

        </div>

      )}

    </div>
  )
}

export default FileSecurity