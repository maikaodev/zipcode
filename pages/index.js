import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <section className={styles.content}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          placeholder="Ex.: 12345-678"
        />
        <button type="submit" onClick={() => alert("oi")}>
          Buscar CEP
        </button>
      </form>
      <div>
        <ul className={styles.list_response}>
          <li>CEP: 57015-040</li>
          <li>Estado: AL</li>
          <li>Cidade: Maceió</li>
          <li>Logradouro: Rua Coronel Lucena Maranhão</li>
        </ul>
      </div>
    </section>
  );
}
