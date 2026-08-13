/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useEffect, useState } from 'react';

import { BRAND, NAV_CTA, NAV_LINKS } from '@/content/site.js';
import logo from '@/assets/images/logo-fullmark-white.svg';
import './Navbar.css';

/* ============================================================
   1. CONSTANTS
   ============================================================ */

/* Far enough that the bar doesn't flicker state on a trackpad nudge. */
const SCROLL_THRESHOLD_PX = 24;

/* ============================================================
   2. COMPONENT
   ============================================================ */

/**
 * Sticky page header: wordmark on the left, section links and the join
 * action on the right.
 *
 * Past the first scroll the bar gains a backdrop and a firmer rule, so it
 * stays readable once the hero's drawing scrolls up behind it. Two links
 * and one stamp fit on a phone, so there is no menu to open.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner wrap">
        <a className="navbar__brand" href={BRAND.homeHref}>
          <img className="navbar__logo" src={logo} alt={BRAND.logoAlt} />
        </a>

        <nav className="navbar__nav" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a className="navbar__link" key={link.id} href={link.href}>
              {link.label}
            </a>
          ))}

          <a
            className="navbar__cta"
            href={NAV_CTA.href}
            target="_blank"
            rel="noreferrer"
          >
            {NAV_CTA.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
