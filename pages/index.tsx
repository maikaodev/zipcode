// Import - Functions
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

// Import - CSS
import styles from "../styles/Home.module.css";

// Component
import { Alerts } from "../components";

export default function Home() {
  // Hooks

  // states
  const [dataAddress, setDataAddress] = useState([]);
  const [messageModal, setMessageModal] = useState("");

  // ref
  const input = useRef<HTMLInputElement>();

  // Hooks - end

  // Functions
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Take the form data and transform it into an object

    const { zipcode } = Object.fromEntries(formData.entries());
    // Return -> data address

    if (zipcode === "") {
      setTimeout(() => {
        setMessageModal("");
      }, 3 * 1000);
      setMessageModal("Digite um CEP válido!");
      input.current.focus();
      return;
    }

    const response = await fetch(
      `https://encontreseuendereco.netlify.app/api/zipcode/${zipcode}`
      // `http://localhost:3000/api/zipcode/${zipcode}`
    );

    const data = await response.json();

    // Make sure the data is an object with the address data

    if (data.message) {
      setTimeout(() => {
        setMessageModal("");
      }, 3 * 1000);

      setMessageModal(data.message);
      return;
    }

    setDataAddress([data]);
  };
  useEffect(() => {
    input.current.value = "";
    input.current.focus();
  }, [dataAddress, messageModal]);

  return (
    <>
      {/* Head */}
      <Head>
        <title>Zipcode | Localizar endereço</title>
        <meta
          name="keywords"
          content="CEP, Localizar endereço, Zipcode, Localizar cep"
        />
        <meta name="description" content="Localize o endereço" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {/* Head */}
      <section className={styles.content}>
        {messageModal && <Alerts Title={messageModal} />}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            ref={input}
            type="text"
            id="zipcode"
            name="zipcode"
            placeholder="Ex.: 12345-678"
            autoFocus
          />
          <button type="submit">Buscar CEP</button>
        </form>
        <div className={styles.list}>
          {/* Its true? Show the data */}

          {dataAddress.map((data) => {
            return (
              <ul className={styles.list_response} key="list_response">
                <li key={data.cep}>CEP: {data.cep}</li>
                <li key={data.localidade}>Estado: {data.localidade}</li>
                <li key={data.uf}>Cidade: {data.uf}</li>
                <li key={data.logradouro}>Logradouro: {data.logradouro}</li>
              </ul>
            );
          })}
        </div>
      </section>
    </>
  );
}
