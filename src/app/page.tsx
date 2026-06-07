'use client';

import { useState, type ReactNode } from 'react';

type Language = 'en' | 'zh';
type PlatformItem = { title: string; status: string; href: string };

const copy = {
  en: {
    nav: { works: 'Works', library: 'Library', tools: 'Tools', support: 'Support', languageButton: '中文' },
    hero: {
      eyebrow: 'Personal visual AI project space',
      title: 'ImgDrift',
      subtitle: 'A personal visual AI project space for image generation, generation logic, and future image tools.',
      description: 'I use this site to collect image experiments, organize visual materials, and document how ideas move from prompts to finished visuals.',
      primaryCta: 'Explore Works',
      secondaryCta: 'View Future Tools',
      tags: ['Image Generation', 'Generation Logic', 'Visual Library', 'AI Tools Coming Soon'],
    },
    index: {
      title: 'Project Index',
      description: 'A simple map of what ImgDrift is collecting, showing, and planning next.',
      cards: [
        { title: 'Works', body: 'Image-related tasks, generated visuals, and project process notes.', href: '#works' },
        { title: 'Visual Library', body: 'A reserved space for collected references, generated images, and visual materials.', href: '#library' },
        { title: 'Future Tools', body: 'Planned AI image tools including upscale, background remover, and text-to-image.', href: '#tools' },
      ],
    },
    platforms: {
      title: 'Platforms',
      description: 'Current and future places where I share projects, notes, and visual experiments.',
      items: [
        { title: 'GitHub', status: 'Available', href: 'https://github.com/ops-imok' },
        { title: 'Xiaohongshu', status: 'Coming Soon', href: '' },
        { title: 'Bilibili', status: 'Coming Soon', href: '' },
      ],
    },
    works: {
      kicker: '# works',
      title: 'Works Preview',
      description: 'A reserved space for image generation results, visual content ideas, and generation logic demos.',
      items: [
        { title: 'Product & Poster Visuals', body: 'Product images, posters, covers, and visual assets built around concrete use cases.', status: 'Placeholder' },
        { title: 'Visual Content Creation', body: 'Infographics, social covers, content cards, and image-based storytelling formats.', status: 'Draft' },
        { title: 'Generation Logic Demos', body: 'How rough ideas move into prompt structures, visual constraints, iterations, and final outputs.', status: 'Placeholder' },
        { title: 'Visual Experiments', body: 'Style, composition, texture, and visual direction experiments beyond commercial use cases.', status: 'Coming Soon' },
      ],
    },
    library: {
      kicker: '# library',
      title: 'Visual Library',
      description: 'A reserved library for references, generated images, product materials, and style experiments.',
      items: [
        { title: 'Reference Images', body: 'Collected visual references for future prompt and design experiments.', status: '0 items / Placeholder' },
        { title: 'Generated Images', body: 'AI-generated outputs that can be organized by direction and use case.', status: '0 items / Placeholder' },
        { title: 'Product Materials', body: 'Product-related images, visual elements, and layout materials.', status: '0 items / Placeholder' },
        { title: 'Style Experiments', body: 'Explorations of visual styles, composition, and image generation constraints.', status: '0 items / Placeholder' },
      ],
    },
    tools: {
      kicker: '# tools',
      title: 'Future Image Tools',
      description: 'Planned lightweight AI image tools. These features are not enabled in v0.0.1, but API slots are reserved for future integration.',
      items: [
        { title: 'Image Upscale', body: 'Improve image resolution and clarity through a future API integration.', status: ['Coming Soon', 'API Slot Reserved'] },
        { title: 'Background Remover', body: 'Remove image backgrounds for product visuals and content assets.', status: ['Coming Soon', 'API Slot Reserved'] },
        { title: 'Text to Image', body: 'Generate images from selected prompt templates and constrained visual directions, not a blank prompt box.', status: ['Coming Soon', 'Prompt Templates Planned'] },
      ],
      sketch: {
        title: 'Sketch Prototype',
        body: 'A browser-based sketch effect from the original prototype. It is kept as a lightweight experiment, not the core product.',
        status: ['Prototype', 'Not enabled in v0.0.1'],
      },
    },
    support: { kicker: '# support', title: 'Support ImgDrift', description: 'If you like this visual AI project, you can support future experiments.', placeholder: 'Donation QR Placeholder' },
    footer: { text: 'ImgDrift — A personal visual AI project space.', version: 'Version v0.0.1 · GitHub' },
  },
  zh: {
    nav: { works: '作品', library: '素材库', tools: '工具', support: '支持', languageButton: 'EN' },
    hero: {
      eyebrow: '个人视觉 AI 项目空间',
      title: 'ImgDrift',
      subtitle: '一个围绕 AI 图像生成、生成逻辑和未来图片工具搭建的个人视觉项目空间。',
      description: '我会在这里整理图像实验、视觉素材，以及从想法到最终成图的完整过程。',
      primaryCta: '查看作品',
      secondaryCta: '查看未来工具',
      tags: ['图像生成', '生成逻辑', '视觉素材库', 'AI 工具规划中'],
    },
    index: {
      title: '项目索引',
      description: '快速了解 ImgDrift 正在收集、展示和规划的内容。',
      cards: [
        { title: '作品与项目', body: '图像相关任务、生成结果和项目流程记录。', href: '#works' },
        { title: '视觉素材库', body: '用于沉淀参考图、生成图和视觉素材的预留空间。', href: '#library' },
        { title: '未来工具', body: '规划中的 AI 图片工具，包括高清化、背景移除和文生图。', href: '#tools' },
      ],
    },
    platforms: {
      title: '平台链接',
      description: '当前和未来用于发布项目、笔记与图像实验的平台入口。',
      items: [
        { title: 'GitHub', status: '已开放', href: 'https://github.com/ops-imok' },
        { title: '小红书', status: '即将补充', href: '' },
        { title: 'B站', status: '即将补充', href: '' },
      ],
    },
    works: {
      kicker: '# works',
      title: '作品预览',
      description: '用于展示图片生成结果、图文内容创作和生成逻辑 Demo 的预留空间。',
      items: [
        { title: '产品与海报视觉', body: '围绕具体使用场景生成的产品图、海报、封面和视觉素材。', status: '占位' },
        { title: '图文内容创作', body: '信息图、社媒封面、内容卡片和图像化表达形式。', status: '草稿' },
        { title: '生成逻辑 Demo', body: '展示粗略想法如何进入提示词结构、视觉约束、迭代和最终成图。', status: '占位' },
        { title: '视觉实验', body: '商业用途之外的风格、构图、材质和视觉方向实验。', status: '规划中' },
      ],
    },
    library: {
      kicker: '# library',
      title: '视觉素材库',
      description: '用于沉淀参考图、生成图、产品素材和风格实验的预留素材库。',
      items: [
        { title: '参考图片', body: '用于后续提示词和设计实验的视觉参考。', status: '0 项 / 占位' },
        { title: '生成图片', body: '按方向和使用场景整理的 AI 生成结果。', status: '0 项 / 占位' },
        { title: '产品素材', body: '产品相关图片、视觉元素和版式素材。', status: '0 项 / 占位' },
        { title: '风格实验', body: '围绕视觉风格、构图和图片生成约束的实验。', status: '0 项 / 占位' },
      ],
    },
    tools: {
      kicker: '# tools',
      title: '未来图片工具',
      description: '规划中的轻量 AI 图片工具。v0.0.1 暂不开放实际功能，但会为后续 API 接入预留位置。',
      items: [
        { title: '图片高清化', body: '未来通过 API 接入提升图片清晰度与分辨率。', status: ['规划中', 'API 接口预留'] },
        { title: '图片背景移除', body: '用于产品图和内容素材的背景移除能力。', status: ['规划中', 'API 接口预留'] },
        { title: '文生图', body: '基于预设提示词结构和选定视觉方向生成图片，而不是完全开放的空白输入框。', status: ['规划中', '提示词模板预留'] },
      ],
      sketch: {
        title: '简笔画原型',
        body: '来自原型项目的浏览器本地简笔画效果。它会作为轻量实验保留，但不是当前核心产品。',
        status: ['原型', 'v0.0.1 暂不开放'],
      },
    },
    support: { kicker: '# support', title: '支持 ImgDrift', description: '如果你喜欢这个视觉 AI 项目，可以支持它后续继续实验。', placeholder: '打赏二维码占位' },
    footer: { text: 'ImgDrift — 个人视觉 AI 项目空间。', version: '版本 v0.0.1 · GitHub' },
  },
} as const;

function StatusPill({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">{children}</span>;
}

function VisualPlaceholder({ variant = 0 }: { variant?: number }) {
  const gradients = [
    'from-indigo-100 via-slate-100 to-cyan-100',
    'from-amber-100 via-stone-100 to-rose-100',
    'from-emerald-100 via-slate-100 to-blue-100',
    'from-violet-100 via-slate-100 to-fuchsia-100',
  ];

  return (
    <div className={`relative h-40 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br ${gradients[variant % gradients.length]}`}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.5)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-5 top-5 h-16 w-16 rounded-full bg-white/60 blur-sm" />
      <div className="absolute bottom-5 right-5 h-20 w-28 rounded-2xl bg-white/55 shadow-sm" />
      <div className="absolute bottom-8 left-7 h-2 w-24 rounded-full bg-slate-400/30" />
      <div className="absolute bottom-12 left-7 h-2 w-14 rounded-full bg-slate-400/20" />
    </div>
  );
}

function SectionHeading({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">{description}</p>
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const t = copy[language];
  const platformItems = t.platforms.items as readonly PlatformItem[];

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-[#f7f7f5]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="text-sm font-semibold tracking-tight text-slate-950 hover:underline underline-offset-4">ImgDrift</a>
          <nav className="flex items-center gap-3 text-sm text-slate-600 md:gap-5">
            <a href="#works" className="hidden hover:text-slate-950 hover:underline underline-offset-4 sm:inline">{t.nav.works}</a>
            <a href="#library" className="hidden hover:text-slate-950 hover:underline underline-offset-4 sm:inline">{t.nav.library}</a>
            <a href="#tools" className="hover:text-slate-950 hover:underline underline-offset-4">{t.nav.tools}</a>
            <a href="#support" className="hover:text-slate-950 hover:underline underline-offset-4">{t.nav.support}</a>
            <button type="button" onClick={() => setLanguage((current) => (current === 'en' ? 'zh' : 'en'))} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-500 hover:text-slate-950">{t.nav.languageButton}</button>
          </nav>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{t.hero.eyebrow}</p>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">{t.hero.title}</h1>
            <p className="mt-6 max-w-2xl text-2xl font-medium leading-tight text-slate-800 md:text-3xl">{t.hero.subtitle}</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{t.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#works" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800">{t.hero.primaryCta}</a>
              <a href="#tools" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-500">{t.hero.secondaryCta}</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">{t.hero.tags.map((tag) => <StatusPill key={tag}>{tag}</StatusPill>)}</div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <VisualPlaceholder variant={0} />
              <div className="mt-4 grid grid-cols-3 gap-3"><div className="h-20 rounded-2xl border border-slate-200 bg-white" /><div className="h-20 rounded-2xl border border-slate-200 bg-white" /><div className="h-20 rounded-2xl border border-slate-200 bg-white" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{t.index.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{t.index.description}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{t.index.cards.map((card) => <a key={card.title} href={card.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-md"><h3 className="text-lg font-semibold text-slate-950 group-hover:underline underline-offset-4">{card.title} →</h3><p className="mt-3 text-sm leading-6 text-slate-600">{card.body}</p></a>)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{t.platforms.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{t.platforms.description}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {platformItems.map((item) => {
              const content = <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-400"><div className="flex items-center justify-between gap-3"><span className="font-medium text-slate-900">{item.title}</span><StatusPill>{item.status}</StatusPill></div></div>;
              return item.href ? <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="group">{content}</a> : <div key={item.title}>{content}</div>;
            })}
          </div>
        </div>
      </section>

      <section id="works" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8">
        <SectionHeading kicker={t.works.kicker} title={t.works.title} description={t.works.description} />
        <div className="mt-8 grid gap-5 md:grid-cols-2">{t.works.items.map((item, index) => <article key={item.title} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-md"><VisualPlaceholder variant={index} /><div className="mt-5 flex items-start justify-between gap-4"><h3 className="text-lg font-semibold text-slate-950 group-hover:underline underline-offset-4">{item.title} →</h3><StatusPill>{item.status}</StatusPill></div><p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p></article>)}</div>
      </section>

      <section id="library" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8">
        <SectionHeading kicker={t.library.kicker} title={t.library.title} description={t.library.description} />
        <div className="mt-8 grid gap-4 md:grid-cols-4">{t.library.items.map((item, index) => <article key={item.title} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-400"><div className="mb-5 grid grid-cols-3 gap-2"><div className="h-12 rounded-xl bg-slate-100" /><div className="h-12 rounded-xl bg-slate-200/80" /><div className="h-12 rounded-xl bg-slate-100" /><div className="h-12 rounded-xl bg-slate-200/70" /><div className="h-12 rounded-xl bg-slate-100" /><div className="h-12 rounded-xl bg-slate-200/80" /></div><h3 className="font-semibold text-slate-950 group-hover:underline underline-offset-4">{item.title} #{index + 1}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p><div className="mt-4"><StatusPill>{item.status}</StatusPill></div></article>)}</div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8">
        <SectionHeading kicker={t.tools.kicker} title={t.tools.title} description={t.tools.description} />
        <div className="mt-8 grid gap-5 md:grid-cols-3">{t.tools.items.map((item) => <article key={item.title} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-md"><div className="mb-5 h-12 w-12 rounded-2xl border border-slate-200 bg-slate-50" /><h3 className="text-lg font-semibold text-slate-950 group-hover:underline underline-offset-4">{item.title} →</h3><p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p><div className="mt-5 flex flex-wrap gap-2">{item.status.map((status) => <StatusPill key={status}>{status}</StatusPill>)}</div></article>)}</div>
        <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h3 className="text-lg font-semibold text-slate-950">{t.tools.sketch.title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{t.tools.sketch.body}</p></div><div className="flex flex-wrap gap-2">{t.tools.sketch.status.map((status) => <StatusPill key={status}>{status}</StatusPill>)}</div></div></div>
      </section>

      <section id="support" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8"><SectionHeading kicker={t.support.kicker} title={t.support.title} description={t.support.description} /><div className="mt-8 flex min-h-40 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-sm font-medium text-slate-500">{t.support.placeholder}</div></div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-10 md:px-8"><div className="flex flex-col justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center"><p>{t.footer.text}</p><a href="https://github.com/ops-imok" target="_blank" rel="noreferrer" className="hover:text-slate-950 hover:underline underline-offset-4">{t.footer.version}</a></div></footer>
    </main>
  );
}
