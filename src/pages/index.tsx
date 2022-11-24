// Import - Functions
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

// Import - CSS
import styles from "../styles/Home.module.css";

// Image
import LoadingImg from "../public/loading.gif";

// Component
import { Alerts } from "../components";

// Interface
export interface DataAddressProps {
  cep?: string;
  uf?: string;
  localidade?: string;
  logradouro?: string;
  message?: string;
}

// Page
export default function Home({ data = {} }: { data: DataAddressProps }) {
  // Hooks

  // router
  const router = useRouter();
  const { zipcodeParam } = router.query;

  // states
  const [messageModal, setMessageModal] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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

    if (zipcodeFormatted === zipcodeParam) {
      setMessageToAlert("Esse CEP acabou de ser consultado.");
      return;
    }

    if (
      zipcodeFormatted === "" ||
      zipcodeFormatted.length <= 7 ||
      zipcodeFormatted.length >= 9
    ) {
      setMessageToAlert("Digite um CEP válido!");
      return;
    }

    setIsLoading(true);
    router.push(`/${zipcodeFormatted}`);
    setMessageToAlert();
  };

  const setMessageToAlert = (messageToAlert?: string) => {
    if (messageToAlert) {
      setTimeout(() => {
        setMessageModal("");
      }, 2 * 1000);
      setMessageModal(messageToAlert);
    }
    input.current.value = "";
    input.current.focus();
  };

  useEffect(() => {
    setIsLoading(false);
    if (data.message) {
      return setMessageToAlert(data.message);
    }
    return setMessageToAlert();
  }, [data]);

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
        {isLoading && (
          <Image
            className={styles.loading}
            src={LoadingImg}
            alt="Loading..."
            width="200"
            height="200"
          />
        )}
        {messageModal && <Alerts Title={messageModal} />}
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          data-testid="form_zipcode"
        >
          <input
            ref={input}
            type="text"
            id="zipcode"
            name="zipcode"
            maxLength={8}
            placeholder="Ex.: 12345-678"
            onChange={(event) =>
              (input.current.value = event.target.value.replace(/\D/g, ""))
            }
            data-testid="input_zipcode"
            autoFocus
            required
          />
          <button data-testid="button_zipcode" type="submit">
            Buscar CEP
          </button>
        </form>
        <div className={styles.list}>
          {/* Its true? Show the data */}

          {data && data.cep && (
            <ul className={styles.list_response} data-testid="list_request">
              <li key={data.cep} data-testid="item_request_zipcode">
                CEP: {data.cep}
              </li>
              <li key={data.localidade} data-testid="item_request_state">
                Estado: {data.uf}
              </li>
              <li key={data.uf} data-testid="item_request_city">
                Cidade: {data.localidade}
              </li>
              <li key={data.logradouro} data-testid="item_request_street">
                Logradouro: {data.logradouro}
              </li>
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
