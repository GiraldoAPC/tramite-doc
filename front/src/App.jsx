import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/health")
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1>React + Laravel API</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <pre>{data ? JSON.stringify(data, null, 2) : "Cargando..."}</pre>
    </div>
  );
}

