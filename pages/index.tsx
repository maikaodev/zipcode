// Import - Functions
import { useState, useEffect, useRef, FormEvent } from "react";
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
interface DataAddressProps {
  cep?: string;
  uf?: string;
  localidade?: string;
  logradouro?: string;
  message?: string;
}

// Page
export default function Home({ data }: { data: DataAddressProps }) {
  // Hooks

  // router
  const router = useRouter();
  const { zipcodeParam } = router.query;

  // states
  const [dataAddress, setDataAddress] = useState<DataAddressProps>(data);
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
      setIsLoading(false);
      setMessageModal(messageToAlert);
    }

    // reset input
    input.current.value = "";
    input.current.focus();
  };

  useEffect(() => {
    setIsLoading(false);
    if (data.message) {
      setMessageToAlert(data.message);
      setDataAddress({});
      return;
    }
    setDataAddress(data);
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
        {messageModal && <Alerts data-testid="modal" Title={messageModal} />}
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

  const response = await fetch(
    `https://encontreseuendereco.netlify.app/api/zipcode/${zipcodeParam}`
    // `http://localhost:3000/api/zipcode/${zipcodeParam}`
  );
  const data = await response.json();

  return { props: { data } };
};
