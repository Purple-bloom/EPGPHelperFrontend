import { useEffect, useState } from "react"

export async function getAddonExport(token) {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/addon/getAddonExport",
            {
                method: "GET",
                headers: {
                    'Authorization': token,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || `Error: ${response.status}`);
        }
            return await response.text();
    } catch (error) {
        console.error("Failed to fetch addon export:", error);
        throw error;
    }
}

export async function applyAddonExport(exportString, token) {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/addon/applyAddonExport",
      {
        method: "POST",
        headers: {
          'Authorization': token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exportString),
      }
    );
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || `Error: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Failed to apply addon export:", error);
    throw error;
  }
}

export function AddonExportForm({ token }) {
  const [exportData, setExportData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExport = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await getAddonExport(token);
      setExportData(data);
    } catch (err) {
      setError(err.message || "Failed to generate export.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-secondary border-2 rounded p-3">
      <h2 className="mb-3">Get Addon Import:</h2>
      <form onSubmit={handleExport}>
        <div className="form-group d-flex flex-column gap-2">
          {error && <div className="text-danger text-center">{error}</div>}

          <div className="d-flex align-items-center justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Exporting..." : "Generate Export"}
            </button>
          </div>
        </div>
      </form>

      {exportData && (
        <div className="mt-3">
          <label className="form-label textSmall">Export Data:</label>
          <textarea
            className="form-control textMedium mb-2"
            rows="4"
            value={exportData}
            readOnly
          />
        </div>
      )}
    </div>
  );
}

export function AddonImportForm({ token }) {
  const [exportString, setExportString] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImport = async (e) => {
    e.preventDefault();
    if (!exportString.trim()) return;

    setLoading(true);
    setStatusMessage(null);
    try {
      const result = await applyAddonExport(exportString, token);
      setStatusMessage({
        type: "success",
        text: result || "Addon data applied successfully!",
      });
      setExportString("");
    } catch (err) {
      setStatusMessage({
        type: "danger",
        text: err.message || "Failed to apply export.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-secondary border-2 rounded p-3">
      <h2 className="mb-3">Apply Addon Export:</h2>
      <form onSubmit={handleImport}>
        <div className="form-group d-flex flex-column gap-2">
          <div className="row align-items-center mt-2">
            <label className="col-sm-4 text-end textSmall mb-0">
              Export String:
            </label>
            <div className="col-sm-8">
              <textarea
                className="form-control textMedium"
                rows="4"
                value={exportString}
                onChange={(e) => setExportString(e.target.value)}
                placeholder="Paste export string here..."
                required
              />
            </div>
          </div>

          {statusMessage && (
            <div
              className={`text-${statusMessage.type} text-center mt-2`}
            >
              {statusMessage.text}
            </div>
          )}

          <div className="d-flex align-items-center justify-content-center mt-3">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? "Applying..." : "Apply Export"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}