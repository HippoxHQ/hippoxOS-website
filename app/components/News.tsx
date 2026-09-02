"use client";
import { useState, useRef } from "react";
import { useI18n } from "../providers/I18nProvider";
import {
  ArrowUpRight,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
interface NewsItem {
  id: string;
  title: string;
  titleZh: string;
  date: string;
  summary: string;
  summaryZh: string;
  url: string;
  tag: string;
  tagZh: string;
  image?: string;
}
// News data - Add new items here to update the feed
const newsData: NewsItem[] = [
  {
    id: "1",
    title: "HippoxOS v0.5.0 First Release",
    titleZh: "HippoxOS v0.5.0 首个版本发布",
    date: "2025-01-15",
    summary:
      "The first stable release of HippoxOS — an LLM-native operating system that brings natural language control to your computer.",
    summaryZh:
      "HippoxOS 首个稳定版本发布 —— 一个 LLM 原生的操作系统，将自然语言控制带到你的计算机。",
    url: "https://github.com/HippoxHQ/hippoxOS/releases/tag/v0.5.0",
    tag: "Release",
    tagZh: "发布",
    image: "https://opengraph.githubassets.com/1/HippoxHQ/hippoxOS",
  },
];
// Get fallback gradient and icon based on tag type
const getFallbackImage = (tag: string) => {
  const colors: Record<string, string> = {
    Release: "from-emerald-500/20 to-emerald-900/20",
    Update: "from-blue-500/20 to-blue-900/20",
    Announcement: "from-purple-500/20 to-purple-900/20",
  };
  return colors[tag] || "from-indigo-500/20 to-indigo-900/20";
};
// News Card Component - Clicking the card opens the URL directly
const NewsCard = ({ item }: { item: NewsItem }) => {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  const [imgError, setImgError] = useState(false);
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-lg overflow-hidden cursor-pointer bg-background border border-border/40 transition-all duration-300 hover:border-border/80 hover:shadow-xl hover:shadow-foreground/5 flex-shrink-0 w-[280px]"
    >
      {/* Cover image or fallback gradient */}
      <div className="relative aspect-video bg-gradient-to-br from-background/80 to-background/40 overflow-hidden">
        {item.image && !imgError ? (
          <img
            src={item.image}
            alt={isCn ? item.titleZh : item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${getFallbackImage(item.tag)} flex items-center justify-center`}
          >
            <span className="text-4xl opacity-20">📰</span>
          </div>
        )}
        {/* Tag badge - top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium">
          <Tag className="w-3 h-3" />
          <span>{isCn ? item.tagZh : item.tag}</span>
        </div>
        {/* Date badge - bottom right */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-medium bg-black/70 text-white backdrop-blur-sm">
          {new Date(item.date).toLocaleDateString()}
        </div>
      </div>
      {/* Content */}
      <div className="p-3">
        <h4 className="text-sm font-medium text-foreground/90 line-clamp-1">
          {isCn ? item.titleZh : item.title}
        </h4>
        <p className="text-xs text-foreground/40 mt-1 line-clamp-2">
          {isCn ? item.summaryZh : item.summary}
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-foreground/20 group-hover:text-foreground/40 transition-colors">
          <ExternalLink className="w-3 h-3" />
          <span>{isCn ? "查看详情" : "Read more"}</span>
        </div>
      </div>
    </a>
  );
};
// Main News Component - Horizontal scrollable carousel
export default function News() {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  // Scroll the container left or right by 300px
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 300;
    const target =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
    container.scrollTo({ left: target, behavior: "smooth" });
  };
  // Update scroll button visibility based on scroll position
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 20);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 20,
    );
  };
  return (
    <section className="w-full py-5">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {isCn ? "最新动态" : "News"}
            </h2>
            <p className="text-xs text-foreground/40 mt-0.5">
              {isCn
                ? "HippoxOS 的最新版本和更新"
                : "Latest releases and updates"}
            </p>
          </div>
          <div className="text-[10px] text-foreground/20 font-mono">
            {newsData.length} {isCn ? "条动态" : "posts"}
          </div>
        </div>
        {/* Carousel container with navigation buttons */}
        <div className="relative">
          {/* Left scroll button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-[38px] h-[38px] rounded-full bg-background/90 backdrop-blur-sm border border-border/40 shadow-lg flex items-center justify-center hover:bg-background hover:border-border/60 transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-foreground/70" />
            </button>
          )}
          {/* Right scroll button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-[38px] h-[38px] rounded-full bg-background/90 backdrop-blur-sm border border-border/40 shadow-lg flex items-center justify-center hover:bg-background hover:border-border/60 transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-foreground/70" />
            </button>
          )}
          {/* Horizontal scrollable news cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
            onScroll={handleScroll}
          >
            {newsData.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      {/* Hide scrollbar styles */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
