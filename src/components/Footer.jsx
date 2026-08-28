import Reveal from './Reveal';
import { IconBrandLogoFull } from './icons';
import './Footer.css';

/**
 * Footer — Bloc de clôture officiel freeIA INTEGRATION.
 *
 * @param {object} props
 * @param {(key: string) => string} props.t Fonction de traduction fournie par App.
 */
export default function Footer({ t }) {
  const year = 2026;

  return (
    <footer className="footer">
      <Reveal className="footer__inner">
        {/* --- Identité Officielle freeIA INTEGRATION --- */}
        <div className="footer__brand">
          <IconBrandLogoFull />
        </div>

        {/* --- Liens sociaux --- */}
        <nav className="footer__links" aria-label={t('footer.linksAria')}>
          <a className="footer__link" href="https://github.com/Faridadss7" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a className="footer__link" href="https://www.linkedin.com/in/farid-yelogniss%C3%A8-b-adisso-086726384" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a className="footer__link" href="mailto:contact@farid.tech">
            Email
          </a>
          <a
            className="footer__link"
            href={`https://wa.me/2290141822125?text=${encodeURIComponent(t('footer.whatsappPrefill'))}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            WhatsApp Business
          </a>
        </nav>
      </Reveal>

      {/* --- Note de clôture --- */}
      <div className="footer__bottom">
        <p className="footer__note">{t('footer.note')}</p>
        <p className="footer__copyright">© {year} Farid ADISSO. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}
