import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "../src/pages/SearchPage";
import FavoritesPage from "../src/pages/FavoritesPage";
import Layout from "../src/components/Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
