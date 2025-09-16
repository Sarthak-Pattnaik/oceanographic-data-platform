import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DataExplorer from "./pages/DataExplorer";
import TaxonomyExplorer from "./pages/TaxonomyExplorer";


function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/DataExplorer" element={<DataExplorer />} />
        <Route path="/TaxonomyExplorer" element={<TaxonomyExplorer />} />
    </Routes>
  );
}

export default App;
