import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import ReactCountryFlag from 'react-country-flag';
import '../index.css';
import './MediaCard.css';

function MediaCard({ item }) {
  if (!item) return null; // evita crash se item è undefined

  const isMovie = !!item.title;

  function Stars({ vote }) {
    if (!vote || vote === 0) {
      return <div className="text-muted">Voto non disponibile</div>;
    }

    const voteStars = Math.ceil(vote / 2);
    const starsArray = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= voteStars) {
        starsArray.push(<FontAwesomeIcon icon={fullStar} key={i} style={{ color: 'gold' }} />);
      } else {
        starsArray.push(<FontAwesomeIcon icon={emptyStar} key={i} style={{ color: 'gold' }} />);
      }
    }

    return <div className="text-warning">{starsArray}</div>;
  }

  const languageToCountryCode = {
    en: 'US', en_GB: 'GB', it: 'IT', fr: 'FR', de: 'DE',
    es: 'ES', pt: 'PT', pt_BR: 'BR', ru: 'RU', ja: 'JP',
    ko: 'KR', zh: 'CN', zh_HK: 'HK', nl: 'NL', pl: 'PL',
    sv: 'SE', no: 'NO', da: 'DK', fi: 'FI', tr: 'TR',
    cs: 'CZ', hu: 'HU', ar: 'SA', he: 'IL', th: 'TH',
    hi: 'IN', ro: 'RO', el: 'GR', uk: 'UA',
  };

  const countryCode = languageToCountryCode[item.original_language];

  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const displayTitle = isMovie ? item.title : item.name || 'Dato non disponibile';
  const originalTitle = isMovie ? item.original_title : item.original_name || 'Dato non disponibile';
  const language = item.original_language || 'N/A';

  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
      <div className="media-card position-relative">
        <img src={posterUrl} alt={displayTitle} className="img-fluid" />
        <div className="media-overlay">
          <h6 className="text-truncate">{displayTitle}</h6>
          <p className="small mb-1">
            <strong>Originale:</strong><br />
            {originalTitle}
          </p>
          <p className="small mb-1">
            {countryCode ? (
              <ReactCountryFlag countryCode={countryCode} svg style={{ width: '1.5em', height: '1em' }} />
            ) : (
              <span>🌐</span>
            )}{' '}
            ({language})
          </p>
          <Stars vote={item.vote_average} />
        </div>
      </div>
    </div>
  );
}

export default MediaCard;
