/* ============================================================
   0. IMPORTS
   ============================================================ */

import { Link } from 'react-router-dom';

import { BRAND, FOOTER, NAV_LINKS } from '@/content/site.js';
import logo from '@/assets/images/logo-fullmark-white.svg';
import './Footer.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * Page close, drawn as a drawing's title block: one strip of fields divided by
 * hairlines — wordmark, tagline, section links, copyright — rather than the two
 * stacked rows it used to be, which cost the page a screenful of height for
 * four short pieces of metadata.
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
        <Link className="footer__logo-link" to={BRAND.homeHref}>
          <img className="footer__logo" src={logo} alt={BRAND.logoAlt} />
        </Link>

        <p className="footer__field footer__tagline">{tagline}</p>

        <nav className="footer__field footer__nav" aria-label="Rodapé">
          {NAV_LINKS.map((link) => (
            <Link className="footer__link" key={link.id} to={link.to}>
              {link.label}
            </Link>
          ))}
          <a className="footer__link" href={repo.href} target="_blank" rel="noreferrer">
            {repo.label}
          </a>
        </nav>

        <p className="footer__field footer__copyright">© {year} AgoraSim</p>
      </div>
    </footer>
  );
}
