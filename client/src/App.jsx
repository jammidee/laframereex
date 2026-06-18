import { useEffect, useState } from 'react';

function App() {
  const [backendStatus, setBackendStatus] = useState('Connecting...');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.message))
      .catch(() => setBackendStatus('Backend is offline'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Lakuboreex Application</h1>
      <p><strong>Backend Status:</strong> {backendStatus}</p>
    </div>
  );
}

export default App;