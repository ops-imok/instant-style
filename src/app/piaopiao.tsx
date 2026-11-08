'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './home.module.css';

type Labels = { jump: string; secret: string; replay: string; close: string };
type Phase = 'idle' | 'happy' | 'away';

const secretClickCount = 50;
const clickGap = 4000;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Piaopiao({ labels }: { labels: Labels }) {
  const mascot = useRef<HTMLButtonElement>(null);
  const sway = useRef<HTMLSpanElement>(null);
  const hop = useRef<HTMLSpanElement>(null);
  const swayMotion = useRef<Animation>(null);
  const hopMotion = useRef<Animation>(null);
  const happyTimer = useRef<number>(undefined);
  const burst = useRef({ count: 0, lastClick: 0 });
  const phase = useRef<Phase>('idle');
  const [action, setAction] = useState<Phase>('idle');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => () => {
    swayMotion.current?.cancel();
    hopMotion.current?.cancel();
    window.clearTimeout(happyTimer.current);
  }, []);

  function changePhase(next: Phase) {
    phase.current = next;
    setAction(next);
  }

  function swayTo(angles: number[], duration: number, easing: string) {
    const part = sway.current;
    if (!part) return;
    const transform = getComputedStyle(part).transform;
    swayMotion.current?.cancel();
    swayMotion.current = part.animate(
      [{ transform }, ...angles.map(angle => ({ transform: `rotate(${angle}deg)` }))],
      { duration, easing },
    );
  }

  function jumpForJoy() {
    if (phase.current !== 'idle' || !hop.current) return;
    changePhase('happy');
    if (reducedMotion()) {
      happyTimer.current = window.setTimeout(() => changePhase('idle'), 600);
      return;
    }
    hopMotion.current = hop.current.animate([
      { transform: 'none', offset: 0 },
      { transform: 'scale(1.12, .84)', offset: .15, easing: 'ease-out' },
      { transform: 'translateY(-39px) rotate(-12deg) scale(.94, 1.08)', offset: .44, easing: 'ease-in' },
      { transform: 'rotate(7deg) scale(1.12, .89)', offset: .74 },
      { transform: 'translateY(-6px) rotate(-4deg)', offset: .87 },
      { transform: 'none', offset: 1 },
    ], { duration: 660 });
    hopMotion.current.onfinish = () => changePhase('idle');
  }

  function runAway() {
    if (phase.current === 'away' || !mascot.current || !hop.current) return;
    burst.current.count = 0;
    window.clearTimeout(happyTimer.current);
    if (hopMotion.current) {
      hopMotion.current.onfinish = null;
      hopMotion.current.cancel();
    }
    swayMotion.current?.cancel();
    if (reducedMotion()) {
      changePhase('idle');
      setMenuOpen(true);
      return;
    }

    changePhase('away');
    const distance = document.documentElement.clientWidth - mascot.current.getBoundingClientRect().left + 24;
    const peekDistance = distance - 64;
    hopMotion.current = hop.current.animate([
      { transform: 'none', offset: 0, easing: 'ease-in' },
      { transform: `translate(${distance * .29}px, -13px) rotate(13deg)`, offset: .11 },
      { transform: `translateX(${distance}px)`, offset: .24 },
      { transform: `translateX(${distance}px)`, offset: .42, easing: 'ease-out' },
      { transform: `translateX(${peekDistance}px) rotate(-11deg)`, offset: .50 },
      { transform: `translateX(${peekDistance}px) rotate(-11deg)`, offset: .59, easing: 'ease-in-out' },
      { transform: `translate(${peekDistance * .48}px, -17px) rotate(-12deg)`, offset: .71 },
      { transform: `translateX(${peekDistance * .28}px) rotate(4deg)`, offset: .79, easing: 'ease-out' },
      { transform: `translate(${peekDistance * .09}px, -12px) rotate(-7deg)`, offset: .89, easing: 'ease-in' },
      { transform: 'none', offset: 1 },
    ], { duration: 2250 });
    hopMotion.current.onfinish = () => {
      changePhase('idle');
      setMenuOpen(true);
    };
  }

  function handleClick() {
    if (phase.current === 'away') return;
    const now = performance.now();
    const count = now - burst.current.lastClick > clickGap ? 1 : burst.current.count + 1;
    burst.current = { count, lastClick: now };
    if (count === secretClickCount) runAway();
    else jumpForJoy();
  }

  return (
    <>
      <button
        type="button"
        className={styles.mascot}
        ref={mascot}
        aria-label={labels.jump}
        aria-controls="piaopiao-secret"
        data-action={action}
        onPointerEnter={event => {
          if (event.pointerType === 'mouse' && phase.current !== 'away' && !reducedMotion()) {
            swayTo([-4, 2.5, -1, 0], 650, 'ease-in-out');
          }
        }}
        onPointerLeave={() => {
          if (swayMotion.current?.playState === 'running') swayTo([0], 220, 'ease-out');
        }}
        onClick={handleClick}
      >
        <span ref={hop} className={styles.mascotPart} aria-hidden="true">
          <span ref={sway} className={styles.mascotPart}>
            <Image src="/piaopiao.webp" alt="" width={210} height={210} unoptimized draggable={false} />
            <span className={styles.sparkles} />
          </span>
        </span>
      </button>
      <div id="piaopiao-secret" className={styles.secret} role="group" aria-label={labels.secret} hidden={!menuOpen}>
        <span aria-live="polite">{menuOpen ? labels.secret : ''}</span>
        <button type="button" onClick={runAway}>{labels.replay}</button>
        <button type="button" onClick={() => {
          setMenuOpen(false);
          mascot.current?.focus();
        }}>{labels.close}</button>
      </div>
    </>
  );
}
