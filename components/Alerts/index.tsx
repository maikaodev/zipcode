import styles from "../../styles/Alerts.module.css";

export const Alerts = ({ Title }: { Title: string }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{Title}</h1>
    </div>
  );
};
