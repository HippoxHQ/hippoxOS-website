'use client';

import { useI18n } from '../providers/I18nProvider';

export default function Footer() {
  const { locale } = useI18n();
  const isCn = locale === 'cn';

  return (
    <footer className="text-center text-[10px] text-muted-foreground py-4 border-t border-border">
      <div className="space-y-1">
        <p>
          © {new Date().getFullYear()} HippoX ·
          <a
            href="https://github.com/0xhappyboy/hippox/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Apache-2.0 License
          </a>
          · Open Source
        </p>
        <p className="opacity-70">
          {isCn
            ? '一个可靠的 AI 运行时和技能编排引擎，让智能体自主决策、无缝执行。'
            : 'A reliable AI runtime and skills orchestration engine for autonomous agents.'}
        </p>
      </div>
    </footer>
  );
}