// CSS
import styles from "../../styles/SocialMedia.module.css";

export const SocialMedia = () => {
  return (
    <nav className={styles.social_media_menu}>
      <ul className={styles.social_media_list}>
        <li>
          <a
            href="https://www.linkedin.com/in/maikaodev/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/maikaodev"
            target="_blank"
            rel="noreferrer"
            title="Github"
          >
            <i className="fa-brands fa-square-github"></i>
          </a>
        </li>
        <li>
          <a
            href="mailto:maikao.dev@gmail.com"
            target="_blank"
            rel="noreferrer"
            title="Gmail"
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

// export default SocialMedia;
