import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { I18nProvider } from "./providers/I18nProvider";
import { LocaleProvider } from "./providers/LocaleProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import "@/app/globals.css";
import { siteConfig } from "./config";
import DynamicHead from "./providers/DynamicHead";
import "@fontsource/great-vibes";
import "@fontsource/dancing-script";
import "@fontsource/pacifico";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const defaultLocale = "en";

const metadataMap = {
  cn: {
    title: "🦛 HippoxOS - LLM 原生操作系统",
    description:
      "AI 原生 · 会话驱动 · 跨领域智能工作台 — 视频编辑、3D创作、代码开发、数据分析，全部通过对话完成",
    openGraph: {
      title: "🦛 HippoxOS - LLM 原生操作系统",
      description:
        "AI 原生 · 会话驱动 · 跨领域智能工作台 — 视频编辑、3D创作、代码开发、数据分析，全部通过对话完成",
    },
  },
  en: {
    title: "🦛 HippoxOS - LLM-Native Operating System",
    description:
      "AI-Native · Conversation-Driven · Cross-Domain Intelligent Workbench — Video editing, 3D creation, coding, data analysis, all through conversation",
    openGraph: {
      title: "🦛 HippoxOS - LLM-Native Operating System",
      description:
        "AI-Native · Conversation-Driven · Cross-Domain Intelligent Workbench — Video editing, 3D creation, coding, data analysis, all through conversation",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("preferredLocale")?.value;
  const locale =
    savedLocale && (savedLocale === "cn" || savedLocale === "en")
      ? (savedLocale as "cn" | "en")
      : defaultLocale;

  const t = metadataMap[locale];

  return {
    title: t.title,
    description: t.description,
    icons: {
      icon: "/logo.jpeg",
      shortcut: "/logo.jpeg",
      apple: "/logo.jpeg",
    },
    openGraph: {
      type: "website",
      locale: locale === "cn" ? "zh_CN" : "en_US",
      siteName: siteConfig.name,
      title: t.openGraph.title,
      description: t.openGraph.description,
      images: [
        {
          url: "/banner_1.png",
          width: 1200,
          height: 630,
          alt: "HippoxOS",
        },
      ],
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans antialiased`}>
        <I18nProvider defaultLocale={defaultLocale}>
          <ThemeProvider>
            <LocaleProvider>
              <DynamicHead />
              {children}
            </LocaleProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
