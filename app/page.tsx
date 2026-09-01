"use client";

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FunctionList from "./components/FunctionList";
import SatelliteProjects from "./components/SatelliteProjects";
import DocsList from "./components/DocsList";
import Footer from "./components/Footer";

interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export default function HomePage() {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const handleSelectRepo = (repo: Repo) => {
    setSelectedRepo(repo);
  };
  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto">
        {/* Hero - full width */}
        <Hero />
        {/* Function List - full width with max-w constraint */}
        <div className="max-w-5xl mx-auto px-6">
          <FunctionList />
        </div>
        {/* Rest of content */}
        <div className="max-w-5xl mx-auto px-6 py-4 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <SatelliteProjects
              onSelectRepo={handleSelectRepo}
              selectedRepoName={selectedRepo?.name}
            />
            <DocsList />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
