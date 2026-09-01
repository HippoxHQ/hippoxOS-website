// app/components/FunctionList.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from "../providers/I18nProvider";
import { Play, Pause, Maximize2 } from "lucide-react";

// Subsystem data with video backgrounds
const subsystems = [
  {
    id: "video-editor",
    name: "Video Editor",
    nameZh: "视频编辑",
    description: "Edit videos with AI assistance through conversation",
    descriptionZh: "通过对话完成视频剪辑、特效与字幕生成",
    video: "/videos/video-editor-demo.mp4",
    poster: "/posters/video-editor-poster.jpg",
    color: "#818cf8",
  },
  {
    id: "3d-sandbox",
    name: "3D Sandbox",
    nameZh: "3D 场景",
    description: "Generate and manipulate 3D scenes using natural language",
    descriptionZh: "通过自然语言生成和操控 3D 场景",
    video: "/videos/3d-sandbox-demo.mp4",
    poster: "/posters/3d-sandbox-poster.jpg",
    color: "#22d3ee",
  },
  {
    id: "code-editor",
    name: "Code Editor",
    nameZh: "代码编辑",
    description: "AI-powered code generation, refactoring and diff review",
    descriptionZh: "AI 驱动的代码生成、重构与 Diff 审核",
    video: "/videos/code-editor-demo.mp4",
    poster: "/posters/code-editor-poster.jpg",
    color: "#34d399",
  },
  {
    id: "finance",
    name: "Finance",
    nameZh: "金融分析",
    description: "Real-time market data, technical analysis and charting",
    descriptionZh: "实时行情、技术分析与专业图表绘制",
    video: "/videos/finance-demo.mp4",
    poster: "/posters/finance-poster.jpg",
    color: "#f59e0b",
  },
  {
    id: "maps",
    name: "Maps",
    nameZh: "智能地图",
    description: "Visualize data, routes and geospatial information",
    descriptionZh: "可视化数据、路线规划与地理信息分析",
    video: "/videos/maps-demo.mp4",
    poster: "/posters/maps-poster.jpg",
    color: "#f472b6",
  },
  {
    id: "task-scheduler",
    name: "Task Scheduler",
    nameZh: "任务调度",
    description: "Create automated scheduled tasks in natural language",
    descriptionZh: "通过自然语言创建自动化定时任务",
    video: "/videos/task-scheduler-demo.mp4",
    poster: "/posters/task-scheduler-poster.jpg",
    color: "#a78bfa",
  },
];

// Video card component with hover play/pause controls
const FunctionCard = ({
  subsystem,
  isHovered,
  onHover,
}: {
  subsystem: (typeof subsystems)[0];
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) => {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle play/pause via ref - no setState in effect
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

  // Listen to video play/pause events to sync UI state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };

  const name = isCn ? subsystem.nameZh : subsystem.name;
  const description = isCn ? subsystem.descriptionZh : subsystem.description;

  return (
    <div
      className="relative group rounded-2xl overflow-hidden aspect-video bg-background border border-border/30 transition-all duration-500 hover:border-border/60 hover:shadow-2xl hover:shadow-foreground/5 cursor-pointer"
      onMouseEnter={() => onHover(subsystem.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          poster={subsystem.poster}
        >
          <source src={subsystem.video} type="video/mp4" />
        </video>

        {/* Overlay gradient - bottom to top for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
      </div>

      {/* Play/Pause Overlay Button - visible on hover */}
      <button
        onClick={handleTogglePlay}
        className="absolute top-3 right-3 p-2 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background/80 hover:scale-110 z-10"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 text-foreground/70" />
        ) : (
          <Play className="w-3.5 h-3.5 text-foreground/70" />
        )}
      </button>

      {/* Content - bottom aligned */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: subsystem.color }}
          />
          <h3 className="text-base font-semibold text-foreground/90 tracking-tight">
            {name}
          </h3>
        </div>
        <p className="text-xs text-foreground/50 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Learn more indicator - appears on hover */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>{isCn ? "了解更多" : "Learn more"}</span>
          <Maximize2 className="w-3 h-3" />
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        style={{ backgroundColor: `${subsystem.color}15` }}
      />
    </div>
  );
};

// Main FunctionList component
export default function FunctionList() {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="w-full py-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {isCn ? "核心功能" : "Core Functions"}
          </h2>
          <p className="text-sm text-foreground/40 mt-0.5">
            {isCn
              ? "HippoxOS 的核心子系统，全部通过对话驱动"
              : "HippoxOS core subsystems, all driven by conversation"}
          </p>
        </div>
        <div className="text-xs text-foreground/20 font-mono">
          {subsystems.length} {isCn ? "个模块" : "modules"}
        </div>
      </div>

      {/* Cards grid - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subsystems.map((subsystem) => (
          <FunctionCard
            key={subsystem.id}
            subsystem={subsystem}
            isHovered={hoveredId === subsystem.id}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </section>
  );
}
