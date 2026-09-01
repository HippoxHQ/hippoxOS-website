"use client";
import { useState, useRef, useEffect } from "react";
import { useI18n } from "../providers/I18nProvider";
// Subsystem data with video backgrounds
const subsystems = [
  {
    id: "general-chat",
    name: "General Chat",
    nameZh: "通用对话",
    description: "Daily Q&A · Task Execution · Knowledge Retrieval",
    descriptionZh: "日常问答 · 任务执行 · 知识检索",
    detail:
      "Natural language interaction with LLM for daily questions, task automation, and knowledge base retrieval.",
    detailZh:
      "通过自然语言与 LLM 深度交互，真正意义上实现对计算机的完全控制 —— 从系统级操作到硬件设备调度，释放计算机 100% 的潜能，让每一条指令都精准执行。",
    video: "http://vjs.zencdn.net/v/oceans.mp4",
    color: "#818cf8",
  },
  {
    id: "video-editor",
    name: "Video Editor",
    nameZh: "视频编辑",
    description: "Edit · Effects · Export · Multi-track",
    descriptionZh: "剪辑 · 特效 · 导出 · 多轨道编辑",
    detail:
      "AI-powered video editing through conversation. Add effects, captions, and export with multi-track support.",
    detailZh:
      "搭载自研 NLE 非线性编辑引擎，支持多轨道剪辑、线性动画、26 种专业转场、15 种滤镜效果、78 种 VFX 视觉特效及 15 种运镜特效，一站式完成从剪辑到导出的全流程视频创作。",
    video: "http://vjs.zencdn.net/v/oceans.mp4",
    color: "#818cf8",
  },
  {
    id: "finance",
    name: "Finance",
    nameZh: "金融分析",
    description: "Candlestick · Indicators · Market Analysis",
    descriptionZh: "K线分析 · 技术指标 · 市场研判",
    detail:
      "Real-time market data visualization with candlestick charts, technical indicators, and trend analysis.",
    detailZh:
      "搭载自研时间序列数据图形引擎，原生支持 DSL 分析语言与 OHLCV 金融数据模型，实现毫秒级行情数据可视化、技术指标计算与量化策略回测。",
    video: "http://vjs.zencdn.net/v/oceans.mp4",
    color: "#f59e0b",
  },
  {
    id: "code-editor",
    name: "Code Editor",
    nameZh: "代码编辑",
    description: "Write · Review · Refactor · Auto-complete",
    descriptionZh: "编写 · 审查 · 重构 · 自动补全",
    detail:
      "AI-assisted code writing, refactoring, and review with intelligent auto-completion and diff visualization.",
    detailZh:
      "AI 辅助代码编写、重构与审查，支持智能自动补全和可视化 Diff 对比。",
    video: "http://vjs.zencdn.net/v/oceans.mp4",
    color: "#34d399",
  },
  {
    id: "3d-sandbox",
    name: "3D Sandbox",
    nameZh: "3D 场景",
    description: "3D Modeling · Scene Building · Real-time Render",
    descriptionZh: "三维建模 · 场景构建 · 实时渲染",
    detail:
      "Create and manipulate 3D scenes using natural language. Real-time rendering with Three.js engine.",
    detailZh:
      "基于 Three.js 引擎的实时 3D 创作沙盒，支持 PBR 材质、物理光照、粒子系统与骨骼动画。通过自然语言即可生成、编辑和操控三维场景，所见即所得的实时渲染体验。",
    video: "http://vjs.zencdn.net/v/oceans.mp4",
    color: "#22d3ee",
  },
  {
    id: "maps",
    name: "Maps",
    nameZh: "地理信息",
    description: "Location · Route · Spatial Data",
    descriptionZh: "位置标注 · 路线规划 · 空间数据",
    detail:
      "Geospatial data visualization with location tagging, route planning, and spatial analysis capabilities.",
    detailZh:
      "基于 WebGL 的地理空间数据可视化平台，支持多源矢量/栅格数据加载、交互式位置标注、智能路线规划与空间分析，让地理信息触手可及。",
    video: "http://vjs.zencdn.net/v/oceans.mp4",
    color: "#f472b6",
  },
];
// Video card component with autoplay and dense content
const FunctionCard = ({ subsystem }: { subsystem: (typeof subsystems)[0] }) => {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  // Auto-play video when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);
  const name = isCn ? subsystem.nameZh : subsystem.name;
  const description = isCn ? subsystem.descriptionZh : subsystem.description;
  const detail = isCn ? subsystem.detailZh : subsystem.detail;
  return (
    <div className="relative group aspect-[4/1] bg-background border-b border-border/40 last:border-b-0 cursor-pointer transition-all duration-300 hover:bg-background/80 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {!videoError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
          >
            <source src={subsystem.video} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-gradient-to-br from-background/80 to-background/40"
            style={{
              backgroundImage: `radial-gradient(circle at 70% 50%, ${subsystem.color}15, transparent 70%)`,
            }}
          />
        )}
      </div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-transparent via-40% to-background/90" />
      <div className="absolute inset-0 flex items-center justify-end p-6">
        <div className="max-w-[50%] text-right relative z-10">
          <div
            className="w-1.5 h-1.5 rounded-full mb-2 ml-auto"
            style={{ backgroundColor: subsystem.color }}
          />
          <h3 className="text-lg font-semibold text-foreground/90 tracking-tight mb-1">
            {name}
          </h3>
          <p className="text-xs text-foreground/60 leading-relaxed mb-1.5">
            {description}
          </p>
          <p className="text-[11px] text-foreground/45 leading-relaxed max-w-sm ml-auto">
            {detail}
          </p>
        </div>
      </div>
      <div
        className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        style={{ backgroundColor: `${subsystem.color}10` }}
      />
    </div>
  );
};
// Main FunctionList component
export default function FunctionList() {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  return (
    <section className="w-full py-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {isCn ? "核心功能" : "Core Functions"}
          </h2>
          <p className="text-xs text-foreground/40 mt-0.5">
            {isCn
              ? "HippoxOS 的核心子系统，全部通过对话驱动"
              : "HippoxOS core subsystems, all driven by conversation"}
          </p>
        </div>
        <div className="text-[10px] text-foreground/20 font-mono">
          {subsystems.length} {isCn ? "个模块" : "modules"}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 border border-border/40 rounded-none">
        {subsystems.map((subsystem, index) => (
          <div
            key={subsystem.id}
            className={`
              ${index % 2 === 0 ? "border-r border-border/40" : ""}
              ${index < subsystems.length - 2 ? "border-b border-border/40" : ""}
              ${index >= subsystems.length - 2 && index % 2 === 1 ? "" : ""}
              md:${index % 2 === 0 ? "border-r border-border/40" : ""}
              md:${index < subsystems.length - 2 ? "border-b border-border/40" : ""}
            `}
          >
            <FunctionCard subsystem={subsystem} />
          </div>
        ))}
      </div>
    </section>
  );
}
