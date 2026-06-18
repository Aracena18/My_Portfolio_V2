"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  Clock3,
  ExternalLink,
  FileText,
  FolderKanban,
  Mail,
  Menu,
  PanelRightClose,
  PanelRightOpen,
  Send,
  Sparkles,
  UserRound,
  X,
  Plus,
  ChevronDown,
  Moon,
  Sun,
  LayoutGrid
} from "lucide-react";
import { FormEvent, useMemo, useState, useRef, useEffect } from "react";
import { PortfolioCanvas } from "@/components/ask-robert/PortfolioPanels";
import {
  AssistantPortfolioResponse,
  PortfolioSection,
  getAssistantResponse,
  projects,
  suggestedPrompts,
} from "@/content/askRobert";
import type { AssistantMode } from "@/lib/askRobertEngine";
import BrandLogo from "@/components/BrandLogo";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  sources?: string[];
  targetSection?: PortfolioSection;
  targetProjectId?: string;
};

type SidebarItem = {
  id: PortfolioSection;
  label: string;
  prompt: string;
  href: string;
  icon: typeof UserRound;
  mode?: AssistantMode;
};

const sidebarItems: SidebarItem[] = [
  { id: "about", label: "About Robert", prompt: "Who is Robert Jhon Aracena?", href: "/about", icon: UserRound },
  { id: "projects", label: "Projects", prompt: "What projects has Robert built?", href: "/projects", icon: FolderKanban },
  { id: "skills", label: "Skills", prompt: "What are Robert's strongest technical and design skills?", href: "/skills", icon: Sparkles },
  { id: "resume", label: "Resume", prompt: "Summarize Robert's resume.", href: "/resume", icon: FileText },
  { id: "recruiter", label: "Recruiter Mode", prompt: "Why should we hire Robert?", href: "/recruiter", icon: BriefcaseBusiness, mode: "recruiter" },
  { id: "timeline", label: "Timeline", prompt: "Show Robert's timeline.", href: "/timeline", icon: Clock3 },
  { id: "contact", label: "Contact", prompt: "How can I contact Robert?", href: "/contact", icon: Mail, mode: "contact" },
];

const assistantModes: { id: AssistantMode; label: string }[] = [
  { id: "guide", label: "Guide" },
  { id: "recruiter", label: "Recruiter" },
  { id: "project-explainer", label: "Project" },
  { id: "ux-critic", label: "UX" },
  { id: "opportunity-fit", label: "JD Fit" },
  { id: "contact", label: "Contact" },
];

const highValuePrompts = suggestedPrompts.slice(0, 4);

type Theme = "light" | "dark";

export default function AskRobertPortfolio() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeSection, setActiveSection] = useState<PortfolioSection>("about");
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>();
  const [mode, setMode] = useState<AssistantMode>("guide");
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [followUps, setFollowUps] = useState<string[]>([
    "Who is Robert?",
    "Show his projects",
    "Why should we hire Robert?",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId),
    [activeProjectId],
  );
  const activePageHref = getSectionHref(activeSection, activeProjectId);
  const previewAvailable = Boolean(activeSection) && isPreviewable({ targetSection: activeSection, targetProjectId: activeProjectId });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  function applyResponse(
    question: string,
    response: AssistantPortfolioResponse,
    options?: { forcePreview?: boolean },
  ) {
    const shouldPreview = options?.forcePreview ?? shouldOpenPreview(response);

    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: question,
      },
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.answer,
        sources: response.sources,
        targetSection: response.targetSection,
        targetProjectId: response.targetProjectId,
      },
    ]);
    setActiveSection(response.targetSection);
    setActiveProjectId(response.targetProjectId);
    setFollowUps(response.suggestedFollowUps);
    if (shouldPreview) setIsPreviewOpen(true);
  }

  async function ask(
    question: string,
    options?: { forcePreview?: boolean; modeOverride?: AssistantMode },
  ) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    setIsThinking(true);
    setInput("");

    try {
      const result = await fetch("/api/ask-robert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion, mode: options?.modeOverride ?? mode }),
      });

      if (!result.ok) throw new Error("Assistant API failed");

      const response = (await result.json()) as AssistantPortfolioResponse;
      applyResponse(cleanQuestion, response, options);
    } catch {
      applyResponse(
        cleanQuestion,
        { ...getAssistantResponse(cleanQuestion), sources: ["Local deterministic fallback"] },
        options,
      );
    } finally {
      setIsThinking(false);
    }
  }

  function openSection(item: SidebarItem) {
    // Clear existing chat — each sidebar click starts a fresh conversation
    setMessages([]);
    setActiveSection(item.id);
    setActiveProjectId(undefined);
    setIsPreviewOpen(false);
    setIsSidebarOpen(false);
    if (item.mode) setMode(item.mode);
    ask(item.prompt, { forcePreview: true, modeOverride: item.mode });
  }

  function handleNewChat() {
    setMessages([]);
    setActiveSection("about");
    setActiveProjectId(undefined);
    setIsPreviewOpen(false);
    setIsSidebarOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  // Elegant Slate Palette
  const isDark = theme === "dark";
  const bgMain = isDark ? "bg-[#020617]" : "bg-white"; // slate-950 / white
  const textPrimary = isDark ? "text-[#f8fafc]" : "text-[#0f172a]"; // slate-50 / slate-900
  const textMuted = isDark ? "text-[#94a3b8]" : "text-[#64748b]"; // slate-400 / slate-500
  const borderCol = isDark ? "border-[#1e293b]" : "border-[#e2e8f0]"; // slate-800 / slate-200
  const bgInput = isDark ? "bg-[#0f172a]" : "bg-[#f8fafc]"; // slate-900 / slate-50
  
  return (
    <main className={`flex h-screen w-full ${bgMain} ${textPrimary} font-sans overflow-hidden transition-colors duration-300`}>
      <SidebarNav
        theme={theme}
        activeSection={activeSection}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelect={openSection}
        onNewChat={handleNewChat}
      />

      <section className={`flex flex-1 flex-col h-full min-w-0 relative transition-all duration-300 ${isPreviewOpen ? "md:mr-[480px]" : ""}`}>
        <ChatHeader
          theme={theme}
          onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
          mode={mode}
          previewAvailable={previewAvailable}
          isPreviewOpen={isPreviewOpen}
          onModeChange={setMode}
          onMenuClick={() => setIsSidebarOpen(true)}
          onPreviewClick={() => setIsPreviewOpen((current) => !current)}
        />

        <div className="flex-1 overflow-y-auto w-full flex flex-col px-4 sm:px-6">
          <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
             {(messages.length > 0 || isThinking) && (
               <div className="pt-8 pb-40">
                 <MessageList
                   theme={theme}
                   messages={messages}
                   isThinking={isThinking}
                   onPreview={(message) => {
                     if (message.targetSection) setActiveSection(message.targetSection);
                     setActiveProjectId(message.targetProjectId);
                     setIsPreviewOpen(true);
                   }}
                 />
                 <div ref={messagesEndRef} />
               </div>
             )}
          </div>
        </div>

        {/* Input Area Overlay */}
        <div className={`absolute left-0 right-0 px-4 transition-all duration-500 ease-in-out z-10 ${
          messages.length === 0 && !isThinking
            ? 'top-1/2 -translate-y-1/2'
            : `bottom-0 bg-gradient-to-t ${isDark ? 'from-[#020617] via-[#020617]' : 'from-white via-white'} to-transparent pt-6 pb-6`
        }`}>
          <div className="max-w-3xl mx-auto w-full">
            {messages.length === 0 && !isThinking && (
              <div className="mb-8 animate-fade-in-up">
                <EmptyState theme={theme} />
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className={`relative flex items-end ${bgInput} rounded-[24px] py-1.5 px-3 border ${borderCol} focus-within:border-[#6366f1]/50 shadow-sm transition-all min-h-[52px]`}
            >
              <button
                type="button"
                className={`p-2 mb-0.5 ${textMuted} hover:opacity-70 rounded-full transition`}
                title="Attach (disabled)"
              >
                <Plus size={20} strokeWidth={2.5} />
              </button>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    ask(input);
                  }
                }}
                rows={1}
                placeholder="Message Ask Robert..."
                className={`flex-1 max-h-48 min-h-[24px] bg-transparent resize-none border-none focus:ring-0 px-2 py-[10px] text-[15px] leading-6 placeholder:opacity-50 outline-none overflow-y-auto ${textPrimary}`}
              />
              <button
                type="submit"
                disabled={isThinking || !input.trim()}
                aria-label="Send question"
                className={`mb-1 p-2 shrink-0 rounded-full bg-[#6366f1] text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:${isDark ? 'bg-[#1e293b] text-[#64748b]' : 'bg-[#e2e8f0] text-[#94a3b8]'} ml-1`}
              >
                <Send size={18} className="translate-x-[1px] translate-y-[1px]" />
              </button>
            </form>

            {messages.length === 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2 px-2 max-w-2xl mx-auto">
                {highValuePrompts.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => ask(item.prompt)}
                    className={`text-sm ${textMuted} hover:${textPrimary} px-4 py-2 rounded-full border ${borderCol} ${isDark ? 'bg-transparent hover:bg-[#1e293b]' : 'bg-transparent hover:bg-[#f1f5f9]'} transition-colors`}
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
            <div className={`text-center mt-3 text-xs ${textMuted}`}>
              Ask Robert is an AI interface for Robert Jhon Aracena&apos;s portfolio.
            </div>
          </div>
        </div>
      </section>

      <PreviewDrawer
        theme={theme}
        isOpen={isPreviewOpen}
        activeSection={activeSection}
        activeProjectId={activeProjectId}
        activePageHref={activePageHref}
        selectedProjectTitle={selectedProject?.title}
        followUps={followUps}
        onAsk={ask}
        onClose={() => setIsPreviewOpen(false)}
        onProjectSelect={(projectId) => {
          setActiveSection("projects");
          setActiveProjectId(projectId);
          setIsPreviewOpen(true);
        }}
      />
    </main>
  );
}

function SidebarNav({
  theme,
  activeSection,
  isOpen,
  onClose,
  onSelect,
  onNewChat,
}: {
  theme: Theme;
  activeSection: PortfolioSection;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: SidebarItem) => void;
  onNewChat: () => void;
}) {
  const isDark = theme === "dark";
  const bgSidebar = isDark ? "bg-[#0f172a]" : "bg-[#f8fafc]"; // slate-900 / slate-50
  const borderCol = isDark ? "border-[#1e293b]" : "border-[#e2e8f0]"; // slate-800 / slate-200
  const textPrimary = isDark ? "text-[#f8fafc]" : "text-[#0f172a]";
  const textMuted = isDark ? "text-[#94a3b8]" : "text-[#64748b]";
  const bgHover = isDark ? "hover:bg-[#1e293b]" : "hover:bg-[#e2e8f0]";
  const bgActive = isDark ? "bg-[#1e293b] text-white" : "bg-white shadow-sm border border-[#e2e8f0] text-[#0f172a]";

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col ${bgSidebar} border-r ${borderCol} md:static md:translate-x-0 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-3 flex items-center justify-between">
          <button
            onClick={onNewChat}
            className={`flex flex-1 items-center gap-2 ${bgHover} transition-colors rounded-lg px-3 py-2 text-sm font-medium`}
          >
            <BrandLogo className={`size-6 ${isDark ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`} />
            <span className={textPrimary}>New session</span>
          </button>
          <button onClick={onClose} className={`md:hidden p-2 ${textMuted} hover:opacity-70`}>
             <X size={20} />
          </button>
        </div>

        <div className={`px-4 pt-5 pb-2 text-xs font-semibold ${textMuted} tracking-wide`}>
          Portfolio Context
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {sidebarItems.map((item) => {
            const isActive = item.id === activeSection;
            const Icon = item.icon;
            return (
              <div key={item.id} className="group flex items-center relative">
                <button
                  onClick={() => onSelect(item)}
                  className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isActive ? bgActive : `${textMuted} ${bgHover}`
                  }`}
                >
                  <Icon size={16} className={isActive ? (isDark ? "text-[#f8fafc]" : "text-[#0f172a]") : ""} />
                  <span className="truncate">{item.label}</span>
                </button>
                <Link
                  href={item.href}
                  className={`absolute right-2 opacity-0 group-hover:opacity-100 ${textMuted} hover:opacity-100 transition-opacity p-1`}
                  aria-label={`Go to ${item.label}`}
                >
                  <ExternalLink size={14} />
                </Link>
              </div>
            );
          })}
        </nav>
        
        <div className={`p-4 border-t ${borderCol} text-xs ${textMuted}`}>
          Robert Jhon Aracena<br />Portfolio v2.0
        </div>
      </aside>
    </>
  );
}

function ChatHeader({
  theme,
  onThemeToggle,
  mode,
  previewAvailable,
  isPreviewOpen,
  onModeChange,
  onMenuClick,
  onPreviewClick,
}: {
  theme: Theme;
  onThemeToggle: () => void;
  mode: AssistantMode;
  previewAvailable: boolean;
  isPreviewOpen: boolean;
  onModeChange: (mode: AssistantMode) => void;
  onMenuClick: () => void;
  onPreviewClick: () => void;
}) {
  const isDark = theme === "dark";
  const bgHover = isDark ? "hover:bg-[#0f172a]" : "hover:bg-[#f1f5f9]";
  const textPrimary = isDark ? "text-[#f8fafc]" : "text-[#0f172a]";
  const textMuted = isDark ? "text-[#94a3b8]" : "text-[#64748b]";
  const dropdownBg = isDark ? "bg-[#0f172a]" : "bg-white";
  const borderCol = isDark ? "border-[#1e293b]" : "border-[#e2e8f0]";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between px-4 sm:px-6 w-full">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className={`md:hidden p-2 -ml-2 ${textPrimary} ${bgHover} rounded-lg`}
        >
          <Menu size={20} />
        </button>
        
        <div className={`relative group cursor-pointer flex items-center gap-2 ${bgHover} px-3 py-1.5 rounded-xl transition`}>
          <span className={`text-lg font-semibold ${textPrimary} tracking-tight`}>Ask Robert</span>
          <span className={`${textMuted} text-xs font-semibold uppercase tracking-wider`}>{mode}</span>
          <ChevronDown size={16} className={textMuted} />
          
          <div className={`absolute top-full left-0 mt-1 w-56 ${dropdownBg} border ${borderCol} rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden`}>
             <div className={`px-4 pt-3 pb-2 text-xs font-semibold ${textMuted} uppercase tracking-wider`}>Assistant Mode</div>
             {assistantModes.map(m => (
               <div 
                 key={m.id} 
                 onClick={() => onModeChange(m.id)}
                 className={`px-4 py-2.5 text-sm cursor-pointer ${bgHover} ${mode === m.id ? (isDark ? 'bg-[#1e293b] text-white font-medium' : 'bg-[#f1f5f9] text-[#0f172a] font-medium') : textPrimary}`}
               >
                 {m.label} Mode
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={onThemeToggle}
          className={`p-2 rounded-lg transition ${textMuted} ${bgHover}`}
          title="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={onPreviewClick}
          disabled={!previewAvailable}
          className={`flex items-center gap-2 p-2 rounded-lg transition ${
            isPreviewOpen ? (isDark ? "bg-[#1e293b] text-white" : "bg-[#e2e8f0] text-[#0f172a]") : `${textMuted} hover:opacity-100 ${bgHover}`
          } disabled:opacity-30 disabled:cursor-not-allowed`}
          title="Toggle Artifacts"
        >
          {isPreviewOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
        </button>
      </div>
    </header>
  );
}

function EmptyState({ theme }: { theme: Theme }) {
  const isDark = theme === "dark";
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`mb-6 rounded-full ${isDark ? 'bg-white' : 'bg-[#0f172a]'} p-4 shadow-xl`}>
        <BrandLogo className={`size-10 ${isDark ? 'text-[#020617]' : 'text-white'}`} />
      </div>
      <h1 className={`text-3xl font-semibold ${isDark ? 'text-[#f8fafc]' : 'text-[#0f172a]'} mb-2 tracking-tight`}>How can I help you today?</h1>
      <p className={`text-sm ${isDark ? 'text-[#94a3b8]' : 'text-[#64748b]'} max-w-md text-center mt-1 leading-relaxed`}>
        Ask me about Robert&apos;s projects, skills, resume, or use the sidebar to explore each section directly.
      </p>
    </div>
  );
}

function MessageList({
  theme,
  messages,
  isThinking,
  onPreview,
}: {
  theme: Theme;
  messages: ChatMessage[];
  isThinking: boolean;
  onPreview: (message: ChatMessage) => void;
}) {
  const isDark = theme === "dark";
  const textPrimary = isDark ? "text-[#f8fafc]" : "text-[#0f172a]";
  const textBody = isDark ? "text-[#cbd5e1]" : "text-[#334155]"; // slate-300 / slate-700
  const textMuted = isDark ? "text-[#94a3b8]" : "text-[#64748b]";
  const btnBg = isDark ? "bg-[#0f172a]" : "bg-white"; // slate-900
  const btnBorder = isDark ? "border-[#1e293b]" : "border-[#e2e8f0]";
  
  // ChatGPT User Message bubble style
  const userBubbleBg = isDark ? "bg-[#27272a]" : "bg-[#f4f4f5]"; // zinc-800 / zinc-100
  const userBubbleText = isDark ? "text-[#ececec]" : "text-[#09090b]";

  return (
    <div className="space-y-8 max-w-3xl mx-auto w-full">
      {messages.map((message) => {
        const isUser = message.role === "user";
        const canPreview = message.role === "assistant" && isPreviewableMessage(message);

        if (isUser) {
          // ChatGPT true layout: User message is right-aligned in a soft bubble
          return (
             <article key={message.id} className="flex justify-end w-full">
               <div className={`max-w-[75%] px-5 py-3 rounded-3xl ${userBubbleBg} ${userBubbleText} text-[15px] leading-relaxed whitespace-pre-line shadow-sm`}>
                 {message.content}
               </div>
             </article>
          );
        }

        // Assistant message: Left aligned, clear text (no bubble), avatar
        return (
          <article key={message.id} className="flex gap-4 w-full">
            <div className="shrink-0 mt-1">
               <div className={`size-8 rounded-full ${isDark ? 'bg-white' : 'bg-[#0f172a]'} grid place-items-center shadow-md`}>
                  <BrandLogo className={`size-5 ${isDark ? 'text-[#020617]' : 'text-white'}`} />
               </div>
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className={`font-semibold ${textPrimary} mb-1.5`}>Ask Robert</div>
              <div className={`text-[15px] leading-loose ${textBody} whitespace-pre-line prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                {message.content}
              </div>
              
              {message.sources?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {message.sources.slice(0, 3).map((source) => (
                    <span key={source} className={`text-[11px] font-mono ${textMuted} ${btnBg} px-2.5 py-1 rounded-md border ${btnBorder}`}>
                      {source}
                    </span>
                  ))}
                </div>
              ) : null}

              {canPreview && (
                <button
                  onClick={() => onPreview(message)}
                  className={`mt-4 inline-flex items-center gap-2 ${btnBg} hover:opacity-80 border ${btnBorder} px-3 py-2 rounded-xl text-sm font-medium ${textPrimary} shadow-sm transition`}
                >
                  <LayoutGrid size={16} className={textMuted} />
                  View Related Content
                </button>
              )}
            </div>
          </article>
        );
      })}
      
      {isThinking && (
        <article className="flex gap-4 w-full">
          <div className="shrink-0 mt-1">
            <div className={`size-8 rounded-full ${isDark ? 'bg-white' : 'bg-[#0f172a]'} grid place-items-center shadow-md animate-pulse`}>
               <BrandLogo className={`size-5 ${isDark ? 'text-[#020617]' : 'text-white'}`} />
            </div>
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <div className={`font-semibold ${textPrimary} mb-1.5`}>Ask Robert</div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className={`size-2.5 rounded-full ${isDark ? 'bg-white' : 'bg-[#0f172a]'} animate-bounce`} style={{ animationDelay: '0ms' }} />
              <span className={`size-2.5 rounded-full ${isDark ? 'bg-white' : 'bg-[#0f172a]'} animate-bounce`} style={{ animationDelay: '150ms' }} />
              <span className={`size-2.5 rounded-full ${isDark ? 'bg-white' : 'bg-[#0f172a]'} animate-bounce`} style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

function PreviewDrawer({
  theme,
  isOpen,
  activeSection,
  activeProjectId,
  activePageHref,
  selectedProjectTitle,
  followUps,
  onAsk,
  onClose,
  onProjectSelect,
}: {
  theme: Theme;
  isOpen: boolean;
  activeSection: PortfolioSection;
  activeProjectId?: string;
  activePageHref: string;
  selectedProjectTitle?: string;
  followUps: string[];
  onAsk: (question: string) => void;
  onClose: () => void;
  onProjectSelect: (projectId: string) => void;
}) {
  const isDark = theme === "dark";
  const bgMain = isDark ? "bg-[#0f172a]" : "bg-white"; // slate-900 / white
  const borderCol = isDark ? "border-[#1e293b]" : "border-[#e2e8f0]";
  const textPrimary = isDark ? "text-[#f8fafc]" : "text-[#0f172a]";
  const textMuted = isDark ? "text-[#94a3b8]" : "text-[#64748b]";
  const bgHover = isDark ? "hover:bg-[#1e293b]" : "hover:bg-[#f1f5f9]";
  const shadow = isDark ? "shadow-[-24px_0_48px_rgba(2,6,23,0.8)]" : "shadow-[-24px_0_48px_rgba(0,0,0,0.1)]";

  // Dynamic injection of CSS variables so internal PortfolioCanvas components render natively in dark/light mode
  const cssVars = isDark ? {
    "--surface": "#1e293b", // slate-800 for cards
    "--surface-muted": "#0f172a", // slate-900 for inner background
    "--border": "#334155", // slate-700
    "--text": "#f8fafc",
    "--text-secondary": "#cbd5e1", // slate-300
    "--text-muted": "#94a3b8", // slate-400
    "--accent": "#6366f1", // indigo-500
    "--accent-soft": "rgba(99, 102, 241, 0.1)",
  } : {
    "--surface": "#ffffff",
    "--surface-muted": "#f8fafc",
    "--border": "#e2e8f0",
    "--text": "#0f172a",
    "--text-secondary": "#475569",
    "--text-muted": "#64748b",
    "--accent": "#4f46e5",
    "--accent-soft": "rgba(79, 70, 229, 0.08)",
  };

  return (
    <aside
      className={`absolute inset-y-0 right-0 z-30 flex flex-col ${bgMain} border-l ${borderCol} w-full md:w-[480px] ${shadow} transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={cssVars as React.CSSProperties}
    >
      <div className={`flex h-14 items-center justify-between border-b ${borderCol} px-4`}>
        <div className="flex items-center gap-3">
           <PanelRightOpen size={18} className={textMuted} />
           <span className={`text-sm font-semibold ${textPrimary}`}>Source Context</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={activePageHref}
            className={`p-2 ${textMuted} hover:opacity-100 ${bgHover} rounded-lg transition`}
            title="Open Full Page"
          >
            <ExternalLink size={16} />
          </Link>
          <button
            onClick={onClose}
            className={`p-2 ${textMuted} hover:opacity-100 ${bgHover} rounded-lg transition`}
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Scrollable Canvas container perfectly mimicking Claude Artifacts */}
      <div className={`flex-1 overflow-y-auto px-5 py-6 bg-[var(--surface-muted)]`}>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 min-h-full shadow-sm relative overflow-hidden transition-colors">
          <div className="relative z-10">
            <PortfolioCanvas
              activeSection={activeSection}
              selectedProjectId={activeProjectId}
              selectedProjectTitle={selectedProjectTitle}
              followUps={followUps}
              onAsk={onAsk}
              onProjectSelect={onProjectSelect}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

function shouldOpenPreview(response: AssistantPortfolioResponse) {
  if (response.targetProjectId) return true;
  if (response.targetSection === "about") return false;
  return ["projects", "skills", "resume", "timeline", "contact", "recruiter"].includes(
    response.targetSection,
  );
}

function isPreviewable(params: { targetSection?: PortfolioSection; targetProjectId?: string }) {
  if (params.targetProjectId) return true;
  if (!params.targetSection || params.targetSection === "about") return false;
  return true;
}

function isPreviewableMessage(message: ChatMessage) {
  return isPreviewable({ targetSection: message.targetSection, targetProjectId: message.targetProjectId });
}

function getSectionHref(section: PortfolioSection, projectId?: string) {
  if (projectId) {
    return projects.find((project) => project.id === projectId)?.route ?? "/projects";
  }
  return sidebarItems.find((item) => item.id === section)?.href ?? "/";
}
