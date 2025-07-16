import { useState } from 'react';

export default function Home() {
  const [token, setToken] = useState('');
  const [network, setNetwork] = useState('ethereum');
  const [timestamp, setTimestamp] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrice = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://YOUR_REPLIT_BACKEND_URL/price?token=${token}&network=${network}&timestamp=${timestamp}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Something went wrong' });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial', maxWidth: 600, margin: 'auto' }}>
      <h1>🎯 Price Oracle</h1>

      <div style={{ marginBottom: 10 }}>
        <label>Token Address:</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="0x..."
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Network:</label>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        >
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
        </select>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Timestamp:</label>
        <input
          type="number"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="Unix timestamp"
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <button onClick={fetchPrice} style={{ padding: 10, width: '100%' }}>
        {loading ? 'Fetching...' : 'Get Price'}
      </button>

      {result && (
        <div style={{ marginTop: 20, background: '#f5f5f5', padding: 10 }}>
          {result.error ? (
            <p style={{ color: 'red' }}>Error: {result.error}</p>
          ) : (
            <>
              <p><strong>Price:</strong> {result.price}</p>
              <p><strong>Source:</strong> {result.source}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
