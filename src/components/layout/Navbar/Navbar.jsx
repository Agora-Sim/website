/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner wrap">
        <Link className="navbar__brand" to={BRAND.homeHref}>
          <img className="navbar__logo" src={logo} alt={BRAND.logoAlt} />
        </Link>

        <nav className="navbar__nav" aria-label="Principal">
          {NAV_LINKS.map((link) => {
            /* Only whole-page links can be "the page you are on". A link to
               a section of a page isn't current just because that page is. */
            const isCurrent = link.to === pathname;

            return (
              <Link
                className={
                  isCurrent ? 'navbar__link navbar__link--current' : 'navbar__link'
                }
                key={link.id}
                to={link.to}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            className="navbar__cta"
            to={NAV_CTA.to}
            aria-current={NAV_CTA.to === pathname ? 'page' : undefined}
          >
            {NAV_CTA.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
