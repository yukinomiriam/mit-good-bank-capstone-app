import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as freeBrandsSvgIcons from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="footer">
      <ul className="social-link">
        <li>
          <a href="https://twitter.com/search/%7BsearchTerms%7D?source=desktop-search" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={freeBrandsSvgIcons.faTwitterSquare} />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={freeBrandsSvgIcons.faFacebookSquare} />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={freeBrandsSvgIcons.faInstagramSquare} />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={freeBrandsSvgIcons.faYoutubeSquare} />
          </a>
        </li>
        <li>
          <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={freeBrandsSvgIcons.faPinterestSquare} />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={freeBrandsSvgIcons.faLinkedin} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
