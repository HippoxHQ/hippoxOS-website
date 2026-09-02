/* eslint-disable @next/next/no-img-element */
"use client";
import { useI18n } from "../providers/I18nProvider";
import { useTheme } from "../providers/ThemeProvider";
import { useState, useRef, useEffect } from "react";
import { Moon, Sun, Send, Globe, ChevronDown, QrCode } from "lucide-react";
import { DiscordIcon } from "../icons/DiscordIcon";
import { MediumIcon } from "../icons/MediumIcon";
import { BlueskyIcon } from "../icons/BlueskyIcon";
import { WeChatIcon } from "../icons/WeChatIcon";
import { QQIcon } from "../icons/QQIcon";
import { GitHubIcon } from "../icons/GitHubIcon";
import { XIcon } from "../icons/XIcon";
export default function Header() {
  const { locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const isZh = locale === "cn";
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Social popup state
  const [showWechatPopup, setShowWechatPopup] = useState(false);
  const [showQQPopup, setShowQQPopup] = useState(false);
  const wechatTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const qqTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLangMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setShowLangDropdown(true);
  };
  const handleLangMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowLangDropdown(false);
    }, 150);
  };
  // Social link handlers
  const handleGithubClick = () => {
    window.open("https://github.com/HippoxHQ", "_blank");
  };
  const handleXClick = () => {
    window.open("https://x.com/HippoxAI", "_blank");
  };
  const handleBlueskyClick = () => {
    window.open("https://bsky.app/profile/hippoxai.bsky.social", "_blank");
  };
  const handleMediumClick = () => {
    window.open("https://hippox.medium.com/", "_blank");
  };
  const handleDiscordClick = () => {
    window.open("https://discord.gg/hippox", "_blank");
  };
  const handleTelegramClick = () => {
    window.open("https://t.me/hippox", "_blank");
  };
  const handleCargoClick = () => {
    window.open("https://crates.io/crates/hippox", "_blank");
  };
  // WeChat popup handlers
  const handleWechatMouseEnter = () => {
    if (wechatTimeoutRef.current) {
      clearTimeout(wechatTimeoutRef.current);
      wechatTimeoutRef.current = null;
    }
    setShowWechatPopup(true);
  };
  const handleWechatMouseLeave = () => {
    wechatTimeoutRef.current = setTimeout(() => {
      setShowWechatPopup(false);
    }, 200);
  };
  // QQ popup handlers
  const handleQQMouseEnter = () => {
    if (qqTimeoutRef.current) {
      clearTimeout(qqTimeoutRef.current);
      qqTimeoutRef.current = null;
    }
    setShowQQPopup(true);
  };
  const handleQQMouseLeave = () => {
    qqTimeoutRef.current = setTimeout(() => {
      setShowQQPopup(false);
    }, 200);
  };
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <img
              src="/logo.jpeg"
              alt="HippoxOS Logo"
              className="w-7 h-7 rounded object-cover"
            />
            <span className="font-bold text-foreground text-base">
              HippoxOS
            </span>
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2.5">
          {windowWidth >= 900 && (
            <button
              type="button"
              onClick={handleXClick}
              className="p-1.5 rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
              aria-label="X (Twitter)"
              title={isZh ? "访问 X 账号" : "Visit X account"}
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
          {windowWidth >= 700 && (
            <div
              className="relative"
              onMouseEnter={handleWechatMouseEnter}
              onMouseLeave={handleWechatMouseLeave}
            >
              <button
                type="button"
                className="p-1.5 rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
                aria-label="WeChat"
                title={isZh ? "微信" : "WeChat"}
              >
                <WeChatIcon className="w-4 h-4" />
              </button>
              {showWechatPopup && (
                <div
                  className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-50 p-4 text-center"
                  onMouseEnter={handleWechatMouseEnter}
                  onMouseLeave={handleWechatMouseLeave}
                >
                  <div className="aspect-square w-full max-w-[160px] mx-auto bg-muted rounded flex items-center justify-center">
                    <div className="text-xs text-muted-foreground flex flex-col items-center gap-1">
                      <QrCode className="w-12 h-12 opacity-50" />
                      <span>{isZh ? "微信二维码" : "WeChat QR Code"}</span>
                      <span className="text-[10px] opacity-60">
                        {isZh ? "（预留）" : "(Placeholder)"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {isZh ? "扫码关注公众号" : "Scan to follow"}
                  </div>
                </div>
              )}
            </div>
          )}
          {windowWidth >= 700 && (
            <div
              className="relative"
              onMouseEnter={handleQQMouseEnter}
              onMouseLeave={handleQQMouseLeave}
            >
              <button
                type="button"
                className="p-1.5 rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
                aria-label="QQ"
                title={isZh ? "QQ" : "QQ"}
              >
                <QQIcon className="w-4 h-4" />
              </button>
              {showQQPopup && (
                <div
                  className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-50 p-4 text-center"
                  onMouseEnter={handleQQMouseEnter}
                  onMouseLeave={handleQQMouseLeave}
                >
                  <div className="aspect-square w-full max-w-[160px] mx-auto bg-muted rounded flex items-center justify-center">
                    <div className="text-xs text-muted-foreground flex flex-col items-center gap-1">
                      <QrCode className="w-12 h-12 opacity-50" />
                      <span>{isZh ? "QQ 二维码" : "QQ QR Code"}</span>
                      <span className="text-[10px] opacity-60">
                        {isZh ? "（预留）" : "(Placeholder)"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {isZh ? "扫码加群" : "Scan to join group"}
                  </div>
                </div>
              )}
            </div>
          )}
          {windowWidth >= 550 && (
            <button
              type="button"
              onClick={handleGithubClick}
              className="p-1.5 rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
              aria-label="GitHub"
              title={isZh ? "访问 GitHub 组织" : "Visit GitHub organization"}
            >
              <GitHubIcon className="w-4 h-4" />
            </button>
          )}
          {windowWidth >= 900 && (
            <button
              type="button"
              onClick={handleBlueskyClick}
              className="p-1.5 rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
              aria-label="Bluesky"
              title={isZh ? "访问 Bluesky 账号" : "Visit Bluesky account"}
            >
              <BlueskyIcon className="w-4 h-4" />
            </button>
          )}
          {windowWidth >= 900 && (
            <button
              type="button"
              onClick={handleMediumClick}
              className="p-1.5 rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
              aria-label="Medium"
              title={isZh ? "访问 Medium 博客" : "Visit Medium blog"}
            >
              <MediumIcon size={16} />
            </button>
          )}
          {windowWidth >= 1000 && (
            <button
              type="button"
              onClick={handleDiscordClick}
              className="p-1.5 rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
              aria-label="Discord"
              title={isZh ? "加入 Discord 社区" : "Join Discord community"}
            >
              <DiscordIcon size={16} />
            </button>
          )}
          {windowWidth >= 1000 && (
            <button
              type="button"
              onClick={handleTelegramClick}
              className="p-1.5 rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
              aria-label="Telegram"
              title={isZh ? "加入 Telegram 群组" : "Join Telegram group"}
            >
              <Send className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <div
            className="relative"
            onMouseEnter={handleLangMouseEnter}
            onMouseLeave={handleLangMouseLeave}
          >
            <button
              type="button"
              className="px-3 py-1 rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer text-sm font-medium text-muted-foreground flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              {isZh ? "CN" : "EN"}
              <ChevronDown className="w-3 h-3" />
            </button>
            {showLangDropdown && (
              <div
                className="absolute right-0 mt-1 w-24 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden"
                onMouseEnter={handleLangMouseEnter}
                onMouseLeave={handleLangMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    setLocale("cn");
                    setShowLangDropdown(false);
                  }}
                  className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  中文
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocale("en");
                    setShowLangDropdown(false);
                  }}
                  className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  English
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
