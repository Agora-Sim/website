/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useEffect, useState } from 'react';

/* ============================================================
   1. HOOK
   ============================================================ */

/**
 * True once the referenced element has entered the viewport, and true from
 * then on. For sections far below the fold, where a load-time animation
 * would have finished before anyone reached it — the reveal has to be tied
 * to the scroll instead. Fires once; the section is not meant to re-animate.
 *
 * @param {{ current: Element | null }} ref element to observe
 * @param {number} [threshold] fraction on screen before it counts as revealed
 */
export function useRevealed(ref, threshold = 0.15) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      /* Enough of the section on screen that a stagger reads as a
         sequence rather than starting while it is still a sliver. */
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return revealed;
}
