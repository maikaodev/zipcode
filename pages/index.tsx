// Import - Functions
import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Import - CSS
import styles from "../styles/Home.module.css";

// Component
import { Alerts } from "../components";

// Interface
interface DataAddressProps {
  cep: string;
  uf: string;
  localidade: string;
  logradouro: string;
  erro?: boolean;
}

// Page
export default function Home({ data }) {
  // Hooks

  // router
  const router = useRouter();
  const { zipcodeParam } = router.query;
  console.log("DATA====> ", data);

  // states
  const [dataAddress, setDataAddress] = useState<DataAddressProps>();
  const [messageModal, setMessageModal] = useState<string>("");

  // ref
  const input = useRef<HTMLInputElement>();

  // Hooks - end

  // Functions
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Take the form data and transform it into an object

    const { zipcode } = Object.fromEntries(formData.entries());
    // Return -> data address

    const zipcodeFormatted = zipcode.toString().replace("-", "");

    if (zipcodeFormatted === zipcodeParam) return;

    if (
      zipcodeFormatted === "" ||
      zipcodeFormatted.length <= 7 ||
      zipcodeFormatted.length >= 9
    ) {
      setTimeout(() => {
        setMessageModal("");
      }, 2 * 1000);
      setMessageModal("Digite um CEP válido!");
      return;
    }

    router.push(`/${zipcodeFormatted}`);
  };

  useEffect(() => {
    input.current.value = "";
    input.current.focus();
  }, [dataAddress, messageModal, zipcodeParam]);

  useEffect(() => {
    if (data.erro) {
      setTimeout(() => {
        setMessageModal("");
      }, 2 * 1000);
      setMessageModal("Digite um CEP válido!");
      return;
    }
    setDataAddress(data);
  }, [zipcodeParam]);

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

          {dataAddress && dataAddress.cep && (
            <ul className={styles.list_response}>
              <li key={data.cep}>CEP: {data.cep}</li>
              <li key={data.localidade}>Estado: {data.uf}</li>
              <li key={data.uf}>Cidade: {data.localidade}</li>
              <li key={data.logradouro}>Logradouro: {data.logradouro}</li>
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async (context) => {
  //
  if (!context.params) return { props: { data: {} } };

  const { zipcodeParam } = context.params;

  const response = await fetch(`https://viacep.com.br/ws/${zipcodeParam}/json`);
  const data = await response.json();

  return { props: { data } };
};
