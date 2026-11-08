'use client';

import { useState } from 'react';
import Piaopiao from './piaopiao';
import styles from './home.module.css';

const sketchSource = 'https://github.com/ops-imok/instant-style/blob/old-package/src/app/page.tsx';
const copy = {
  en: {
    intro: 'A small studio for image-making, experiments, and tools.',
    featured: 'Featured experiment',
    sketch: 'Sketch Prototype',
    sketchDescription: 'An early browser experiment that turns photos into line drawings.',
    sketchLink: 'View prototype source',
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
    featured: '精选实验',
    sketch: '简笔画原型',
    sketchDescription: '一个把照片转换成线稿的早期浏览器实验。',
    sketchLink: '查看原型源码',
    indexLabel: '工作室目录',
    sections: [
      { id: 'works', title: '作品', description: '精选图像项目。', notes: ['产品图与海报视觉', '图像叙事与创作过程'] },
      { id: 'library', title: '视觉实验', description: '关于图像生成的尝试。', notes: ['生成图像与参考素材', '风格、纹理和构图研究'] },
      { id: 'tools', title: '工具', description: '为图像创作做的小工具。', notes: ['图片高清化', '背景移除', '文生图'], status: '规划中' },
    ],
    mascot: { jump: '让漂漂跳一下', secret: '漂漂的隐藏菜单', replay: '再跑一次', close: '收起' },
  },
};

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

          <section className={styles.featured} aria-labelledby="featured-title">
            <div>
              <p className={styles.eyebrow}>{t.featured}</p>
              <h2 id="featured-title">{t.sketch}</h2>
              <p>{t.sketchDescription}</p>
              <a href={sketchSource}>{t.sketchLink} <span aria-hidden="true">↗</span></a>
            </div>
            <div className={styles.sketch} aria-hidden="true" />
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
