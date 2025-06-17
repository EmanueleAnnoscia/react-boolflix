import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'
import ReactCountryFlag from "react-country-flag"


function MediaCard({ item }) {
    const isMovie = !!item.title;

    // Funzione per creare le stelle
    function Stars({ vote }) {
        const voteStars = Math.ceil(vote / 2); // voto da 1 a 5

        const starsArray = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= voteStars) {
                starsArray.push(<FontAwesomeIcon icon={fullStar} key={i} style={{ color: 'gold' }} />);
            } else {
                starsArray.push(<FontAwesomeIcon icon={emptyStar} key={i} style={{ color: 'gold' }} />);
            }
        }

        return <div>{starsArray}</div>;
    }


    //   sezione bandiere

    const languageToCountryCode = {
  en: "US",   
  en_GB: "GB", 
  it: "IT",   
  fr: "FR",   
  de: "DE",   
  es: "ES",   
  pt: "PT",   
  pt_BR: "BR",
  ru: "RU",   
  ja: "JP",   
  ko: "KR",   
  zh: "CN",   
  zh_HK: "HK",
  nl: "NL",   
  pl: "PL",   
  sv: "SE",   
  no: "NO",   
  da: "DK",   
  fi: "FI",  
  tr: "TR",   
  cs: "CZ",   
  hu: "HU",   
  ar: "SA",   
  he: "IL",   
  th: "TH",   
  hi: "IN",   
  ro: "RO",   
  el: "GR",   
  uk: "UA",   
};

    const countryCode = languageToCountryCode[item.original_language];




    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow">
                <img
                    src={item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Image'}
                    alt={isMovie ? item.title : item.name}
                    style={{ objectFit: "cover", height: "300px" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{isMovie ? item.title : item.name || "Dato non pervenuto"}</h5>
                    <p className="card-text">
                        <strong>Titolo originale:</strong> {isMovie ? item.original_title : item.original_name || "Dato non pervenuto"}<br />
                        {countryCode ? (
                            <span style={{ fontSize: "1.2rem" }}>
                                <ReactCountryFlag countryCode={countryCode} svg style={{ width: '1.5em', height: '1em' }} />
                            </span>
                        ) : (
                            <span>🌐</span> // fallback se la bandiera non è disponibile
                        )} ({item.original_language})
                        <strong>Voto:</strong> {item.vote_average === 0 && "Dato non pervenuto"}
                    </p>
                    {item.vote_average && <Stars vote={item.vote_average} />}
                </div>
            </div>
        </div>
    );
}

export default MediaCard