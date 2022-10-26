import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import { Test } from 'datasets/Test';

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="app-shell" />} />
        <Route path="/datasets" element={<React.Suspense fallback="Loading..."><Test displayText="This is a test component" /></React.Suspense>} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
