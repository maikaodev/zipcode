// Import - Functions
import { useState, useRef } from "react";

// Import - CSS
import styles from "../styles/Home.module.css";

export default function Home() {
  // Hooks

  // states
  const [dataAddress, setDataAddress] = useState();
  const [messageModal, setMessageModal] = useState("");

  // ref
  const input = useRef();

  // Hooks

  // Functions
  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    let formObj = {};

    // Take the form data and transform it into an object

    for (let [key, value] of Array.from(formData.entries())) {
      formObj[key] = value.toString();
    }

    // Return -> data address

    if (formObj.zipcode === "") {
      setTimeout(() => {
        setMessageModal("");
      }, 3 * 1000);
      setMessageModal("Digite um CEP válido!");
      input.current.focus();
      return;
    }

    const response = await fetch(
      `https://findyouraddress.netlify.app/api/zipcode/${formObj.zipcode}`
    );

    const data = await response.json();

    // Make sure the data is an object with the address data

    if (data.message) {
      setTimeout(() => {
        setMessageModal("");
      }, 3 * 1000);
      setMessageModal(data.message);
      input.current.value = "";
      input.current.focus();
      return;
    }

    setDataAddress(data);
    input.current.value = "";
    input.current.focus();
  };

  return (
    <section className={styles.content}>
      {messageModal ? <h1>{messageModal}</h1> : null}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          ref={input}
          type="text"
          id="zipcode"
          name="zipcode"
          placeholder="Ex.: 12345-678"
        />
        <button type="submit">Buscar CEP</button>
      </form>
      <div>
        {/* Its true? Show the data */}

        {dataAddress ? (
          <ul className={styles.list_response}>
            <li>CEP: {dataAddress.cep}</li>
            <li>Estado: {dataAddress.localidade}</li>
            <li>Cidade: {dataAddress.uf}</li>
            <li>Logradouro: {dataAddress.logradouro}</li>
          </ul>
        ) : null}
      </div>
    </section>
  );
}
