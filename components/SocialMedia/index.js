// CSS
import styles from "../../styles/SocialMedia.module.css";

const SocialMedia = () => {
  return (
    <nav className={styles.social_media_menu}>
      <ul className={styles.social_media_list}>
        <li>
          <a
            href="https://www.linkedin.com/in/maikaodev/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/maikaodev/"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
        <li>Gmail</li>
      </ul>
    </nav>
  );
};

export default SocialMedia;
