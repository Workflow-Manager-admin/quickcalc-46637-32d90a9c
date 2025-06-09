import React from 'react';
import './App.css';
import QuickCalc from './QuickCalc';

function App() {
  return (
    <div className="app" style={{ background: "#f0f2fa" }}>
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn">QuickCalc</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          {/* Replace hero template with calculator container */}
          <div style={{ paddingTop: 120, paddingBottom: 64, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <QuickCalc />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;