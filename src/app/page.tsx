'use client';

import React, { useState } from 'react';

export default function Home() {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] })
      });
      const data = await response.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setTestResult('Error: ' + (error instanceof Error ? error.message : 'Unknown'));
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '40px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <h1 style={{ color: '#a855f7', marginBottom: '30px' }}>
          🔧 AI Business Agent - Debug Mode
        </h1>
        
        <button
          onClick={testAPI}
          disabled={loading}
          style={{
            background: 'linear-gradient(90deg, #a855f7, #3b82f6)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            fontSize: '18px',
            borderRadius: '10px',
            cursor: loading ? 'wait' : 'pointer',
            marginBottom: '20px'
          }}
        >
          {loading ? 'Testing...' : '🧪 Test AI Connection'}
        </button>

        <div style={{
          background: '#1e1e2e',
          border: '1px solid #333',
          borderRadius: '10px',
          padding: '20px',
          color: '#fff'
        }}>
          <h3 style={{ marginTop: 0 }}>Result:</h3>
          <pre style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            color: testResult.includes('success": true') ? '#22c55e' : '#ef4444'
          }}>
            {testResult || 'Click the button above to test the AI connection'}
          </pre>
        </div>

        <div style={{ marginTop: '30px', color: '#888' }}>
          <h3>Quick Links:</h3>
          <ul>
            <li><a href="https://console.groq.com/keys" target="_blank" style={{ color: '#a855f7' }}>Get Groq API Key</a></li>
            <li><a href="https://vercel.com/dashboard" target="_blank" style={{ color: '#a855f7' }}>Vercel Dashboard</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
