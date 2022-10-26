// Components
import SocialMedia from "../SocialMedia";
import Copyright from "../Copyright";

import styles from "../../styles/Container.module.css";

function Container({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SocialMedia />
      </header>
      <main>{children}</main>
      <footer>
        <Copyright />
      </footer>
    </div>
  );
}
export default Container;
