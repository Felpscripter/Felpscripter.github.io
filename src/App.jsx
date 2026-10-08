import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Stack from './pages/Stack.jsx';
import Process from './pages/Process.jsx';
import Pipeline from './pages/Pipeline.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stack" element={<Stack />} />
        <Route path="process" element={<Process />} />
        <Route path="pipeline" element={<Pipeline />} />


        <Route path="index.html" element={<Navigate to="/" replace />} />
        <Route path="stack.html" element={<Navigate to="/stack" replace />} />
        <Route path="process.html" element={<Navigate to="/process" replace />} />
        <Route path="pipeline.html" element={<Navigate to="/pipeline" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
