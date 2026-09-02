"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FunctionList from "./components/FunctionList";
import SatelliteProjects from "./components/SatelliteProjects";
import DocsList from "./components/DocsList";
import Footer from "./components/Footer";
import VideoShowcase from "./components/VideoShowcase";
import LLMList from "./components/LLMList";
import FAQ from "./components/FAQ";
import News from "./components/News";
import SystemRequirements from "./components/SystemRequirements";
import { ArrowUp } from "lucide-react";
interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}
export default function HomePage() {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const handleSelectRepo = (repo: Repo) => {
    setSelectedRepo(repo);
  };
  useEffect(() => {
    const scrollContainer = document.querySelector(".scrollable-content");
    if (!scrollContainer) return;
    const handleScroll = () => {
      setShowScrollTop(scrollContainer.scrollTop > 300);
    };
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    const scrollContainer = document.querySelector(".scrollable-content");
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Header - fixed, not scrollable */}
      <Header />
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto scrollable-content">
        {/* Hero - full width */}
        <Hero />
        <LLMList />
        {/* Function List - full width with max-w constraint */}
        <div className="max-w-7xl mx-auto px-6">
          <FunctionList />
          <VideoShowcase />
          <News />
          <SystemRequirements />
          <FAQ />
        </div>
        {/* Rest of content */}
        {/* <div className="max-w-5xl mx-auto px-6 py-4 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <SatelliteProjects
              onSelectRepo={handleSelectRepo}
              selectedRepoName={selectedRepo?.name}
            />
            <DocsList />
          </div>
        </div> */}
        <Footer />
      </div>
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-8 right-8 z-50
          w-12 h-12 rounded-full
          bg-black text-white
          border border-gray-300
          shadow-[0_4px_12px_rgba(0,0,0,0.15)]
          hover:bg-gray-800 hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]
          active:bg-gray-900
          transition-all duration-300 ease-in-out
          flex items-center justify-center
          cursor-pointer
          ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16 pointer-events-none"
          }
        `}
        aria-label="滚动到顶部"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
