'use client';

import { useState } from 'react';

type Language = 'zh' | 'en';

const content = {
  zh: {
    eyebrow: 'AN OPEN SPACE FOR VISUAL IDEAS',
    headline: '让想法，自由漂流。',
    description: '一个关于视觉、创造与 AI 的私人实验空间。\n从一点灵感开始，慢慢生长。',
    cta: '探索 GitHub',
    side: '灵感不需要边界',
    bottom: '持续探索中',
    language: 'EN',
  },
  en: {
    eyebrow: 'AN OPEN SPACE FOR VISUAL IDEAS',
    headline: 'Let ideas drift.',
    description: 'An independent space for visuals, creativity and AI.\nSmall ideas, given room to grow.',
    cta: 'Explore GitHub',
    side: 'A PLACE TO EXPERIMENT',
    bottom: 'Always in progress',
    language: '中文',
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>('zh');
  const t = content[language];

  return (
    <main className="intro-root relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#060a17] text-[#f4f7ff]">
      <div className="intro-grid pointer-events-none absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="intro-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="intro-glow intro-glow-one pointer-events-none absolute" aria-hidden="true" />
      <div className="intro-glow intro-glow-two pointer-events-none absolute" aria-hidden="true" />
      <div className="intro-glow intro-glow-three pointer-events-none absolute" aria-hidden="true" />
      <div className="intro-orbit intro-orbit-one pointer-events-none absolute" aria-hidden="true" />
      <div className="intro-orbit intro-orbit-two pointer-events-none absolute" aria-hidden="true" />
      <div className="intro-star intro-star-one pointer-events-none absolute" aria-hidden="true" />
      <div className="intro-star intro-star-two pointer-events-none absolute" aria-hidden="true" />
      <div className="intro-star intro-star-three pointer-events-none absolute" aria-hidden="true" />

      <header className="relative z-20 mx-auto flex w-full max-w-[1560px] items-center justify-between px-7 py-7 sm:px-12 sm:py-10">
        <a href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.04em] sm:text-base" aria-label="ImgDrift home">
          <span className="intro-mark" aria-hidden="true"><span /></span>
          ImgDrift<span className="text-[#7f98b9]">.</span>
        </a>
        <div className="flex items-center gap-5 sm:gap-9">
          <a href="https://github.com/ops-imok/instant-style" target="_blank" rel="noreferrer" className="hidden text-xs tracking-[0.13em] text-[#b6c4de] transition hover:text-white sm:block">
            GITHUB ↗
          </a>
          <button
            type="button"
            onClick={() => setLanguage((current) => current === 'zh' ? 'en' : 'zh')}
            className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-xs font-medium tracking-wider text-white transition hover:border-white/40 hover:bg-white/[0.12]"
            aria-label={language === 'zh' ? 'Switch to English' : '切换为中文'}
          >
            {t.language}
          </button>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-[1560px] flex-1 items-center px-7 pb-20 pt-14 sm:px-12 sm:pb-24">
        <div className="intro-appear relative w-full max-w-4xl">
          <p className="mb-7 flex items-center gap-3 text-[10px] font-medium tracking-[0.29em] text-[#9bb8ef] sm:mb-10 sm:text-xs">
            <span className="h-px w-8 bg-[#87aafa]" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h1 className="intro-title text-[clamp(4.25rem,13vw,10rem)] font-semibold leading-[0.92] tracking-[-0.085em]">
            Img<span className="intro-gradient-text">Drift</span>
            <span className="text-[#94b8ff]">.</span>
          </h1>
          <h2 className="mt-8 text-2xl font-medium tracking-[-0.045em] text-[#f1f4ff] sm:mt-10 sm:text-4xl">
            {t.headline}
          </h2>
          <p className="mt-5 max-w-xl whitespace-pre-line text-sm leading-8 tracking-[0.015em] text-[#9eacc5] sm:mt-7 sm:text-base">
            {t.description}
          </p>
          <a
            href="https://github.com/ops-imok/instant-style"
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-6 rounded-full border border-white/20 bg-white/[0.09] px-6 py-3.5 text-sm font-medium backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#93b6ff]/60 hover:bg-white/[0.15] sm:mt-12"
          >
            {t.cta}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#9cbbff] text-[#07112a] transition group-hover:translate-x-1" aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="intro-side-label pointer-events-none absolute right-12 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.36em] text-[#7387af] xl:block">
          {t.side}
        </p>
      </section>

      <footer className="relative z-10 mx-auto flex w-full max-w-[1560px] items-end justify-between px-7 pb-8 text-[10px] tracking-[0.17em] text-[#7285a8] sm:px-12 sm:pb-10">
        <span>© {new Date().getFullYear()} IMGDRIFT</span>
        <span className="flex items-center gap-2"><span className="intro-status h-1.5 w-1.5 rounded-full bg-[#87c7ba]" />{t.bottom}</span>
      </footer>
    </main>
  );
}
