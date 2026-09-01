/* eslint-disable @next/next/no-img-element */
"use client";

import { useI18n } from "../providers/I18nProvider";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Download,
  ChevronRight,
  ArrowUpRight,
  Star,
  GitFork,
} from "lucide-react";
import { LinuxIcon } from "../icons/LinuxIcon";
import { MacOSIcon } from "../icons/MacOSIcon";
import { WindowsIcon } from "../icons/WindwosIcon";
import { GitHubIcon } from "../icons/GitHubIcon";
import { useTheme } from "../providers/ThemeProvider";
import ArtText from "./arts/ArtText";

// Platform configuration with download details - one file per platform
const platformConfig = {
  windows: {
    label: "Windows",
    icon: <WindowsIcon className="w-4 h-4" />,
  },
  macos: {
    label: "macOS",
    icon: <MacOSIcon className="w-4 h-4" />,
  },
  linux: {
    label: "Linux",
    icon: <LinuxIcon className="w-4 h-4" />,
  },
};

// GitHub repository URL
const GITHUB_REPO = "https://github.com/HippoxHQ/hippoxOS";
const GITHUB_API = "https://api.github.com/repos/HippoxHQ/hippoxOS";

export default function Hero() {
  const { locale } = useI18n();
  const { theme } = useTheme();
  const isCn = locale === "cn";
  const isDark = theme === "dark";
  const [activePlatform, setActivePlatform] = useState<
    "windows" | "macos" | "linux"
  >("windows");
  const [githubStats, setGithubStats] = useState<{
    stars: string;
    forks: string;
  }>({
    stars: "0",
    forks: "0",
  });
  const [version, setVersion] = useState<string>("0.0.0");
  const [loading, setLoading] = useState(true);

  // Fetch GitHub repository data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const response = await fetch(GITHUB_API);
        if (response.ok) {
          const data = await response.json();
          setGithubStats({
            stars: data.stargazers_count?.toLocaleString() || "0",
            forks: data.forks_count?.toLocaleString() || "0",
          });
        }

        // Fetch latest release version from tags
        const tagsResponse = await fetch(
          "https://api.github.com/repos/HippoxHQ/hippoxOS/tags",
        );
        if (tagsResponse.ok) {
          const tags = await tagsResponse.json();
          if (tags && tags.length > 0) {
            const latestTag = tags[0].name.replace(/^v/, "");
            setVersion(latestTag);
          }
        }
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const currentPlatform = platformConfig[activePlatform];

  // Build download URL - platform specific
  const getDownloadUrl = (platform: string) => {
    const fileMap: Record<string, string> = {
      windows: `hippoxOS_windows_x86_64_v${version}.msi`,
      macos: `hippoxOS_macos_x86_64_v${version}.dmg`,
      linux: `hippoxOS_linux_x86_64_v${version}.deb`,
    };
    const fileName = fileMap[platform] || "";
    return `https://github.com/HippoxHQ/hippoxOS/releases/download/v${version}/${fileName}`;
  };

  // ArtText colors based on theme - black & white style with flow effect
  // 暗色模式：文字亮色（白色），高光更亮（流光从亮色扫到更亮）
  // 亮色模式：文字暗色（黑色），高光更暗（流光从暗色扫到更暗）
  const artTextColor = isDark ? "#e8edf2" : "#1a1a2e";
  const artLightColor = isDark ? "#a78bfa" : "#4f46e5";

  return (
    <section className="relative min-h-[50vh] w-full flex items-center overflow-hidden">
      {/* Background layer: gradients + glows + grid + image */}
      <div className="absolute inset-0 w-full h-full">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-zinc-900/10" />

        {/* Glow effects - top left */}
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl" />

        {/* Glow effects - bottom right */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl" />

        {/* Glow effects - center right */}
        <div className="absolute top-1/2 right-1/4 w-60 h-60 rounded-full bg-cyan-500/4 blur-3xl" />

        {/* Grid texture - extremely subtle */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Image - right side fading */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/40 z-10" />
          <img
            src="/banner_2.png"
            alt="HippoxOS Interface"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-auto object-cover opacity-30"
            style={{
              maskImage:
                "linear-gradient(to left, black 20%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 20%, transparent 100%)",
            }}
          />
        </div>

        {/* Bottom subtle gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 py-16 lg:py-24 z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Brand & Download */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-foreground/50" />
              <span className="text-xs font-medium text-foreground/50 tracking-wider uppercase">
                {isCn ? "LLM 原生操作系统" : "LLM-Native OS"}
              </span>
            </div>

            {/* Title - Black & White ArtText, left aligned, with flow effect */}
            <div className="w-full">
              <ArtText
                text="HippoxOS"
                fontSize={72}
                fontWeight="300"
                letterSpacing={4}
                textColor={artTextColor}
                lightColor={artLightColor}
                animationDuration={3}
                glowSize={0}
                fontFamily="'Great Vibes', 'Sacramento', 'Dancing Script', 'Brush Script MT', cursive"
                align="left"
              />
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-foreground/70 max-w-lg leading-relaxed">
              {isCn
                ? "通过对话完成视频编辑、3D创作、代码开发与数据分析"
                : "Edit videos, build 3D scenes, code, and analyze data through conversation"}
            </p>

            {/* Download Section */}
            <div className="space-y-4">
              {/* Platform selector - 3 buttons only */}
              <div className="flex flex-wrap items-center gap-2">
                {(
                  Object.keys(platformConfig) as Array<
                    keyof typeof platformConfig
                  >
                ).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActivePlatform(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activePlatform === key
                        ? "bg-foreground/10 text-foreground border border-foreground/20"
                        : "text-foreground/60 hover:text-foreground hover:bg-foreground/5 border border-transparent"
                    }`}
                  >
                    {platformConfig[key].icon}
                    {platformConfig[key].label}
                  </button>
                ))}
              </div>

              {/* Download button with version info */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={getDownloadUrl(activePlatform)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-foreground/80 transition-all duration-200 shadow-lg shadow-foreground/10 hover:shadow-foreground/20"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isCn ? "下载" : "Download"} {currentPlatform.label}
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
                >
                  {isCn ? "查看文档" : "Read Docs"}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Version info only */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-foreground/40 font-mono">
                <span>
                  {isCn ? "版本" : "Version"}: v{version}
                </span>
              </div>

              <p className="text-xs text-foreground/30">
                {isCn
                  ? "支持 Windows · macOS · Linux"
                  : "Available on Windows · macOS · Linux"}
              </p>
            </div>

            {/* GitHub Stats - fetched from API */}
            <div className="flex items-center gap-6 pt-2 border-t border-foreground/10">
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/40 hover:text-foreground/70 transition-colors"
              >
                <GitHubIcon className="w-4 h-4" />
                <span className="text-xs font-medium">GitHub</span>
              </a>
              <div className="flex items-center gap-1.5 text-foreground/40">
                <Star className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">
                  {loading ? "..." : githubStats.stars}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-foreground/40">
                <GitFork className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">
                  {loading ? "..." : githubStats.forks}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - empty */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
