// This is the correct App.tsx code
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout'; 
import VisualizationsPage from './components/visualizations';
import SpeciesPage from './components/species';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<VisualizationsPage />} />
        <Route path="species-database" element={<SpeciesPage />} />
      </Route>
    </Routes>
  );
}

export default App;