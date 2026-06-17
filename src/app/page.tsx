'use client';

import { useState, type ReactNode } from 'react';

type Language = 'en' | 'zh';
type IconName = 'about' | 'projects' | 'gallery' | 'tools' | 'github' | 'twitter' | 'xiaohongshu';

type NavItem = {
  key: IconName;
  href: string;
  label: string;
  hint: string;
  external?: boolean;
};

const copy = {
  en: {
    languageButton: '中文',
    hero: {
      eyebrow: 'Personal visual AI project space',
      title: 'ImgDrift',
      subtitle: 'AI workflow, product thinking, and visual experiments.',
      description: 'A quiet homepage for selected image experiments, project notes, and lightweight tools.',
    },
    nav: [
      { key: 'about', href: '#about', label: 'About', hint: 'Profile and experience' },
      { key: 'projects', href: '#projects', label: 'Projects', hint: 'Selected builds and workflows' },
      { key: 'gallery', href: '#gallery', label: 'Gallery', hint: 'Visual materials and image studies' },
      { key: 'tools', href: '#tools', label: 'Tools', hint: 'Small image utilities' },
    ] as readonly NavItem[],
    sections: {
      about: {
        kicker: 'About',
        title: 'Product thinking meets AI workflows.',
        body: 'This space will hold my resume, product analysis experience, AI workflow practice, and the way I turn rough ideas into useful visual outputs.',
        points: ['Resume and experience', 'Product research', 'AI-assisted workflow'],
      },
      projects: {
        kicker: 'Projects',
        title: 'Selected projects, not a crowded workstation.',
        body: 'Projects will collect the background remover, ImgDrift homepage, OpenClaw automation, and other small but complete experiments.',
        points: ['Background Remover', 'ImgDrift Homepage', 'OpenClaw Workflow'],
      },
      gallery: {
        kicker: 'Gallery',
        title: 'A visual shelf for images and references.',
        body: 'Gallery will organize previous subjects, generated visuals, product-style images, and reference materials into a lighter image-first layout.',
        points: ['Generated images', 'Product visuals', 'Reference boards'],
      },
      tools: {
        kicker: 'Tools',
        title: 'Tools stay secondary until they are ready.',
        body: 'Image tools such as background removal will live here first. They should support the homepage instead of turning the homepage into a tool panel.',
        points: ['Background remover', 'Image cleanup', 'Future API tools'],
      },
    },
    social: [
      { key: 'github', href: 'https://github.com/ops-imok', label: 'GitHub', hint: 'Code and repositories', external: true },
      { key: 'twitter', href: '#', label: 'Twitter', hint: 'Social link placeholder', external: false },
      { key: 'xiaohongshu', href: '#', label: 'Xiaohongshu', hint: 'Social link placeholder', external: false },
    ] as readonly NavItem[],
  },
  zh: {
    languageButton: 'EN',
    hero: {
      eyebrow: '个人视觉 AI 项目空间',
      title: 'ImgDrift',
      subtitle: 'AI 工作流、产品思考与视觉实验。',
      description: '一个更安静的个人主页，用来承接精选图像实验、项目记录和轻量工具。',
    },
    nav: [
      { key: 'about', href: '#about', label: 'About', hint: '个人经历与简历' },
      { key: 'projects', href: '#projects', label: 'Projects', hint: '项目与工作流' },
      { key: 'gallery', href: '#gallery', label: 'Gallery', hint: '图片素材与视觉实验' },
      { key: 'tools', href: '#tools', label: 'Tools', hint: '轻量图片工具' },
    ] as readonly NavItem[],
    sections: {
      about: {
        kicker: 'About',
        title: '产品思考与 AI 工作流的交叉点。',
        body: '这里后续会放我的简历经历、产品分析经验、AI 工作流实践，以及把粗略想法变成可用视觉输出的过程。',
        points: ['简历经历', '产品研究', 'AI 辅助工作流'],
      },
      projects: {
        kicker: 'Projects',
        title: '展示精选项目，而不是堆满功能入口。',
        body: '项目页会承接背景移除工具、ImgDrift 主页、OpenClaw 自动化和其他小而完整的实验。',
        points: ['背景移除工具', 'ImgDrift 主页', 'OpenClaw 工作流'],
      },
      gallery: {
        kicker: 'Gallery',
        title: '用于存放图片与参考的视觉架子。',
        body: 'Gallery 会整理以前的主体图、生成图、产品风格图片和参考素材，让页面更偏图像展示。',
        points: ['生成图片', '产品视觉', '参考图板'],
      },
      tools: {
        kicker: 'Tools',
        title: '工具先放在二级位置，成熟后再放大。',
        body: '背景移除等图片工具先放在这里。它们应该支撑主页，而不是让首页变成工具面板。',
        points: ['背景移除', '图片清理', '未来 API 工具'],
      },
    },
    social: [
      { key: 'github', href: 'https://github.com/ops-imok', label: 'GitHub', hint: '代码与仓库', external: true },
      { key: 'twitter', href: '#', label: 'Twitter', hint: '社交链接占位', external: false },
      { key: 'xiaohongshu', href: '#', label: '小红书', hint: '社交链接占位', external: false },
    ] as readonly NavItem[],
  },
} as const;

function Icon({ name }: { name: IconName }) {
  const common = 'h-5 w-5';

  if (name === 'about') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1.4-4 4-6 7-6s5.6 2 7 6" />
      </svg>
    );
  }

  if (name === 'projects') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
        <path d="M3.5 7.5h6l2 2h9v9a2 2 0 0 1-2 2h-15z" />
        <path d="M3.5 7.5v-2h5.2l1.8 2" />
      </svg>
    );
  }

  if (name === 'gallery') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="M6.5 17 11 12.5l3 3 2-2 1.5 1.5" />
      </svg>
    );
  }

  if (name === 'tools') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
        <path d="m14.5 5 4.5 4.5-9.5 9.5H5v-4.5z" />
        <path d="m13 6.5 4.5 4.5" />
        <path d="M5 19h14" />
      </svg>
    );
  }

  if (name === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.08 1.56 1.08.9 1.59 2.37 1.13 2.95.86.09-.67.35-1.13.64-1.39-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.04-2.75-.1-.26-.45-1.3.1-2.72 0 0 .85-.28 2.78 1.05A9.37 9.37 0 0 1 12 6.9c.86 0 1.72.12 2.53.35 1.93-1.33 2.77-1.05 2.77-1.05.56 1.42.21 2.46.11 2.72.65.72 1.04 1.63 1.04 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.83c0 .28.18.6.69.5A10.13 10.13 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
      </svg>
    );
  }

  if (name === 'twitter') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
        <path d="M4 4l16 16" />
        <path d="M20 4 4 20" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <path d="M8.5 12h7" />
      <path d="M12 8.5v7" />
    </svg>
  );
}

function TooltipLink({ item, compact = false }: { item: NavItem; compact?: boolean }) {
  const linkProps = item.external ? { target: '_blank', rel: 'noreferrer' } : {};

  return (
    <a
      href={item.href}
      aria-label={item.label}
      title={item.label}
      {...linkProps}
      className={`group relative inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:text-slate-950 hover:shadow-md ${compact ? 'h-9 w-9' : 'h-12 w-12'}`}
    >
      <Icon name={item.key} />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-200 bg-slate-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:block group-hover:opacity-100 md:block md:opacity-0 md:group-hover:opacity-100">
        {item.label}
        <span className="ml-2 text-slate-300">{item.hint}</span>
      </span>
    </a>
  );
}

function SoftPanel({ children, id }: { children: ReactNode; id: string }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white/75 p-6 shadow-sm backdrop-blur md:p-8">{children}</div>
    </section>
  );
}

function SectionCard({ section }: { section: { kicker: string; title: string; body: string; points: readonly string[] } }) {
  return (
    <div className="grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{section.kicker}</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{section.title}</h2>
      </div>
      <div>
        <p className="text-sm leading-7 text-slate-600 md:text-base">{section.body}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {section.points.map((point) => (
            <span key={point} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
              {point}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualStack() {
  return (
    <div className="relative mx-auto h-[320px] max-w-sm md:h-[390px]">
      <div className="absolute left-2 top-8 h-56 w-56 rounded-[3rem] border border-slate-200 bg-gradient-to-br from-indigo-100 via-white to-cyan-100 shadow-sm" />
      <div className="absolute right-0 top-0 h-48 w-36 rounded-[2.5rem] border border-slate-200 bg-white/80 p-3 shadow-sm">
        <div className="h-full rounded-[2rem] bg-gradient-to-b from-slate-100 to-slate-200" />
      </div>
      <div className="absolute bottom-0 left-14 h-48 w-64 rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid h-full grid-cols-3 gap-2">
          <div className="rounded-2xl bg-slate-100" />
          <div className="rounded-2xl bg-slate-200/80" />
          <div className="rounded-2xl bg-slate-100" />
          <div className="rounded-2xl bg-slate-200/70" />
          <div className="rounded-2xl bg-slate-100" />
          <div className="rounded-2xl bg-slate-200/80" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const t = copy[language];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f5] text-slate-950">
      <header className="fixed left-0 right-0 top-0 z-30 px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="#top" className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold tracking-tight text-slate-950 shadow-sm backdrop-blur transition hover:border-slate-400">
            ImgDrift
          </a>
          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 p-1.5 shadow-sm backdrop-blur">
              {t.nav.map((item) => (
                <TooltipLink key={item.key} item={item} />
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setLanguage((current) => (current === 'en' ? 'zh' : 'en'))}
              className="h-12 rounded-full border border-slate-200 bg-white/80 px-4 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur transition hover:border-slate-400 hover:text-slate-950"
            >
              {t.languageButton}
            </button>
          </div>
        </div>
      </header>

      <div className="pointer-events-none fixed bottom-5 left-5 z-30 flex gap-2 md:bottom-7 md:left-7">
        <div className="pointer-events-auto flex gap-2 rounded-full border border-slate-200 bg-white/65 p-1.5 shadow-sm backdrop-blur">
          {t.social.map((item) => (
            <TooltipLink key={item.key} item={item} compact />
          ))}
        </div>
      </div>

      <section id="top" className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 pb-24 pt-32 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pt-28">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 shadow-sm backdrop-blur">{t.hero.eyebrow}</p>
          <h1 className="text-6xl font-semibold tracking-tight text-slate-950 md:text-8xl">{t.hero.title}</h1>
          <p className="mt-7 max-w-2xl text-2xl font-medium leading-tight text-slate-800 md:text-4xl">{t.hero.subtitle}</p>
          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500 md:text-base">{t.hero.description}</p>
          <div className="mt-9 flex gap-3">
            {t.nav.map((item) => (
              <TooltipLink key={item.key} item={item} />
            ))}
          </div>
        </div>
        <VisualStack />
      </section>

      <SoftPanel id="about">
        <SectionCard section={t.sections.about} />
      </SoftPanel>

      <SoftPanel id="projects">
        <SectionCard section={t.sections.projects} />
      </SoftPanel>

      <SoftPanel id="gallery">
        <SectionCard section={t.sections.gallery} />
      </SoftPanel>

      <SoftPanel id="tools">
        <SectionCard section={t.sections.tools} />
      </SoftPanel>

      <footer className="mx-auto max-w-6xl px-5 pb-12 pt-8 md:px-8">
        <div className="border-t border-slate-200 pt-6 text-sm text-slate-400">ImgDrift · v0.0.1 visual homepage test</div>
      </footer>
    </main>
  );
}
