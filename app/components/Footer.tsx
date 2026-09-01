"use client";
import { useI18n } from "../providers/I18nProvider";
import { Send } from "lucide-react";
import { DiscordIcon } from "../icons/DiscordIcon";
import { MediumIcon } from "../icons/MediumIcon";
import { BlueskyIcon } from "../icons/BlueskyIcon";
import { GitHubIcon } from "../icons/GitHubIcon";
import { XIcon } from "../icons/XIcon";
export default function Footer() {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  const menuSections = [
    {
      title: isCn ? "产品" : "Product",
      links: [
        { label: isCn ? "视频编辑" : "Video Editor", href: "#" },
        { label: isCn ? "3D 沙盒" : "3D Sandbox", href: "#" },
        { label: isCn ? "代码编辑" : "Code Editor", href: "#" },
        { label: isCn ? "金融分析" : "Finance", href: "#" },
      ],
    },
    {
      title: isCn ? "资源" : "Resources",
      links: [
        {
          label: isCn ? "文档" : "Documentation",
          href: "https://hippox-docs-en.vercel.app/",
        },
        { label: "GitHub", href: "https://github.com/HippoxHQ/hippoxOS" },
        { label: isCn ? "博客" : "Blog", href: "https://hippox.medium.com/" },
        { label: isCn ? "API 参考" : "API Reference", href: "#" },
      ],
    },
    {
      title: isCn ? "社区" : "Community",
      links: [
        { label: "Discord", href: "https://discord.gg/hippox" },
        { label: "X", href: "https://x.com/HippoxAI" },
        {
          label: "Bluesky",
          href: "https://bsky.app/profile/hippoxai.bsky.social",
        },
        { label: "Telegram", href: "https://t.me/hippox" },
      ],
    },
    {
      title: isCn ? "关于" : "About",
      links: [
        { label: isCn ? "关于我们" : "About Us", href: "#" },
        {
          label: isCn ? "开源协议" : "License",
          href: "https://github.com/HippoxHQ/hippoxOS/blob/main/LICENSE",
        },
        { label: isCn ? "隐私政策" : "Privacy", href: "#" },
        { label: isCn ? "联系方式" : "Contact", href: "#" },
      ],
    },
  ];
  const socialLinks = [
    { icon: GitHubIcon, href: "https://github.com/HippoxHQ", label: "GitHub" },
    { icon: XIcon, href: "https://x.com/HippoxAI", label: "X" },
    {
      icon: BlueskyIcon,
      href: "https://bsky.app/profile/hippoxai.bsky.social",
      label: "Bluesky",
    },
    {
      icon: MediumIcon,
      href: "https://hippox.medium.com/",
      label: "Medium",
      size: 16,
    },
    {
      icon: DiscordIcon,
      href: "https://discord.gg/hippox",
      label: "Discord",
      size: 16,
    },
    { icon: Send, href: "https://t.me/hippox", label: "Telegram" },
  ];
  return (
    <footer className="w-full border-t border-border/40 bg-background/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main menu grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
          {menuSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-foreground/50 hover:text-foreground/80 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom bar: social + brand + copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border/20">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/40 hover:text-foreground/70 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.size ? (
                    <Icon size={social.size} />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </a>
              );
            })}
          </div>
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center sm:items-end gap-1 text-[10px] text-foreground/35">
            <div className="flex items-center gap-2">
              <span className="font-medium tracking-wide">HippoxOS</span>
              <span className="text-foreground/15">·</span>
              <span>{isCn ? "LLM 原生操作系统" : "LLM-Native OS"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>© {new Date().getFullYear()}</span>
              <span>·</span>
              <a
                href="https://github.com/HippoxHQ/hippoxOS/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground/60 transition-colors"
              >
                AGPL-3.0
              </a>
              <span>·</span>
              <span>{isCn ? "开源" : "Open Source"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
