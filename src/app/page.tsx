'use client';

import { useState } from 'react';
import Piaopiao from './piaopiao';
import styles from './home.module.css';

const copy = {
  en: {
    intro: 'A small studio for image-making, experiments, and tools.',
    history: 'Version History',
    indexLabel: 'Studio index',
    sections: [
      { id: 'works', title: 'Works', description: 'Selected image projects.', notes: ['Product and poster visuals', 'Visual storytelling and process notes'] },
      { id: 'library', title: 'Visual Experiments', description: 'Studies in image generation.', notes: ['Generated images and references', 'Studies in style, texture, and composition'] },
      { id: 'tools', title: 'Tools', description: 'Small tools for making images.', notes: ['Image upscaling', 'Background removal', 'Text to image'], status: 'Planned' },
    ],
    mascot: { jump: 'Make Piaopiao jump', secret: 'Piaopiao’s secret menu', replay: 'Run again', close: 'Close' },
  },
  zh: {
    intro: '一个记录图像创作、视觉实验和小工具的个人工作室。',
    history: '版本记录',
    indexLabel: '工作室目录',
    sections: [
      { id: 'works', title: '作品', description: '精选图像项目。', notes: ['产品图与海报视觉', '图像叙事与创作过程'] },
      { id: 'library', title: '视觉实验', description: '关于图像生成的尝试。', notes: ['生成图像与参考素材', '风格、纹理和构图研究'] },
      { id: 'tools', title: '工具', description: '为图像创作做的小工具。', notes: ['图片高清化', '背景移除', '文生图'], status: '规划中' },
    ],
    mascot: { jump: '让漂漂跳一下', secret: '漂漂的隐藏菜单', replay: '再跑一次', close: '收起' },
  },
};

const versionHistory = [
  {
    id: '01',
    date: '2026-11-09',
    en: {
      title: 'Version 01 · The new homepage',
      dateLabel: 'Nov 9, 2026',
      changes: [
        'Introduced a single-column layout with a warm paper palette.',
        'Made English the default, with a Chinese language switch.',
        'Added Piaopiao, a paper companion that sways on hover and jumps on click.',
      ],
    },
    zh: {
      title: '第 01 版 · 新版首页',
      dateLabel: '2026 年 11 月 9 日',
      changes: [
        '采用暖白纸色和单栏排版。',
        '默认显示英文，可切换到中文。',
        '加入小相纸漂漂，悬停时轻晃，点击时跳起来。',
      ],
    },
  },
];

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const t = copy[language];

  return (
    <div className={styles.site} id="top" lang={language === 'en' ? 'en' : 'zh-Hans'}>
      <div className={styles.column}>
        <header className={styles.header}>
          <a className={styles.wordmark} href="#top">ImgDrift</a>
          <div className={styles.languages} role="group" aria-label={language === 'en' ? 'Language' : '语言'}>
            <button type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" lang="zh-Hans" aria-pressed={language === 'zh'} onClick={() => setLanguage('zh')}>中文</button>
          </div>
        </header>

        <main>
          <section className={styles.hero} aria-labelledby="site-title">
            <Piaopiao labels={t.mascot} />
            <h1 id="site-title">ImgDrift</h1>
            <p>{t.intro}</p>
          </section>

          <section className={styles.history} aria-labelledby="version-history">
            <h2 id="version-history" className={styles.eyebrow}>{t.history}</h2>
            <ol className={styles.timeline}>
              {versionHistory.map(version => {
                const entry = version[language];
                return (
                  <li key={version.id} className={styles.release}>
                    <time dateTime={version.date}>{entry.dateLabel}</time>
                    <h3>{entry.title}</h3>
                    <ul>{entry.changes.map(change => <li key={change}>{change}</li>)}</ul>
                  </li>
                );
              })}
            </ol>
          </section>

          <section aria-label={t.indexLabel}>
            {t.sections.map(({ id, title, description, notes, status }) => (
              <details id={id} key={id} className={styles.indexRow}>
                <summary>
                  <span>
                    <strong>{title}</strong>
                    <span className={styles.description}>{description}</span>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </summary>
                <div className={styles.notes}>
                  {status && <p className={styles.eyebrow}>{status}</p>}
                  <ul>{notes.map(note => <li key={note}>{note}</li>)}</ul>
                </div>
              </details>
            ))}
          </section>
        </main>

        <footer className={styles.footer}>
          <a className={styles.wordmark} href="#top">ImgDrift</a>
          <a href="https://github.com/ops-imok">GitHub <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </div>
  );
}
