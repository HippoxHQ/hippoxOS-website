"use client";
import { useI18n } from "../providers/I18nProvider";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
interface FAQItem {
  id: string;
  question: string;
  questionZh: string;
  answer: string;
  answerZh: string;
}
const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is HippoxOS?",
    questionZh: "HippoxOS 是什么？",
    answer:
      "HippoxOS is an LLM-native operating system that allows you to control your computer through natural language conversation — editing videos, building 3D scenes, writing code, and analyzing data, all by simply talking to the system.",
    answerZh:
      "HippoxOS 是一个 LLM 原生的操作系统，让你通过自然语言对话控制计算机 —— 视频编辑、3D 场景构建、代码编写和数据分析，只需与系统对话即可完成。",
  },
  {
    id: "2",
    question: "Is HippoxOS free and open source?",
    questionZh: "HippoxOS 是免费开源的吗？",
    answer:
      "Yes, HippoxOS is completely open source under the AGPL-3.0 license. You can freely use, modify, and distribute it. The source code is available on GitHub.",
    answerZh:
      "是的，HippoxOS 在 AGPL-3.0 许可证下完全开源。你可以自由使用、修改和分发。源代码在 GitHub 上公开。",
  },
  {
    id: "3",
    question: "What LLM providers does HippoxOS support?",
    questionZh: "HippoxOS 支持哪些 LLM 提供商？",
    answer:
      "HippoxOS supports 20+ LLM providers including OpenAI, Anthropic, Google Gemini, DeepSeek, Mistral, Groq, Together AI, and all major Chinese providers like Baidu ERNIE, Alibaba Qwen, Tencent Hunyuan, Zhipu GLM, and Moonshot Kimi.",
    answerZh:
      "HippoxOS 支持 20+ 个 LLM 提供商，包括 OpenAI、Anthropic、Google Gemini、DeepSeek、Mistral、Groq、Together AI，以及所有主流国内提供商如百度 ERNIE、阿里 Qwen、腾讯混元、智谱 GLM 和月之暗面 Kimi。",
  },
  {
    id: "4",
    question: "What operating systems are supported?",
    questionZh: "支持哪些操作系统？",
    answer:
      "HippoxOS runs on Windows 10+, macOS 12+, and major Linux distributions (Ubuntu 20.04+, Fedora 38+, Arch Linux).",
    answerZh:
      "HippoxOS 支持 Windows 10+、macOS 12+ 和主流 Linux 发行版（Ubuntu 20.04+、Fedora 38+、Arch Linux）。",
  },
  {
    id: "5",
    question: "How do I install HippoxOS?",
    questionZh: "如何安装 HippoxOS？",
    answer:
      "Download the installer for your platform from the Downloads section above, run it, and follow the installation wizard. For Linux users, you can also install via package managers.",
    answerZh:
      "从上方下载区域下载对应平台的安装包，运行并按照安装向导操作即可。Linux 用户也可以通过包管理器安装。",
  },
  {
    id: "6",
    question: "Can I use my own custom LLM model?",
    questionZh: "我可以使用自己的自定义 LLM 模型吗？",
    answer:
      "Yes, HippoxOS supports custom LLM integration. You can configure any OpenAI-compatible API endpoint, allowing you to use self-hosted models or any other compatible providers.",
    answerZh:
      "是的，HippoxOS 支持自定义 LLM 集成。你可以配置任何兼容 OpenAI API 的端点，从而使用自托管模型或任何其他兼容的提供商。",
  },
];
export default function FAQ() {
  const { locale } = useI18n();
  const isCn = locale === "cn";
  const [openId, setOpenId] = useState<string | null>("1");
  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <section className="w-full py-5">
      <div className="mx-auto">
        {/* Header - 与 VideoShowcase 一致 */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {isCn ? "常见问题" : "FAQ"}
            </h2>
            <p className="text-xs text-foreground/40 mt-0.5">
              {isCn
                ? "关于 HippoxOS 的常见问题解答"
                : "Frequently asked questions about HippoxOS"}
            </p>
          </div>
          {/* <div className="text-[10px] text-foreground/20 font-mono">
            {faqData.length} {isCn ? "个问题" : "questions"}
          </div> */}
        </div>
        {/* FAQ List */}
        <div className="border border-border/10 rounded-lg overflow-hidden divide-y divide-border/10">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-background/30 transition-colors duration-200 group"
                >
                  <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground/90 transition-colors">
                    {isCn ? item.questionZh : item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-foreground/20 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <div className="px-4 pb-3 text-[11px] text-foreground/50 leading-relaxed">
                    {isCn ? item.answerZh : item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
