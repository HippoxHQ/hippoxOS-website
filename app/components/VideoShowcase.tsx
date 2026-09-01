"use client";
import { useState, useRef } from "react";
import { useI18n } from "../providers/I18nProvider";
import { Play, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { YouTubeIcon } from "../icons/YouTubeIcon";
interface VideoItem {
  id: string;
  title: string;
  titleZh: string;
  platform: "youtube" | "bilibili" | "acfun";
  embedUrl: string;
  channel: string;
  channelZh: string;
  duration: string;
}
const videos: VideoItem[] = [
  {
    id: "1",
    title: "HippoxOS - LLM-Native Operating System Overview",
    titleZh: "HippoxOS - LLM 原生操作系统概览",
    platform: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    channel: "HippoxOS Official",
    channelZh: "HippoxOS 官方",
    duration: "2:30",
  },
  {
    id: "2",
    title: "AI Video Editing with HippoxOS",
    titleZh: "使用 HippoxOS 进行 AI 视频编辑",
    platform: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    channel: "Tech Reviews",
    channelZh: "科技评测",
    duration: "5:12",
  },
  {
    id: "3",
    title: "3D Scene Generation in HippoxOS",
    titleZh: "HippoxOS 中的 3D 场景生成",
    platform: "bilibili",
    embedUrl:
      "https://player.bilibili.com/player.html?bvid=BV1GJ411x7f7&autoplay=0",
    channel: "HippoxOS",
    channelZh: "HippoxOS",
    duration: "3:45",
  },
  {
    id: "4",
    title: "Financial Data Analysis with HippoxOS",
    titleZh: "HippoxOS 金融数据分析",
    platform: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    channel: "Data Science Hub",
    channelZh: "数据科学中心",
    duration: "4:20",
  },
  {
    id: "5",
    title: "HippoxOS - Getting Started Guide",
    titleZh: "HippoxOS - 快速入门指南",
    platform: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    channel: "HippoxOS Official",
    channelZh: "HippoxOS 官方",
    duration: "6:15",
  },
  {
    id: "6",
    title: "Advanced 3D Scene Techniques",
    titleZh: "高级 3D 场景技术",
    platform: "bilibili",
    embedUrl:
      "https://player.bilibili.com/player.html?bvid=BV1GJ411x7f7&autoplay=0",
    channel: "HippoxOS",
    channelZh: "HippoxOS",
    duration: "8:30",
  },
];
const platformLabels = {
  youtube: "YouTube",
  bilibili: "B站",
  acfun: "A站",
};
// Video Card Component
const VideoCard = ({
  video,
  onPlay,
}: {
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
}) => {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  return (
    <div
      className="group relative rounded-lg overflow-hidden cursor-pointer bg-background border border-border/40 transition-all duration-300 hover:border-border/80 hover:shadow-xl hover:shadow-foreground/5 flex-shrink-0 w-[280px]"
      onClick={() => onPlay(video)}
    >
      {/* iframe 视频预览 */}
      <div className="relative aspect-video bg-black">
        <iframe
          src={video.embedUrl}
          className="w-full h-full pointer-events-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
        />
        {/* 半透明遮罩 */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
          {/* <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-background shadow-2xl transform scale-90 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 ml-0.5" />
          </div> */}
        </div>
        {/* 平台标识 */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium">
          <span>{platformLabels[video.platform]}</span>
        </div>
        {/* 时长 */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-medium bg-black/70 text-white backdrop-blur-sm">
          {video.duration}
        </div>
      </div>
      {/* 信息 */}
      <div className="p-3">
        <h4 className="text-sm font-medium text-foreground/90 line-clamp-1">
          {isCn ? video.titleZh : video.title}
        </h4>
        <p className="text-xs text-foreground/40 mt-0.5">
          {isCn ? video.channelZh : video.channel}
        </p>
      </div>
    </div>
  );
};
// Video Player Modal
const VideoPlayer = ({
  video,
  onClose,
}: {
  video: VideoItem | null;
  onClose: () => void;
}) => {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  if (!video) return null;
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4 bg-background rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border/40">
          <h3 className="text-sm font-medium text-foreground truncate">
            {/* {isCn ? video.titleZh : video.title} */}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-background/80 transition-colors text-foreground/50 hover:text-foreground"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Video Player */}
        <div className="aspect-video bg-black">
          <iframe
            src={video.embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-background/80 border-t border-border/40">
          <span className="text-xs text-foreground/40">
            {isCn ? "在" : "Watch on"} {platformLabels[video.platform]}
          </span>
          <a
            href={video.embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {isCn ? "在新窗口打开" : "Open in new window"}
          </a>
        </div>
      </div>
    </div>
  );
};
// Main VideoShowcase Component
export default function VideoShowcase() {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 300;
    const target =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
    container.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 20);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 20,
    );
  };
  return (
    <section className="w-full py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {isCn ? "视频展示" : "Video Showcase"}
          </h2>
          <p className="text-xs text-foreground/40 mt-0.5">
            {isCn
              ? "观看 HippoxOS 的相关视频和教程"
              : "Watch HippoxOS videos and tutorials"}
          </p>
        </div>
        <div className="text-[10px] text-foreground/20 font-mono">
          {videos.length} {isCn ? "个视频" : "videos"}
        </div>
      </div>
      {/* 滚动容器 */}
      <div className="relative">
        {/* 左滚动按钮 - 38x38，鼠标指针 */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-[38px] h-[38px] rounded-full bg-background/90 backdrop-blur-sm border border-border/40 shadow-lg flex items-center justify-center hover:bg-background hover:border-border/60 transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-foreground/70" />
          </button>
        )}
        {/* 右滚动按钮 - 38x38，鼠标指针 */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-[38px] h-[38px] rounded-full bg-background/90 backdrop-blur-sm border border-border/40 shadow-lg flex items-center justify-center hover:bg-background hover:border-border/60 transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-foreground/70" />
          </button>
        )}
        {/* 视频卡片列表 - 水平滚动 */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
          onScroll={handleScroll}
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={setSelectedVideo} />
          ))}
        </div>
      </div>
      {/* Video Player Modal */}
      <VideoPlayer
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
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
