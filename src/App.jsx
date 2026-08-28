import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ResearchCatalogPage } from './pages/ResearchCatalogPage';
import { ResearchArticlePage } from './pages/ResearchArticlePage';
import { LabsCatalogPage } from './pages/LabsCatalogPage';
import { LabDetailPage } from './pages/LabDetailPage';
import { MitreMatrixPage } from './pages/MitreMatrixPage';
import { KanbanPage } from './pages/KanbanPage';
import { AboutPage } from './pages/AboutPage';
import { RssPage } from './pages/RssPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#090d16] text-[#f8fafc]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchCatalogPage />} />
            <Route path="/research/:slug" element={<ResearchArticlePage />} />
            <Route path="/labs" element={<LabsCatalogPage />} />
            <Route path="/labs/:slug" element={<LabDetailPage />} />
            <Route path="/matrix" element={<MitreMatrixPage />} />
            <Route path="/pipeline" element={<KanbanPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/rss" element={<RssPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
