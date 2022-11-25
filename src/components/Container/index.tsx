// Components
import { SocialMedia } from "../SocialMedia";
import { Copyright } from "../Copyright";

import styles from "../../styles/Container.module.css";

export const Container = ({ children }) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
      <footer>
        <SocialMedia />
        <Copyright />
      </footer>
    </div>
  );
};
