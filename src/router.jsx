import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VillageMap from './components/VillageMap';
import MissionsStats from './pages/MissionsStats';

/**
 * Configuration React Router pour l'application NIRD
 * Routes:
 * - / → VillageMap (page principale)
 * - /missions → MissionsStats (liste des missions et équipes)
 */
export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VillageMap />} />
        <Route path="/missions" element={<MissionsStats />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
