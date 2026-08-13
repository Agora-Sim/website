/* ============================================================
   0. IMPORTS
   ============================================================ */

import { BRAND, FOOTER, NAV_LINKS } from '../content/site.js';
import logo from '../assets/logo-fullmark-white.svg';
import './Footer.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * Page close: wordmark and tagline on the left, the same section links the
 * navbar carries plus the source repo on the right, a copyright line below.
 *
 * The build year comes from the browser clock rather than site content, so
 * it never needs a manual bump.
 */
export default function Footer() {
  const { tagline, repo } = FOOTER;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner wrap">
        <div className="footer__brand">
          <a className="footer__logo-link" href={BRAND.homeHref}>
            <img className="footer__logo" src={logo} alt={BRAND.logoAlt} />
          </a>
          <p className="footer__tagline">{tagline}</p>
        </div>

        <nav className="footer__nav" aria-label="Rodapé">
          {NAV_LINKS.map((link) => (
            <a className="footer__link" key={link.id} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="footer__link" href={repo.href} target="_blank" rel="noreferrer">
            {repo.label}
          </a>
        </nav>
      </div>

      <div className="footer__bar wrap">
        <p className="footer__copyright">© {year} AgoraSim</p>
      </div>
    </footer>
  );
}
